import { Astal, Gtk, Gdk } from "ags/gtk4"
import GObject from "gnim/gobject"
import { jsx } from "gnim"
import app from "ags/gtk4/app"

const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor
const { IGNORE } = Astal.Exclusivity
const { EXCLUSIVE } = Astal.Keymode
const { CENTER } = Gtk.Align

interface PopupProps extends Partial<Astal.Window.ConstructorProps> {
	margins: [number, number, number, number] // top right bottom left
	gdkmonitor: Gdk.Monitor
	children: GObject.Object
	name: string
	class?: string
}

export default ({ children, margins, ...props }: PopupProps) => {
	const monitorWidth = props.gdkmonitor.geometry.width
	const monitorHeight = props.gdkmonitor.geometry.height

	const exitClickEvent = new Gtk.GestureClick()
	exitClickEvent.connect("released", (self, timesPressed, x, y) => {
		if (
			x < 0 ||
			x > self.widget.get_width() ||
			y < 0 ||
			y > self.widget.get_height()
		) {
			self.widget.visible = false
		}
	})

	const exitKeyEvent = new Gtk.EventControllerKey()
	exitKeyEvent.connect("key-pressed", (self, keyval: number) => {
		if (keyval === Gdk.KEY_Escape) {
			self.widget.visible = false
		}
	})

	return (
		<window
			{...props}
			$={(self) => {
				self.add_controller(exitClickEvent)
				self.add_controller(exitKeyEvent)
			}}
			keymode={Astal.Keymode.EXCLUSIVE}
			css={`
				margin-top: ${margins[0] * monitorWidth}px;
				margin-right: ${margins[1] * monitorHeight}px;
				margin-bottom: ${margins[2] * monitorWidth}px;
				margin-left: ${margins[3] * monitorHeight}px;
			`}
			exclusivity={Astal.Exclusivity.IGNORE}
		>
			{children}
		</window>
	)
}
