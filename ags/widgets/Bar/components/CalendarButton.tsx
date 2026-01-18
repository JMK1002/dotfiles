import app from "ags/gtk4/app"

export default function CalendarButton() {
	return <button
		class={"transparentButton"}
		onClicked = {() => {
			app.toggle_window("CalendarWindow")
		}}>
			Calendar
	</button>
}