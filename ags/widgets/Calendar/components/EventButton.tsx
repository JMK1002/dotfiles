import { Gtk } from "ags/gtk4"
import { interval } from "ags/time"
import { Accessor, createComputed, Scope } from "gnim"
import GObject, { getter, property, register, setter } from "gnim/gobject"
import ICAL from "ical.js"
import Pango from "../../../types/@girs/pango-1.0/pango-1.0"

const getHour = (time: ICAL.Time) =>
	(((time.hour + 11) % 12) + 1).toLocaleString("en-US", {
		minimumIntegerDigits: 2,
	})
const getMinute = (time: ICAL.Time) =>
	time.minute.toLocaleString("en-US", { minimumIntegerDigits: 2 })
const getHalf = (time: ICAL.Time) => (time.hour >= 12 ? "PM" : "AM")

interface EventButtonProps {
	event: ICAL.Event
}

const EventButton = (props: EventButtonProps) => {
	const start = props.event.startDate
	const end = props.event.endDate

	const summaryLabel = (
		<label
			ellipsize={Pango.EllipsizeMode.END}
			halign={Gtk.Align.START}
			label={props.event.summary}
		/>
	)
	const timeLabel = (
		<label
			halign={Gtk.Align.START}
			label={
				`${getHour(start)}` +
				`:${getMinute(start)}` +
				` ${getHalf(start)}` +
				` - ` +
				`${getHour(end)}` +
				`:${getMinute(end)}` +
				` ${getHalf(end)}`
			}
		/>
	)

	return (
		<button
			$type="overlay"
			class="eventDisplay"
			valign={Gtk.Align.START}
			hexpand={false}
			halign={Gtk.Align.FILL}
		>
			<box orientation={Gtk.Orientation.VERTICAL}>
				{summaryLabel}
				{timeLabel}
			</box>
		</button>
	)
}

export default EventButton
