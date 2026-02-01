import { Astal, Gdk, Gtk } from "ags/gtk4"
import app from "ags/gtk4/app"
import GObject from "gnim/gobject"
import { WindowProps } from "../types/widgets/window"

// interface WindowRevealerProps extends Gtk.Window.ConstructorProps {

// }

// export default (input : WindowRevealerProps) => <window
//     name={name}
//     class={className}
//     anchor={anchor}
//     layer={layer}
//     keymode={keymode}
//     exclusivity={exclusivity}
//     application={app}
//     visible={visible}
//     $={$}
//     >
        // <Gtk.EventControllerKey
        //     onKeyPressed={(self, keyval: number) => {
        //         if (keyval === Gdk.KEY_Escape) {
        //             app.toggle_window(name)
        //         }
        //     }}
        // />
//         {child}
// </window>

export default (window : Astal.Window) => {
    const exitEventController = new Gtk.EventControllerKey()
    exitEventController.connect("key-pressed", (self, keyval: number) => {
        if (keyval === Gdk.KEY_Escape) {
            app.toggle_window(window.name)
        }
    })

    window.add_controller(exitEventController)

    return window
}