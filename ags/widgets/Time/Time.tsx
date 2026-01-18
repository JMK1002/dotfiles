import { execAsync } from "ags/process"
import WindowRevealer from "../../utils/WindowRevealer"
import { createBinding, createState } from "gnim"
import { interval } from "ags/time"
import { Astal, Gtk } from "ags/gtk4"


const [getWeekday, setWeekday] = createState("")
const [getDate, setDate] = createState("")
const [getTime, setTime] = createState("")

const updateTime = () => {
	execAsync("date +\"%A\"").then(res => setWeekday(res))
	execAsync("date +\"%B %d, %Y\"").then(res => setDate(res))
	execAsync("date +\"%I:%M%P\"").then(res => setTime(res))
}

updateTime()

interval(3000, updateTime)

export default () => WindowRevealer({
	name: "TimeWindow",
	className: "timeWindow",
	child: <box orientation={Gtk.Orientation.VERTICAL}>
		<label label={getWeekday.as(w => w.toUpperCase())} class="weekday"/>
		<label label={getDate} class="date"/>
		<label label={getTime} class="time"/>
	</box>,
	anchor: Astal.WindowAnchor.NONE,
	layer: Astal.Layer.BACKGROUND,
	keymode: Astal.Keymode.NONE,
	exclusivity: Astal.Exclusivity.IGNORE,
	css: "",
	visible: true,
	$: () => {}
})
