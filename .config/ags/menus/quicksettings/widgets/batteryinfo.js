const battery = await Service.import("battery")

function getBatteryString() {
    const start = `${Math.trunc(battery.percent)}%`

    let mid = `${Math.trunc(battery.time_remaining / 3600)}hr`
    if (battery.time_remaining >= 7200) mid += `s`

    let end = `${Math.trunc(battery.time_remaining / 60 % 60)}min`;
    if (battery.time_remaining % 3600 >= 120) end += `s`

    return start + `, ` + mid + ` ` + end
}

function getIcon() {
    if (battery.charging) return `battery-level-${Math.trunc(battery.percent / 10) * 10}-charging-symbolic`
    else return `battery-level-${Math.trunc(battery.percent / 10) * 10}-symbolic`
}

export const bottomBar = Widget.Box({
    hpack: "end",
    css: "padding: 1rem",
    children: [
        Widget.Label({
            className: "whiteText",
            css: "font-size: 18px",
            label: getBatteryString()
        })
        .hook(battery, (self) => {
            self.label = getBatteryString()
        }, "changed"),
        Widget.Icon({
            icon: battery.icon_name,
            size: 25
        })
        .hook(battery, (self) => {
            self.icon = getIcon()
        }, "changed"),
    ]
})