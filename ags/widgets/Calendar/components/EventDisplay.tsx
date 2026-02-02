import { Gtk } from "ags/gtk4";
import { interval } from "ags/time";
import { Accessor, createComputed, Scope } from "gnim";
import GObject, { getter, property, register, setter } from "gnim/gobject";
import ICAL from "ical.js"

interface EventDisplayProps {
	event : ICAL.Event
	canvasWidth : Accessor<number>
	canvasHeight : Accessor<number>
	horizontalPadding : number
}

const EventDisplay = (props : EventDisplayProps) => {
	const start = props.event.startDate
	const startHours = start.hour + start.minute / 60 + start.second / 3600
	const end = props.event.endDate
	const endHours = end.hour + end.minute / 60 + end.second / 3600

	const boxWidth = createComputed(() => props.canvasWidth() * props.horizontalPadding)
	const topMargin = createComputed(() => startHours / 24 * props.canvasHeight())
	const minHeight = createComputed(() => (endHours - startHours) / 24 * props.canvasHeight())
	
	const cssString = createComputed(() => `
			min-width: ${boxWidth()}px;
			min-height: ${minHeight()}px;
			margin-top: ${topMargin()}px;
		`)

	return <button
		$type="overlay" 
		onClicked={(self) => self}
		valign={Gtk.Align.START} 
		hexpand={false}
		halign={Gtk.Align.CENTER}
		css={cssString}
		/>

}

export default EventDisplay