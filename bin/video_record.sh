#!/bin/bash

#This is the ffmpeg command that the screencast shortcut in i3 will run.

#Picks a file name for the output file based on availability:

while [[ -f $HOME/Videos/screencast$n.mkv ]]
do
	n=$((n+1))
done
filename="$HOME/Videos/screencast$n.mkv"

#The actual ffmpeg command:

ffmpeg -y \
-f x11grab \
-framerate 60 \
-s $(xdpyinfo | grep dimensions | awk '{print $2;}') \
-i :0.0 \
-f alsa -i default \
-r 30 \
 -c:v libx264 -r 30 -c:a flac $filename
 #-c:v ffvhuff -r 30 -c:a flac $filename
 #-f pulse -ac 1 -ar 44100 -i default \
