#!/bin/sh
directory="$1"
file="$(ls "$directory" | grep -e png -e jpg -e gif | head -n 1)"
ln -fs "$file" "$directory.cover"

echo "[Desktop Entry]" >> "$directory.directory"
echo "Icon=./.cover" >> "$directory.directory"
