import { Gdk, Gtk } from "ags/gtk4"
import { Accessor, createEffect, createState, Setter } from "gnim"

interface Time {
	hour: number // Hour is from 0-23 inclusive
	minute: number
}

interface TimeSelectorProps extends Partial<Gtk.Entry.ConstructorProps> {
	timeSetter: Accessor<Time>
}

export default (props: TimeSelectorProps) => {
	const [section, setSection] = createState(0)
	const [morning, setMorning] = createState(false)

	interface Range {
		min: number
		max: number
	}

	interface NumberEntryProps {
		setValue: Setter<number>
		value: Accessor<number>
		range: Range
		index: number
	}

	const inRange = (val: number, range: Range) => {
		return range.min <= val && val <= range.max
	}

	const keyPressedCallback = (
		self: Gtk.EventControllerKey,
		keyval: number,
		props: NumberEntryProps,
	) => {
		if (keyval == Gdk.KEY_BackSpace) {
			const newValue = Math.trunc(props.value() / 10)
			props.setValue(newValue)
		} else if (keyval >= Gdk.KEY_0 && keyval <= Gdk.KEY_9) {
			const digit = keyval - Gdk.KEY_0

			const newValue = props.value() * 10 + digit
			if (inRange(newValue, props.range)) {
				props.setValue(newValue)
			} else {
				props.setValue(digit)
			}
		}
	}

	const setupFunction = (self: Gtk.Entry, props: NumberEntryProps) => {
		createEffect(() => {
			if (section() == props.index) {
				self.grab_focus()
			}
		})

		const focusController = new Gtk.EventControllerFocus()
		focusController.connect("enter", () => {
			setSection(props.index)
		})

		const keyPressed = new Gtk.EventControllerKey()
		keyPressed.propagationPhase = Gtk.PropagationPhase.CAPTURE
		keyPressed.connect("key-pressed", (self, keyval) =>
			keyPressedCallback(self, keyval, props),
		)

		self.add_controller(focusController)
		self.add_controller(keyPressed)
	}

	const NumberEntry = ({ range, index }: { range: Range; index: number }) => {
		const [value, setValue] = createState(0)

		return (
			<entry
				$={(self) => setupFunction(self, { value, setValue, range, index })}
				onNotifyText={(self) => {
					let possibleNextDigit = false
					for (let i = 0; i < 10; i++) {
						possibleNextDigit =
							possibleNextDigit || inRange(value() * 10 + i, range)
					}
					if (!possibleNextDigit) {
						setSection(Math.min(1, section() + 1))
					}
				}}
				text={value.as((val) => String(val).padStart(2, "0"))}
				xalign={0.5}
				maxWidthChars={2}
				maxLength={2}
				editable={false}
			/>
		)
	}

	return (
		<box
			$={(self) => {
				const keyPressed = new Gtk.EventControllerKey()
				keyPressed.set_propagation_phase(Gtk.PropagationPhase.CAPTURE)
				keyPressed.connect("key-pressed", (self, keyval: number) => {
					if (keyval === Gdk.KEY_Left) {
						setSection(Math.max(0, section() - 1))
						return true
					}
					if (keyval === Gdk.KEY_Right) {
						setSection(Math.min(1, section() + 1))
						return true
					}
					return false
				})

				self.add_controller(keyPressed)
			}}
		>
			<NumberEntry index={0} range={{ min: 1, max: 12 }} />
			<label label={":"} />
			<NumberEntry index={1} range={{ min: 0, max: 60 }} />
			<label label={" "} />
			<button
				label={morning.as((val) => (val ? "AM" : "PM"))}
				onClicked={(self) => {
					setMorning(!morning())
				}}
				class={"ampm"}
			/>
		</box>
	)
}
