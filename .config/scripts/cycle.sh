#!/usr/bin/bash
TEMP=/tmp/current_wall

files=(~/Wallpapers/*)

hypr=~/.config/hypr
scripts=~/.config/scripts

index=$(cat $TEMP)
index=$((index+1))
if [ $index -ge ${#files[@]} ]; then
index=0
fi
echo $index > $TEMP
$scripts/wall.sh "${files[$index]}"

wal -i $(swww query | grep -o -E 'image: .+' | tail -c+8) -n --cols16

ags -r "doCss();"
bash /home/Julian/.config/kitty/reload-theme.sh
bash /home/Julian/.config/waybar/reload-theme.sh

