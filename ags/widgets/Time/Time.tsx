import WindowRevealer from "../../utils/WindowRevealer"
import {bind, execAsync, interval, Variable} from "astal"
import {Gtk, App, Astal, Gdk} from "astal/gtk3"

const weekday = Variable("")
const date = Variable("")
const time = Variable("")

const updateTime = () => {
	execAsync("date +\"%A\"").then(res => weekday.set(res))
	execAsync("date +\"%B %d, %Y\"").then(res => date.set(res))
	execAsync("date +\"%I:%M%P\"").then(res => time.set(res))
}

updateTime()

interval(3000, updateTime)

export default WindowRevealer({
	name: "TimeWindow",
	className: "timeWindow",
	child: <box vertical className="timeWindow">
		<label label={bind(weekday).as(w => w.toUpperCase())} className="weekday"/>
		<label label={bind(date)} className="date"/>
		<label label={bind(time)} className="time"/>
	</box>,
	anchor: Astal.WindowAnchor.NONE,
	layer: Astal.Layer.BACKGROUND,
	keymode: Astal.Keymode.NONE,
	exclusivity: Astal.Exclusivity.IGNORE,
	css: "",
	visible: true,
	setup: () => {}
})
