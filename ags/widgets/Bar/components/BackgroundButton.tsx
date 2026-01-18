import app from "ags/gtk4/app"

export default function BackgroundButton() {
    return <button
        class={"animatedGradient"}
        onClicked = {() => {
            App.toggleWindow("WallpaperChanger")
        }}>
            Change Background
    </button>
}