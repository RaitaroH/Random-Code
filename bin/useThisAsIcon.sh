#!/bin/sh
# Usage: useThisAsIcon /path/to/file.extension

file=$1
directory=$(dirname "${file}")

kioclient5 copy "thumbnail://$file" "$directory/.cover.png"
# ln -fs "$file" "$directory/.cover"
kwriteconfig5 --file "$directory/.directory" --group 'Desktop Entry' --key Icon ./.cover
