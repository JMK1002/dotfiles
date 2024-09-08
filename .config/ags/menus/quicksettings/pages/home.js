import { bottomBar } from "../widgets/batteryinfo.js"
import { brightnessSlider } from "../widgets/brightness.js"
import { powerButton } from "../widgets/power.js"

const width = 350;
const menuHeight = 500;
const height = width * 9 / 16 + menuHeight;
const pfpWidth = width * 0.4;
const pfpHeight = pfpWidth * 969 / 820;

const wallpaper = Widget.Box({
    className: "wallpaper",
    css: `min-width: ${width}px;
        min-height: ${width * 9 / 16}px;
        margin: 0px 0px ${menuHeight}px 0px;`
})

export const HomeMenu = (page) => {
    const pfp = Widget.Box({
        marginTop: width * 9 / 16 - pfpHeight / 2,
        marginLeft: width / 2 - pfpWidth / 2,
        marginRight: width / 2 - pfpWidth / 2,
        marginBottom: 6,
        className: "pfp",
        css: `min-width: ${pfpWidth}px; min-height: ${pfpHeight}px;`
    })

    const wifiButton = Widget.Button({
        css: `padding: 7px; margin: 14px; min-width: ${width / 2 - 45}px;`,
        child: Widget.Icon({
            className: "icon",
            size: 30,
            icon: `network-wireless-signal-good-symbolic`
        }),
        onClicked: () => {
            page.value = "wifi"
        }
    })

    const powerMenuButton = Widget.Button({
        css: "padding: 7px; margin: 14px;",
        child: Widget.Icon({
            className: "icon",
            size: 30,
            icon: `system-shutdown-symbolic`
        }),
        onClicked: () => {
            App.openWindow("powermenu")
        }
    })

    return Widget.Box({
        className: "background",
        child: Widget.Overlay({
            child: wallpaper,
            overlays: [
                Widget.Box({
                    vertical: true,
                    children: [
                        pfp,
                        Widget.Box({
                            hpack: "center",
                            children: [
                                wifiButton,
                                powerButton
                            ]
                        }),
                        powerMenuButton,
                        brightnessSlider,
                        bottomBar
                    ]
                })
            ]
        })
    })
}