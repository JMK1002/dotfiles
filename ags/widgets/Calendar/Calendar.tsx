import { Astal, Gdk, Gtk } from "ags/gtk4"
import WindowRevealer from "../../utils/WindowRevealer"
import GoogleCalendar from "./components/GoogleCalendar"
import EventDisplay from "./components/EventDisplay"
import ICAL from "ical.js"
import { interval, timeout } from "ags/time"
import app from "ags/gtk4/app"
import { createBinding, createState, For, With } from "gnim"
import { exec } from "ags/process"

const myCal = new GoogleCalendar(`jmkovalovsky@gmail.com.ics`)

export default (gdkmonitor: Gdk.Monitor) => {
	const [canvasWidth, setCanvasWidth] = createState(0)
	const [canvasHeight, setCanvasHeight] = createState(0)

	const today = ICAL.Time.fromJSDate(new Date(), false)
	today.hour = 0
	today.minute = 0
	today.second = 0
	const [daySelected, setDaySelected] = createState<ICAL.Time>(today)

	const calendar = <Gtk.Calendar 
		class="calendar" 
		onDaySelected={(self) => {
			const daySelectedICAL = new ICAL.Time({
				year: self.get_year(),
				month: self.get_month() + 1,
				day: self.get_day(),
				hour: 0,
				minute: 0,
				second: 0
			}, myCal.getTimezone())
			setDaySelected(daySelectedICAL)
		}}
		/>

	const eventDisplays = daySelected.as((self) => 
		myCal.getEventsInDay(self)
	)

	const window = <window
		name={"CalendarWindow"}
		application={app}
		class={"transparentBackground darkerBackground"}
		anchor={Astal.WindowAnchor.TOP}
		layer={Astal.Layer.TOP}
		keymode={Astal.Keymode.ON_DEMAND}
		exclusivity={Astal.Exclusivity.NORMAL}
		visible={false}
		>
		<box>
			{calendar}
			<box orientation={Gtk.Orientation.VERTICAL}>
				<box>
					<button 
						// onClicked={() => toggled.set(!toggled.get())}
						label={"Add Event"}
					/>
					<button
						// onClicked={() => reloadEvents(calendar)}
						label={"Reload Events"}
					/>
				</box>
				
				<With 
					// Need this With because of bug with overlays and <For>
					// so need to update entire drawing section instead of
					// just having a <For> above
					value={eventDisplays} 
					>
					{(value) => 
						<overlay vexpand={true} hexpand={true}>
							<drawingarea
								vexpand={true}
								$={(self) => self.set_draw_func((area, cr, width, height) => {
									const lineCount = 12
									const horizontalPaddingFactor = 0.9 // scale lines to not touch edges
									
									setCanvasWidth(width)
									setCanvasHeight(height)
									cr.setLineWidth(1)
									cr.setSourceRGBA(0.5, 0.5, 0.5, 0.2)
									
									for (let i = 1; i <= lineCount; i++) {
										const y = height * i / (lineCount + 1)
										cr.moveTo(width * (1 - horizontalPaddingFactor) / 2, y)
										cr.lineTo(width * (1 + horizontalPaddingFactor) / 2, y)
										cr.stroke()
									}
								})} 
								/>
							<overlay 
								// Need a second overlay here because <For> has to be
								// inside a container to not erase <drawingarea> upon
								// a change in the array
								$type="overlay" 
								vexpand={true} 
								hexpand={true}
								>
									{eventDisplays().map(
										(event) => 
											<EventDisplay
												event={event}
												canvasWidth={canvasWidth}
												canvasHeight={canvasHeight}
												horizontalPadding={0.8}
												/>
										)}
							</overlay>
						</overlay>
					}
				</With>
			</box>
		</box>
	</window>

	if (window instanceof Astal.Window) {
		return WindowRevealer(window)
	}
}