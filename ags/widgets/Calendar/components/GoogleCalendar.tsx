import { readFile, writeFile } from "ags/file"
import { exec, execAsync } from "ags/process"
import ICAL from "ical.js"

class GoogleCalendar {
	private fileName: string
	private rootComponent: ICAL.Component
	private timezone: ICAL.Timezone

	constructor(fileName: string) {
		this.fileName = fileName

		this.reload()

		const timezoneComponent =
			this.rootComponent.getFirstSubcomponent("vtimezone")
		const tzid = timezoneComponent?.getFirstProperty("tzid")
		this.timezone = new ICAL.Timezone({
			component: timezoneComponent,
			tzid,
		})
	}

	private getEventsInRange(range: ICAL.Period): ICAL.Event[] {
		const events = this.getEvents()
		const result = []

		for (const eventComponent of events) {
			const event = new ICAL.Event(eventComponent)
			const eventPeriod = new ICAL.Period({
				start: event.startDate,
				end: event.endDate,
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

	getEventsInDay(startTime: ICAL.Time) {
		const endTime = startTime.clone()
		endTime.addDuration(new ICAL.Duration({ days: 1 }))

		const period = new ICAL.Period({
			start: startTime,
			end: endTime,
		})

		return this.getEventsInRange(period)
	}

	// Syncs every local calendar using vdirsyncer
	sync() {
		exec("vdirsyncer sync")
	}

	// Reloads calendar by syncing and then re-reading .ics file
	// note that the calendars are stored in .calendars (vdirsyncer's default)
	reload() {
		this.sync()
		const filePath = `../../.calendars/${this.fileName}`
		const contents = readFile(filePath)
		const jCalData = ICAL.parse(contents)
		this.rootComponent = new ICAL.Component(jCalData)
	}

	addEvent(event: ICAL.Event) {
		this.rootComponent.addSubcomponent(event.component)
		writeFile(
			"/home/Julian/.calendars/jmkovalovsky@gmail.com.ics",
			this.rootComponent.toString(),
		)
		this.sync()
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
