import { Astal, Gdk, Gtk } from "ags/gtk4"
import app from "ags/gtk4/app"
import GObject from "gnim/gobject"
import { WindowProps } from "../types/widgets/window"
import { jsx } from "gnim"

interface WindowRevealerProps extends Partial<Astal.Window.ConstructorProps> {
	children: GObject.Object
	name: string
	class?: string
}

export default ({ children, ...props }: WindowRevealerProps) => {
	const exitEventController = new Gtk.EventControllerKey()
	exitEventController.connect("key-pressed", (self, keyval: number) => {
		if (keyval === Gdk.KEY_Escape) {
			app.toggle_window(props.name)
		}
	})

	return (
		<window
			$={(self) => {
				self.add_controller(exitEventController)
			}}
			{...props}
		>
			{children}
		</window>
	)
}
