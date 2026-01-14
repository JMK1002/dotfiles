import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { Variable, bind, exec, execAsync } from "astal"

export default function BackgroundButton() {
    return <button
        className={"transparentButton"}
        onClicked = {() => {
            execAsync("rofi -show drun")
        }}>
            App Launcher
    </button>
}