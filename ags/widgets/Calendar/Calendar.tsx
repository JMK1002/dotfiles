import { Astal, Gdk, Gtk } from "ags/gtk4"
import WindowRevealer from "../../utils/WindowRevealer"
import GoogleCalendar from "./components/GoogleCalendar"
import EventDisplay from "./components/EventDisplay"
import ICAL from "ical.js"
import { interval, timeout } from "ags/time"
import app from "ags/gtk4/app"
import { createBinding, createComputed, createState, For, With } from "gnim"
import { exec } from "ags/process"

const myCal = new GoogleCalendar(`jmkovalovsky@gmail.com.ics`)

export default (gdkmonitor: Gdk.Monitor) => {
	const [canvasWidth, setCanvasWidth] = createState(0)
	const [canvasHeight, setCanvasHeight] = createState(0)

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

	const eventDisplays = daySelected.as((self) => myCal.getEventsInDay(self))

	const window = (
		<window
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
				<box orientation={Gtk.Orientation.VERTICAL}>{calendar}</box>
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
						{(value) => (
							<scrolledwindow
								maxContentHeight={createComputed(() => canvasWidth() * 2)}
							>
								<overlay vexpand={true} hexpand={true}>
									<drawingarea
										vexpand={true}
										$={(self) =>
											self.set_draw_func((area, cr, width, height) => {
												const lineInterval = 2 // its 11 because there are 12 2-hr regions
												const horizontalPaddingFactor = 0.9 // scale lines to not touch edges

												setCanvasWidth(width)
												setCanvasHeight(height)
												cr.setLineWidth(1)
												cr.setSourceRGBA(0.5, 0.5, 0.5, 0.2)

												const drawLine = (y: number) => {
													cr.moveTo(
														(width * (1 - horizontalPaddingFactor)) / 2,
														y,
													)
													cr.lineTo(
														(width * (1 + horizontalPaddingFactor)) / 2,
														y,
													)
													cr.stroke()
												}

												for (let i = lineInterval; i <= 24; i += lineInterval) {
													const y = (height * i) / 24
													drawLine(y)
												}
												const currentTime = ICAL.Time.fromJSDate(
													new Date(),
													false,
												)
												const currentY =
													(height *
														(currentTime.hour +
															currentTime.minute / 60 +
															currentTime.second / 3600)) /
													24

												cr.setSourceRGBA(0.8, 0.2, 0.2, 0.8)
												cr.setLineWidth(3)
												drawLine(currentY)
											})
										}
									/>
									<overlay
										// Need a second overlay here because <For> has to be
										// inside a container to not erase <drawingarea> upon
										// a change in the array
										$type="overlay"
										vexpand={true}
										hexpand={true}
									>
										{eventDisplays().map((event) => (
											<EventDisplay
												event={event}
												canvasWidth={canvasWidth}
												canvasHeight={canvasHeight}
												horizontalPadding={0.8}
											/>
										))}
									</overlay>
									<drawingarea
										canTarget={false}
										vexpand={true}
										$type="overlay"
										$={(self) =>
											self.set_draw_func((area, cr, width, height) => {
												const horizontalPaddingFactor = 0.9 // scale lines to not touch edges

												const currentTime = ICAL.Time.fromJSDate(
													new Date(),
													false,
												)
												const currentY =
													(height *
														(currentTime.hour +
															currentTime.minute / 60 +
															currentTime.second / 3600)) /
													24

												cr.setSourceRGBA(0.8, 0.2, 0.2, 0.8)
												cr.setLineWidth(3)

												cr.moveTo(
													(width * (1 - horizontalPaddingFactor)) / 2,
													currentY,
												)
												cr.lineTo(
													(width * (1 + horizontalPaddingFactor)) / 2,
													currentY,
												)
												cr.stroke()
											})
										}
									/>
								</overlay>
							</scrolledwindow>
						)}
					</With>
				</box>
			</box>
		</window>
	)

	if (window instanceof Astal.Window) {
		return WindowRevealer(window)
	}
}
