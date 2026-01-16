import app from "ags/gtk3/app"
import Gtk from "gi://Gtk?version=3.0"
import style from "./style.scss"
import { timeout } from "./types/utils/timeout"

import Bar from "./widgets/Bar/Bar"
import Calendar from "./widgets/Calendar/Calendar"
import TextDisplay from "./widgets/TextDisplay/TextDisplay"
import Quicksettings from "./widgets/Quicksettings/Quicksettings"
import Time from "./widgets/Time/Time"
import WallpaperChanger from "./widgets/WallpaperChanger/WallpaperChanger"

app.start({
    css: style,
    main() {
        app.apply_css("./wallpaper.css")
        app.get_monitors().map(Bar)
        app.get_monitors().map(Calendar)
        // App.get_monitors().map(Quicksettings)
        // App.get_monitors().map(TextDisplay)
    },
})
Time
timeout(0, WallpaperChanger)