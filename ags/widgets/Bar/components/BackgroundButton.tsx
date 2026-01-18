import app from "ags/gtk4/app"

export default function BackgroundButton() {
    return <button
        class={"animatedGradient"}
        onClicked = {() => {
            app.toggle_window("WallpaperChanger")
        }}>
            Change Background
    </button>
}