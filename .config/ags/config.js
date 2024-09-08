import { QuicksettingsMenu } from "./menus/quicksettings/quicksettings.js"
import { PowerMenu } from "./menus/shutdown/shutdown.js"
import { Bar } from "./menus/bar/bar.js"

globalThis.doCss = () => {
    App.resetCss()
    App.applyCss(App.configDir + "/style.css")
}
doCss()

App.config ({
    windows: [
        QuicksettingsMenu,
        PowerMenu,
        Bar
    ]
})