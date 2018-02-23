#!/bin/sh
# Usage: useThisAsIcon /path/to/file.extension

file=$1
directory=$(dirname "${file}")

kioclient5 copy "thumbnail://$file" "$directory/.cover.png"
kwriteconfig5 --file "$directory/.directory" --group 'Desktop Entry' --key Icon ./.cover
