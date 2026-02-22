import { Accessor, For } from "gnim"
import ICAL from "ical.js"
import EventButton from "./EventButton"

interface EventViewerProps {
	events: Accessor<ICAL.Event[]>
}

const EventViewer = (props: EventViewerProps) => (
	<For each={props.events}>{(event) => <EventButton event={event} />}</For>
)

export default EventViewer
