import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./widgets/Bar/Bar"
import Calendar from "./widgets/Calendar/Calendar"
import TextDisplay from "./widgets/TextDisplay/TextDisplay"
import Quicksettings from "./widgets/Quicksettings/Quicksettings"
import Time from "./widgets/Time/Time"
import WallpaperChanger from "./widgets/WallpaperChanger/WallpaperChanger"
import { timeout } from "astal"

App.start({
    css: style,
    main() {
        App.apply_css("./wallpaper.css")
        App.get_monitors().map(Bar)
        App.get_monitors().map(Calendar)
        // App.get_monitors().map(Quicksettings)
        // App.get_monitors().map(TextDisplay)
    },
})
Time
timeout(0, WallpaperChanger)