import WindowRevealer from "../../utils/WindowRevealer"
import {bind, execAsync, interval, Variable} from "astal"
import {Gtk, App, Astal, Gdk} from "astal/gtk3"
import settings from "../../settings.json"

const selectedIndex = Variable(0);
const wallpapers = Variable(settings["wallpapers"])

const changeWallpaper = () => {
    const wallpaperFolder = `${wallpapers.get()[selectedIndex.get()]["folderName"]}`
    const wallpaperPath = `${wallpaperFolder}/${wallpapers.get()[selectedIndex.get()]["wallpaperFileName"]}`
    const imagePath = `${wallpaperFolder}/${wallpapers.get()[selectedIndex.get()]["imageFileName"]}`
    const wallpaperSheetPath = `wallpapers/${wallpaperFolder}/wallpaper.scss`
    console.log()
    execAsync(`bash ./scripts/WallpaperChanger/changeWallpaper.sh 
            \"${wallpaperPath}\" 
            \"${imagePath}\" 
            \"${wallpaperSheetPath}\"`
        ).then(() => {
            App.apply_css("style.css", true)
            App.apply_css("wallpaper.css")
            execAsync(`bash ./scripts/WallpaperChanger/externalChanges.sh`)
        }
    )
}

const WallpaperButton = ({
	index,
    window,
} : {
	index : number
    window : Gtk.Window
}) => <button
    canFocus={false}
    className={bind(selectedIndex).as(self => self == index ? "selectedAppButton" : "appButton")}
    onClicked={() => {
        if (selectedIndex.get() == index) {
            App.toggle_window("WallpaperChanger")
            changeWallpaper()
            selectedIndex.set(0)
        }
        else {
            selectedIndex.set(index)
        }
    }}
    >
    <box>
        <box valign={Gtk.Align.CENTER} vertical>
            <label
                className="name"
                truncate
                xalign={0}
                label={wallpapers.get()[index]["displayName"]}
            />
        </box>
    </box>
</button>

export default () => <window
    name={"WallpaperChanger"}
    application={App}
	className={"transparentBackground darkerBackground"}
    anchor={Astal.WindowAnchor.NONE}
    layer={Astal.Layer.OVERLAY}
    keymode={Astal.Keymode.EXCLUSIVE}
    exclusivity={Astal.Exclusivity.IGNORE}
    visible={false}
    onKeyPressEvent={(self, event: Gdk.Event) => {
        if (event.get_keyval()[1] === Gdk.KEY_Escape) {
            self.hide()
            selectedIndex.set(0)
        }
        else if (event.get_keyval()[1] === Gdk.KEY_Return) {
            self.hide()
            changeWallpaper()
            selectedIndex.set(0)
        }
        else if (event.get_keyval()[1] === Gdk.KEY_Down) {
            selectedIndex.set(selectedIndex.get() + 1)
        } 
        else if (event.get_keyval()[1] === Gdk.KEY_Up) {
            selectedIndex.set(selectedIndex.get() - 1)
        }
        selectedIndex.set(Math.min(selectedIndex.get(), wallpapers.get().length - 1))
        selectedIndex.set(Math.max(selectedIndex.get(), 0))
    }}>
        <box vertical widthRequest={700}>
            {bind(wallpapers).as(self => {
                let ind = 0;
                return self.map(() => {
                    return WallpaperButton({index: ind++})
                })
            })}
        </box>
</window>