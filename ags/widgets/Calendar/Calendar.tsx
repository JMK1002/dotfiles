import WindowRevealer from "../../utils/WindowRevealer"
import AddTask, {toggled} from "./components/AddTask"
import {bind, execAsync, Variable} from "astal"
import {Gtk, App, Astal, Gdk, astalify, ConstructProps} from "astal/gtk3"
import { interval, timeout, idle } from "astal/time"

type CalendarProps = ConstructProps<Gtk.Calendar, Gtk.Calendar.ConstructorProps>
const Calendar = astalify<Gtk.Calendar, Gtk.Calendar.ConstructorProps>(Gtk.Calendar)

const events = Variable([])
const displayedEvents = Variable<Date[]>([])
const selectedDay = Variable("")
const loadingDisplay = Variable(false);

const getDate = (cal : Gtk.Calendar) => cal.get_date().join("-")

const reloadEvents = (calendar : Gtk.Calendar) => {
	loadingDisplay.set(true)
	execAsync("bash ./scripts/CalendarApi/getEvents.sh")
		.then(v => {
			events.set(JSON.parse(v))
			print(events.get().length + " Events Reloaded");
		})
		.finally(() => {
			loadingDisplay.set(false)
			initDate(calendar)
		})
}

const getDayEvents = (day : Date) => {
	const res : Date[] = []
	events.get().forEach((ev) => {
		const start = new Date(ev['start_date'].split("-")).getTime()
		const end = new Date(ev['end_date'].split("-")).getTime()
		if (
			day.getTime() - 4000000 <= start &&
			day.getTime() + 4000000 >= start
		) {
			res.push(ev);
		}
	})
	return res
}

const initDate = (cal : Gtk.Calendar) => {
	selectedDay.set(getDate(cal))
	// temporary date holder
	const date = cal.get_date()
	displayedEvents.set(getDayEvents(new Date(date[0], date[1], date[2])))
}

const getCalendar = () : Gtk.Calendar => {
	return <Calendar 
		className={"calendar"}
		setup={(self : Gtk.Calendar) => initDate(self)}
		onDaySelected={(self : Gtk.Calendar) => initDate(self)}
	/>
}

const getEventBox = (ev : any) => <box vertical>
	<label label={ev["title"] || ""} />
	<label label={(ev["start_time"] || "") + " to " + (ev["end_time"] || "")} />
	<label label={ev["location"] || ""} />
	<label label={ev["descrtipion"] || ""} />
</ box>

const getMenu = () => <scrollable expand={true} className={"noBackground"} hscroll={Gtk.PolicyType.NEVER}>
	<box vertical>
		{
			bind(loadingDisplay)
				.as((loading) => {
					if (!loading) {
						return <box vertical>{bind(displayedEvents).as(arr => arr.map(ev => getEventBox(ev)))}</box>
					}
					else {
						return <label label={"Loading..."} />
					}
				})
		}
	</box>
</scrollable>


export default function CalendarWindow(gdkmonitor: Gdk.Monitor) {
	const calendar : Gtk.Calendar = getCalendar()
	reloadEvents(calendar)

	return WindowRevealer({
		name:"CalendarWindow",
		className: "transparentBackground darkerBackground",
		child: <box>
			{calendar}
			<box vertical>
				<box>
					<button 
						onClicked={() => toggled.set(!toggled.get())}
						label={"Add Event"}
					/>
					<button
						onClicked={() => reloadEvents(calendar)}
						label={"Reload Events"}
					/>
				</box>
				{getMenu()}
			</box>
		</box>,
		anchor:Astal.WindowAnchor.TOP,
		layer:Astal.Layer.TOP,
		keymode:Astal.Keymode.ON_DEMAND,
		exclusivity:Astal.Exclusivity.NORMAL,
		visible: false,
		css: "",
		setup: () => {},
	})
}

timeout(0, AddTask)