import { Astal, Gdk, Gtk } from "ags/gtk4"
import app from "ags/gtk4/app"


export default ({
    name,
    className,
    child,
    anchor=Astal.WindowAnchor.NONE,
    layer=Astal.Layer.TOP,
    keymode=Astal.Keymode.ON_DEMAND,
    exclusivity=Astal.Exclusivity.NORMAL,
    visible,
    setup,
} : {
    name : string,
    className : string,
    child : Gtk.Widget,
    anchor : number,
    layer : Astal.Layer,
    keymode : Astal.Keymode,
    exclusivity : Astal.Exclusivity,
    css : string
    visible : boolean
    setup : () => void
}) => <window
    name={name}
    class={className}
    anchor={anchor}
    layer={layer}
    keymode={keymode}
    exclusivity={exclusivity}
    application={app}
    visible={visible}
    $={setup}
    >
        <Gtk.EventControllerKey
            onKeyPressed={(self, keyval: number) => {
                if (keyval === Gdk.KEY_Escape) {
                    app.toggle_window(name)
                }
            }}
        />
        {child}
</window>