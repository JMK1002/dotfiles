import WindowRevealer from "../../utils/WindowRevealer.js"

const ram = Variable(0)
const cpu = Variable(0)
const temp = Variable(0)

Utils.interval(30000, () => {
    Utils.execAsync(`bash ${App.configDir}/scripts/ram.sh`)
    .then((val) => {
        ram.value = val
    })
    .catch(print)

    Utils.execAsync(`bash ${App.configDir}/scripts/cpu.sh`)
    .then((val) => {
        cpu.value = val
    })
    .catch(print)

    Utils.execAsync(`bash ${App.configDir}/scripts/temp.sh`)
    .then((val) => {
        temp.value = val
    })
    .catch(print)
})

const getIcon = (col, icon) => Widget.Icon({
    css: `color: @color${col};`,
    size: 75,
    icon: icon
})

const getProgress = (col, icon, val, end) => {
    const circularProgress = Widget.CircularProgress({
        className: "circularProgress",
        css: `color: @color${col}; background-color: @color${col - 8};`,
        rounded: true,
        inverted: false,
        value: val.bind().as(val => val / 100),
        child: Widget.EventBox({
            child: Widget.Box({
                hpack: "center",
                vpack: "center",
                child: getIcon(col, icon)
            }),
            onHover: self => {
                self.child.child = Widget.Label({
                    css: "font-size: 2.4rem; font-weight: bold;",
                    label: `${val.value}${end}`
                })
            },
            onHoverLost: self => {
                self.child.child = getIcon(col, icon)
            }
        })
    })

    return Widget.Box({
        css: "padding: 1rem;",
        child: circularProgress
    })
}

export const DiagnosticMenu = WindowRevealer({
    name: "diagnosticmenu",
    anchor: ["top", "left"],
    layer: "overlay",
    child: Widget.Box({
        className: "transparentBackground",
        children: [
            getProgress(12, "ram-symbolic", ram, "%"), 
            getProgress(13, "cpu-symbolic", cpu, "%"), 
            getProgress(14, "temp-symbolic", temp, "°C")
        ]
    }),
    keymode: "on-demand"
})

