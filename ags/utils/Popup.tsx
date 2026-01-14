#!/usr/bin/env -S ags run
import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import WindowRevealer from "./WindowRevealer"
import { Variable } from "astal"

const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor
const { IGNORE } = Astal.Exclusivity
const { EXCLUSIVE } = Astal.Keymode
const { CENTER } = Gtk.Align

export default ({
	name,
	child,
	toggled
} : {
	name : string,
	child : Gtk.Widget
	toggled : Variable<boolean>
}) => {
	toggled().subscribe(state => {
		App.toggle_window(name)
	})

	return WindowRevealer({
		name: name,
		className: "popup",
		child: child,
		anchor: TOP | BOTTOM | LEFT | RIGHT,
		layer: Astal.Layer.OVERLAY,
		keymode: Astal.Keymode.EXCLUSIVE,
		exclusivity: IGNORE,
		css: "",
		visible: false,
		setup: () => {},
	})
}