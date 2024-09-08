export default ({
    name,
    anchor = [],
    layer = "overlay",
    child,
    keymode = "on-demand"
}) => {
    const revealer = Widget.Revealer({
        revealChild: false,
        transition: "slide_left",
        child: Widget.Box({
            css: "padding: 0.1rem;",
            child
        })
    })
    const but = Widget.Button({
        onClicked: () => {revealer.revealChild = !revealer.revealChild}
    })

    const box = Widget.Box({children: [but, revealer]})

    return Widget.Window({
        name,
        anchor,
        layer,
        keymode,
        child: box,
        setup: (w) => w.keybind("Escape", () => App.closeWindow(name))
    })
}
