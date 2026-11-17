from pathlib import Path

from PIL import Image

BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_IMG = BASE_DIR / "static" / "img"

def optimize_image(src_path: Path, dst_path: Path, max_size: tuple[int, int], quality: int = 82):
    dst_path.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(src_path) as img:
        # Check alpha
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            alpha = img.convert('RGBA').split()[-1]
            if alpha.getextrema() == (255, 255):
                img = img.convert('RGB')
            else:
                img = img.convert('RGBA')
        elif img.mode != 'RGB':
            img = img.convert('RGB')

        img.thumbnail(max_size, Image.Resampling.LANCZOS)
        img.save(dst_path, 'WEBP', quality=quality, method=6)

    src_kb = src_path.stat().st_size / 1024
    dst_kb = dst_path.stat().st_size / 1024
    ratio = (1 - (dst_kb / src_kb)) * 100 if src_kb > 0 else 0
    print(f"  {src_path.name:38} -> {dst_path.name:25} | {src_kb:8.1f} KB -> {dst_kb:6.1f} KB (-{ratio:5.1f}%)")
    return src_kb, dst_kb

def run():
    print("=== Starting Image Optimization & WebP Conversion ===")
    total_src_kb = 0
    total_dst_kb = 0

    # 1. Root images
    print("\n[1] Optimizing Root Images (Portraits, Polaroids, Terrain, Avatar):")
    root_specs = {
        "about_polaroid_desk.jpg": ((480, 600), 82),
        "about_polaroid_mountain.jpg": ((480, 600), 82),
        "about_polaroid_user.jpg": ((480, 600), 82),
        "dev_hero_portrait.jpg": ((1200, 1200), 82),
        "Dev.png": ((600, 600), 85),
        "wireframe_terrain.jpg": ((1376, 768), 80),
    }
    for filename, (max_size, qual) in root_specs.items():
        src = STATIC_IMG / filename
        if src.exists():
            dst = STATIC_IMG / f"{src.stem}.webp"
            s, d = optimize_image(src, dst, max_size, qual)
            total_src_kb += s
            total_dst_kb += d

    # 2. Certificates
    print("\n[2] Optimizing Certificates:")
    cert_dir = STATIC_IMG / "certificates"
    for src in cert_dir.glob("*.png"):
        dst = cert_dir / f"{src.stem}.webp"
        s, d = optimize_image(src, dst, (1000, 1000), 82)
        total_src_kb += s
        total_dst_kb += d

    # 3. Project Mockups
    print("\n[3] Optimizing Project Mockups:")
    mockup_dir = STATIC_IMG / "images" / "mockup"
    for src in mockup_dir.glob("*.jpg"):
        dst = mockup_dir / f"{src.stem}.webp"
        s, d = optimize_image(src, dst, (800, 800), 82)
        total_src_kb += s
        total_dst_kb += d

    # Single project image nexa-ai.png
    nexa_src = STATIC_IMG / "images" / "nexa-ai.png"
    if nexa_src.exists():
        dst = STATIC_IMG / "images" / "nexa-ai.webp"
        s, d = optimize_image(nexa_src, dst, (800, 800), 82)
        total_src_kb += s
        total_dst_kb += d

    # 4. Journey Gallery (AlgoZ & GFG)
    print("\n[4] Generating Journey Gallery Thumbnails & High-Res Lightbox WebPs:")
    images_dir = STATIC_IMG / "images"
    thumbs_dir = images_dir / "thumbs"
    full_dir = images_dir / "full"

    journey_files = []
    for ext in ("*.jpg", "*.JPG", "*.jpeg"):
        for f in images_dir.glob(ext):
            if f.stem.startswith("AlgoZ") or f.stem.startswith("GFG"):
                journey_files.append(f)

    # Sort files naturally
    journey_files = sorted(set(journey_files), key=lambda p: (p.stem[:5], int(''.join(filter(str.isdigit, p.stem)) or 0)))

    for src in journey_files:
        stem = src.stem
        # Generate thumbnail for drift wall cards (max 500x350)
        thumb_dst = thumbs_dir / f"{stem}.webp"
        # Generate full for lightbox (max 1920x1440)
        full_dst = full_dir / f"{stem}.webp"
        # Also standard webp path in images_dir
        std_dst = images_dir / f"{stem}.webp"

        src_kb = src.stat().st_size / 1024

        # 1. Thumbnail
        _, t_kb = optimize_image(src, thumb_dst, (500, 350), 80)
        # 2. Full Lightbox
        _, f_kb = optimize_image(src, full_dst, (1920, 1440), 85)
        # 3. Standard mirror to full
        optimize_image(src, std_dst, (1920, 1440), 85)

        total_src_kb += src_kb
        total_dst_kb += t_kb + f_kb

    print("\n=== Optimization Summary ===")
    print(f"Original source images: {total_src_kb / 1024:.2f} MB")
    print(f"Optimized output total: {total_dst_kb / 1024:.2f} MB")
    saved_mb = (total_src_kb - total_dst_kb) / 1024
    pct = (1 - (total_dst_kb / total_src_kb)) * 100 if total_src_kb > 0 else 0
    print(f"Total Bandwidth & Storage Saved: {saved_mb:.2f} MB (-{pct:.1f}%)")

if __name__ == "__main__":
    run()
