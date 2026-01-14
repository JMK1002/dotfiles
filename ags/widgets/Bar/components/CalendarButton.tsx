import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { Variable, bind, exec, execAsync } from "astal"

export default function CalendarButton() {
	return <button
		className={"transparentButton"}
		onClicked = {() => {
			App.toggle_window("CalendarWindow")
		}}>
			Calendar
	</button>
}