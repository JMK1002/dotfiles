import WindowRevealer from "../../utils/WindowRevealer"
import settings from "../../settings.json"
import { createBinding, createState } from "gnim"
import { execAsync } from "ags/process"
import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"

const [getSelectedIndex, setSelectedIndex] = createState(0)
const [getWallpapers, setWallpapers] = createState(settings["wallpapers"])

const changeWallpaper = () => {
	const wallpaperJSON = getWallpapers()[getSelectedIndex()]

	const wallpaperFolder = `${wallpaperJSON["folderName"]}`
	const wallpaperPath = `${wallpaperFolder}/${wallpaperJSON["wallpaperFileName"]}`
	const imagePath = `${wallpaperFolder}/${wallpaperJSON["imageFileName"]}`
	const wallpaperSheetPath = `wallpapers/${wallpaperFolder}/wallpaper.scss`

	execAsync(`bash ./scripts/WallpaperChanger/changeWallpaper.sh
            \"${wallpaperPath}\"
            \"${imagePath}\"
            \"${wallpaperSheetPath}\"`).then(() => {
		app.apply_css("style.css", true)
		app.apply_css("wallpaper.css")
		execAsync(`bash ./scripts/WallpaperChanger/externalChanges.sh`)
	})
}

const WallpaperButton = ({
	index,
	gdkmonitor,
}: {
	index: number
	gdkmonitor: Gdk.Monitor
}) => (
	<button
		canFocus={false}
		class={getSelectedIndex.as((self) =>
			self == index ? "selectedAppButton" : "appButton",
		)}
		onClicked={() => {
			if (getSelectedIndex() == index) {
				app.toggle_window(`WallpaperChanger-${gdkmonitor.connector}`)
				changeWallpaper()
				setSelectedIndex(0)
			} else {
				setSelectedIndex(index)
			}
		}}
	>
		<box>
			<box valign={Gtk.Align.CENTER} orientation={Gtk.Orientation.VERTICAL}>
				<label
					class="name"
					xalign={0}
					label={getWallpapers()[index]["displayName"]}
				/>
			</box>
		</box>
	</button>
)

export default (gdkmonitor: Gdk.Monitor) => {
	let win: Gtk.Window

	return (
		<window
			$={(self) => {
				win = self
			}}
			name={`WallpaperChanger-${gdkmonitor.connector}`}
			application={app}
			class={"transparentBackground darkerBackground"}
			anchor={Astal.WindowAnchor.NONE}
			layer={Astal.Layer.OVERLAY}
			keymode={Astal.Keymode.ON_DEMAND}
			exclusivity={Astal.Exclusivity.IGNORE}
			visible={false}
		>
			<Gtk.EventControllerKey
				onKeyPressed={(self, keyval: number) => {
					if (keyval === Gdk.KEY_Escape) {
						win.hide()
						setSelectedIndex(0)
					} else if (keyval === Gdk.KEY_Return) {
						win.hide()
						changeWallpaper()
						setSelectedIndex(0)
					} else if (keyval === Gdk.KEY_Down) {
						setSelectedIndex(getSelectedIndex() + 1)
					} else if (keyval === Gdk.KEY_Up) {
						setSelectedIndex(getSelectedIndex() - 1)
					}
					setSelectedIndex(
						Math.min(getSelectedIndex(), getWallpapers().length - 1),
					)
					setSelectedIndex(Math.max(getSelectedIndex(), 0))
				}}
			/>
			<box orientation={Gtk.Orientation.VERTICAL} widthRequest={700}>
				{getWallpapers.as((self) => {
					let ind = 0
					return self.map(() => {
						return WallpaperButton({ index: ind++, gdkmonitor: gdkmonitor })
					})
				})()}
			</box>
		</window>
	)
}
