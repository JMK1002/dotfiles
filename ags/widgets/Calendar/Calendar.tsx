import { Astal, Gdk, Gtk } from "ags/gtk4"
import WindowRevealer from "../../utils/WindowRevealer"
import GoogleCalendar from "./components/GoogleCalendar"
import EventDisplay from "./components/EventButton"
import ICAL from "ical.js"
import { interval, timeout } from "ags/time"
import app from "ags/gtk4/app"
import {
	jsx,
	createBinding,
	createComputed,
	createState,
	For,
	With,
} from "gnim"
import { exec, execAsync } from "ags/process"
import EventButton from "./components/EventButton"
import EventViewer from "./components/EventViewer"
import Popup from "../../utils/Popup"

const myCal = new GoogleCalendar(`jmkovalovsky@gmail.com.ics`)

export default (gdkmonitor: Gdk.Monitor) => {
	const today = ICAL.Time.fromJSDate(new Date(), false)
	const [daySelected, setDaySelected] = createState<ICAL.Time>(
		new ICAL.Time(
			{
				year: today.year,
				month: today.month,
				day: today.day,
			},
			myCal.getTimezone(),
		),
	)

	const calendar = (
		<Gtk.Calendar
			class="calendar"
			onDaySelected={(self) => {
				const daySelectedICAL = new ICAL.Time(
					{
						year: self.get_year(),
						month: self.get_month() + 1,
						day: self.get_day(),
						hour: 0,
						minute: 0,
						second: 0,
					},
					myCal.getTimezone(),
				)
				setDaySelected(daySelectedICAL)
			}}
		/>
	)

	const eventsInSelectedDay = daySelected.as((self) =>
		myCal.getEventsInDay(self).sort((a, b) => a.startDate.compare(b.startDate)),
	)

	return (
		<WindowRevealer
			name={"CalendarWindow"}
			application={app}
			gdkmonitor={gdkmonitor}
			class={"transparentBackground darkerBackground"}
			anchor={Astal.WindowAnchor.TOP}
			layer={Astal.Layer.TOP}
			keymode={Astal.Keymode.ON_DEMAND}
			exclusivity={Astal.Exclusivity.NORMAL}
			visible={false}
		>
			<box>
				<box orientation={Gtk.Orientation.VERTICAL}>{calendar}</box>
				<box orientation={Gtk.Orientation.VERTICAL}>
					<box>
						<button
							// onClicked={() => toggled.set(!toggled.get())}
							label={"Add Event"}
						/>
						<button onClicked={() => myCal.reload()} label={"Reload Events"} />
					</box>
					<EventViewer events={eventsInSelectedDay} />
				</box>
			</box>
		</WindowRevealer>
	)
}
