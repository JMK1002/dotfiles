#!/usr/bin/bash

wallpaperPath=$1
imagePath=$2
wallpaperSheetPath=$3

bash ./scripts/wall/change.sh ${wallpaperPath}

sass style.scss style.css
sass ${wallpaperSheetPath} wallpaper.css

cp wallpapers/${imagePath} ~/currentWallpaper.jpg