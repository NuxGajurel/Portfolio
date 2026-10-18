#!/usr/bin/env bash
# fix-next-image.sh – run from repo root

# 1️⃣ Add sizes attribute to <Image src="/Nuxgajurel.jpg" ... fill ...>
sed -i '' -E 's|<Image src="/Nuxgajurel.jpg"([^>]*?)fill([^>]*?)>|<Image src="/Nuxgajurel.jpg"\1fill\2 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw">|g' $(git ls-files | grep "\\.tsx$")

# 2️⃣ Width/height fixes – replace style‑only dimensions with width/height
declare -A IMG_MAP=(
  ["/avyanta.png"]="400 300"
  ["/logo-icon-light.png"]="48 48"
  ["/maha.png"]="600 400"
  ["/logo (2).jpg"]="128 64"
)

for src in "${!IMG_MAP[@]}"; do
  IFS=' ' read -r w h <<< "${IMG_MAP[$src]}"
  grep -rl "src=\"$src\"" . --include=*.tsx | while read -r f; do
    # Remove any inline style width/height definitions
    sed -i '' -E "s|style={[^{]*width:[^,]*,? ?}||g" "$f"
    sed -i '' -E "s|style={[^{]*height:[^,]*,? ?}||g" "$f"
    # Add width and height attributes
    sed -i '' -E "s|src=\"$src\"|src=\"$src\" width=$w height=$h|g" "$f"
  done
done
