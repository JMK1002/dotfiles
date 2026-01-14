import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import Wifi from "./components/Wifi"

export default function Quicksettings(gdkmonitor: Gdk.Monitor) {
    return <window
        name="Quicksettings"
        className="Quicksettings"
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={Astal.WindowAnchor.TOP
            | Astal.WindowAnchor.RIGHT}
        application={App}>

        <box>
            {Wifi}
        </box>
    </window>
}