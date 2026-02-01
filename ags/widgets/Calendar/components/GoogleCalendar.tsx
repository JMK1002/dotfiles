import { readFile } from "ags/file"
import ICAL from "ical.js"

class GoogleCalendar {
	private fileName : string
	private rootComponent : ICAL.Component
	private timezone : ICAL.Timezone

	constructor(fileName : string) {
		this.fileName = fileName
		const filePath = `../../.calendars/${this.fileName}`

		const contents = readFile(filePath)
		const jCalData = ICAL.parse(contents)
		this.rootComponent = new ICAL.Component(jCalData)

		const timezoneComponent = this.rootComponent.getFirstSubcomponent("vtimezone")
		const tzid = timezoneComponent?.getFirstProperty("tzid")
		this.timezone = new ICAL.Timezone({
			component: timezoneComponent,
			tzid
		})
	}

	getEventsInRange(range : ICAL.Period) : ICAL.Event[] {
		const events = this.getEvents()
		const result = [];

		for (const eventComponent of events) {
			const event = new ICAL.Event(eventComponent);
			const eventPeriod = new ICAL.Period({
				start: event.startDate,
				end: event.endDate
			})
			const inRange = range.compare(eventPeriod) == 0

			// Note that there was an issue with time zones with start
			// and end dates. That could be an issue again somewhere else
			if (inRange) {
				result.push(event)
			}
		}
		return result
	}

	getEventsInDay(startTime : ICAL.Time) {
		const endTime = startTime.clone()
		endTime.addDuration(new ICAL.Duration({days: 1}))

		const period = new ICAL.Period({
			start: startTime,
			end: endTime
		})

		return this.getEventsInRange(period)
	}

	getRootComponent() {
		return this.rootComponent
	}

	getEvents() {
		return this.rootComponent.getAllSubcomponents("vevent")
	}

	getTimezone() {
		return this.timezone
	}
}

export default GoogleCalendar