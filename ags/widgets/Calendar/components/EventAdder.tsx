import { Astal, Gdk, Gtk } from "ags/gtk4"
import Popup from "../../../utils/Popup"
import app from "ags/gtk4/app"
import { jsx } from "gnim"
import TimeSelector from "../../../utils/TimeSelector"

export default (gdkmonitor: Gdk.Monitor) => (
	<Popup
		name={`EventAdder-${gdkmonitor.connector}`}
		application={app}
		gdkmonitor={gdkmonitor}
		class={"transparentBackground darkerBackground"}
		layer={Astal.Layer.TOP}
		keymode={Astal.Keymode.EXCLUSIVE}
		exclusivity={Astal.Exclusivity.EXCLUSIVE}
		visible={false}
		margins={[0, 0, 0, 0]} // just in the center
	>
		<box orientation={Gtk.Orientation.VERTICAL}>
			<box orientation={Gtk.Orientation.HORIZONTAL}>
				<entry
					placeholderText="Enter Summary..."
					text=""
					onNotifyText={({ text }) => print(text)}
				/>
			</box>
			<box orientation={Gtk.Orientation.HORIZONTAL}>
				<TimeSelector />
			</box>
		</box>
	</Popup>
)
