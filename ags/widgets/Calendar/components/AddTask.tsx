import { App, Gdk, Gtk } from "astal/gtk3"
import Popup from "../../../utils/Popup"
import { execAsync, Variable } from "astal"
import settings from "../../../settings.json"

const createEntry = (placeholder : string, value : Variable<string>) => <entry
	placeholderText={placeholder}
	onChanged={(self) => {
		value.set(self.text)
	}}
/>

const fields : Variable<string>[] = []
for (let i = 0; i < 6; i++) fields.push(Variable(""))
fields[0].set(settings['calendarEmail'])

const menu : Gtk.Widget = <box halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER} vertical>
	<label label="Add an event" />

	<box homogeneous>
		{createEntry("Title", fields[1])}
		{createEntry("When (yyyy-mm-dd HH:MMam/pm)", fields[2])}
	</box>
	<box homogeneous>
		{createEntry("Where", fields[3])}
		{createEntry("Duration (min)", fields[4])}
	</box>
	<box homogeneous>
		{createEntry("Description", fields[5])}
	</box>
	<box homogeneous>
		<button
			onClicked={() => {
				let cmd = "bash ./scripts/CalendarApi/makeEvent.sh "
				for (let i = 0; i < 6; i++) cmd += "\"" + fields[i].get() + "\" "
				execAsync(cmd).then(() => print("Task Added"))
			}}>
				Add Task
		</button>
		<button
			onClicked={() => App.toggle_window("AddTaskPopup")}>
				Quit
		</button>
	</box>
</box>

export const toggled = Variable(true)

export default () => Popup({
	name: "AddTaskPopup",
	child: menu,
	toggled: toggled
})