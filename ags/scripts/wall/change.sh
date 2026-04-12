#!/usr/bin/bash

bash scripts/wall/wall.sh "wallpapers/$1"

wal -i $(awww query | grep -o -E 'image: .+' | tail -c+8) -n --cols16

echo hyprctl clients | grep "Spotify"

bash /home/Julian/.config/kitty/reload-theme.sh
xrdb $HOME/.cache/wal/colors.Xresources
