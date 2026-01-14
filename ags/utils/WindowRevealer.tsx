import {Gtk, App, Astal, Gdk} from "astal/gtk3"
import {Variable} from "astal"

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
    className={className}
    anchor={anchor}
    layer={layer}
    keymode={keymode}
    exclusivity={exclusivity}
    application={App}
    visible={visible}
    setup={setup}
    onKeyPressEvent={(self, event: Gdk.Event) => {
        if (event.get_keyval()[1] === Gdk.KEY_Escape) {
            self.hide()
        }
    }}
    >
        {child}
</window>