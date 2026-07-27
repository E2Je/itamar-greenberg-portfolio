#!/usr/bin/env python3
"""
דוחס מחדש את תמונות האתר ומייצר placeholders זעירים (LQIP).

הרצה:  pip install Pillow && python3 scripts/optimize-images.py

- תמונות ההרצאות מוקטנות לצלע ארוכה של 1100px. הן מוצגות בגלריה
  בתיבה של 860x540 לכל היותר, כך ש-1100px עדיין נותן חדות מלאה
  במסכי Retina ולא נשלחים פיקסלים מיותרים.
- תמונת הפרופיל מוקטנת ל-480px (מוצגת ב-240px לכל היותר).
- מוקאפי הפרויקטים כבר דחוסים ביעילות ולכן לא נוגעים בהם - קידוד
  חוזר רק היה מוסיף איבוד דורות בלי חיסכון אמיתי.
- הקובץ src/data/lqip.ts נוצר מכאן: גרסאות 24px בבסיס 64 שמשמשות
  כרקע המטושטש של הגלריה עוד לפני שהתמונה האמיתית ירדה.
"""
import base64
import io
import os
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
LECTURES = ROOT / "public" / "lectures"
PROFILE = ROOT / "public" / "profile.webp"
LQIP_TS = ROOT / "src" / "data" / "lqip.ts"

LECTURE_MAX_EDGE = 1100
LECTURE_QUALITY = 78
PROFILE_SIZE = 480
PROFILE_QUALITY = 86
LQIP_EDGE = 24
LQIP_QUALITY = 45


def fit(im: Image.Image, max_edge: int) -> Image.Image:
    scale = max_edge / max(im.size)
    if scale >= 1:
        return im
    return im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)


def encode(im: Image.Image, **kwargs) -> bytes:
    buf = io.BytesIO()
    im.save(buf, "WEBP", method=6, **kwargs)
    return buf.getvalue()


def rewrite(path: Path, data: bytes) -> None:
    before = path.stat().st_size
    path.write_bytes(data)
    print(f"  {path.name:18s} {before / 1024:6.1f}K -> {len(data) / 1024:6.1f}K")


def main() -> None:
    print("תמונות הרצאות:")
    lqip: dict[str, str] = {}
    for path in sorted(LECTURES.glob("*.webp")):
        im = Image.open(path).convert("RGB")
        rewrite(path, encode(fit(im, LECTURE_MAX_EDGE), quality=LECTURE_QUALITY))
        tiny = encode(fit(im, LQIP_EDGE), quality=LQIP_QUALITY)
        lqip[path.stem] = "data:image/webp;base64," + base64.b64encode(tiny).decode()

    print("תמונת פרופיל:")
    profile = Image.open(PROFILE).convert("RGB")
    rewrite(
        PROFILE,
        encode(profile.resize((PROFILE_SIZE, PROFILE_SIZE), Image.LANCZOS), quality=PROFILE_QUALITY),
    )

    entries = "\n".join(f"  {name.replace('-', '_')}: '{uri}'," for name, uri in sorted(lqip.items()))
    LQIP_TS.write_text(
        "// נוצר אוטומטית על ידי scripts/optimize-images.py - אין לערוך ידנית.\n"
        "// תצוגות 24px של תמונות הגלריה, משמשות כרקע מטושטש עד שהתמונה המלאה יורדת.\n"
        f"export const LQIP: Record<string, string> = {{\n{entries}\n}};\n",
        encoding="utf-8",
    )
    total = sum(len(v) for v in lqip.values()) / 1024
    print(f"נוצר {os.path.relpath(LQIP_TS, ROOT)} ({len(lqip)} placeholders, {total:.1f}K)")


if __name__ == "__main__":
    main()
