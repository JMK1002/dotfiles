import { execAsync } from "ags/process"

export default function BackgroundButton() {
    return <button
        class={"transparentButton"}
        onClicked = {() => {
            execAsync("rofi -show drun")
        }}>
            App Launcher
    </button>
}