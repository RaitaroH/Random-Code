#!/bin/bash

#This is the ffmpeg command that the audiocast shortcut in i3 will run.

#Picks a file name for the output file based on availability:

while [[ -f $HOME/Videos/audiocast$n.wav ]]
do
	n=$((n+1))
done
filename="$HOME/Videos/audiocast$n.wav"

#The actual ffmpeg command:

ffmpeg -f alsa -i default $filename
 #-c:v ffvhuff -r 30 -c:a flac $filename
 #-f pulse -ac 1 -ar 44100 -i default \
