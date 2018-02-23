#!/bin/sh
file=$1

ext=$(echo "$file" | rev | cut -d . -f1 | rev)

convert "$file" "$(basename "$file" .$ext).png"

rm "$file"
