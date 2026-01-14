import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { exec, execAsync, Variable } from "astal"
import Workspaces from "./components/Workspaces"
import BackgroundButton from "./components/BackgroundButton"
import WofiButton from "./components/WofiButton"
import CalendarButton from "./components/CalendarButton"


// * Have Wofi launcher, workspaces, bg changer, media, frequently used apps (maybe), diagnostic, quicksettings, calendar, power

export default function Bar(gdkmonitor: Gdk.Monitor) {
    return <window
        name="Bar"
        className="Bar"
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={Astal.WindowAnchor.TOP
            | Astal.WindowAnchor.LEFT
            | Astal.WindowAnchor.RIGHT}
        application={App}>

        <box 
        spacing={20}
        halign={Gtk.Align.START}>
            <WofiButton />
            <Workspaces />
            <BackgroundButton />
            <CalendarButton />
        </box>
    </window>
}