const brightnessData = Utils.exec("brightnessctl -m").split(",")
const brightnessValue = Variable(Number(brightnessData[2]))

export const brightnessSlider = Widget.Box({
    css: "margin: 1rem;",
    children: [
        Widget.Icon({
            icon: "display-brightness-symbolic",
            size: 50
        }),
        Widget.Slider({
            hexpand: true,
            drawValue: false,
            min: 0,
            max: Number(brightnessData[4]),
            value: brightnessValue.bind(),
            onChange: ({ value }) => {
                brightnessValue.value = value
                Utils.execAsync(`brightnessctl s ${brightnessValue.value}`)
            }
        })
    ]
})