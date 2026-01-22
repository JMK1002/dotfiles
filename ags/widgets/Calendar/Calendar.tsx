import { Astal, Gdk, Gtk } from "ags/gtk4"
import WindowRevealer from "../../utils/WindowRevealer"


export default function CalendarWindow(gdkmonitor: Gdk.Monitor) {

	return WindowRevealer({
		name:"CalendarWindow",
		className: "transparentBackground darkerBackground",
		child: <box>
			<Gtk.Calendar class="calendar"/>
			<box orientation={Gtk.Orientation.VERTICAL}>
				<box>
					<button 
						// onClicked={() => toggled.set(!toggled.get())}
						label={"Add Event"}
					/>
					<button
						// onClicked={() => reloadEvents(calendar)}
						label={"Reload Events"}
					/>
				</box>
				{/* {getMenu()} */}
			</box>
		</box>,
		anchor:Astal.WindowAnchor.TOP,
		layer:Astal.Layer.TOP,
		keymode:Astal.Keymode.ON_DEMAND,
		exclusivity:Astal.Exclusivity.NORMAL,
		visible: false,
		css: "",
		$: () => {},
	})
}