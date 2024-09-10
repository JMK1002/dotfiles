import WindowRevealer from "../../utils/WindowRevealer.js"

const powerButton = Widget.Button({
    class_name: "shutdownButton",
    vpack: "center",
    child: Widget.Icon({
        size: 150,
        icon: `system-shutdown-symbolic`
    }),
    onClicked: () => {
        Utils.execAsync("shutdown now")
    }  
})

const restartButton = Widget.Button({
    class_name: "shutdownButton",
    vpack: "center",
    child: Widget.Icon({
        size: 150,
        icon: `emblem-synchronizing-symbolic`
    }),
    onClicked: () => {
        Utils.execAsync("reboot")
    }  
})

const lockButton = Widget.Button({
    class_name: "shutdownButton",
    vpack: "center",
    child: Widget.Icon({
        size: 150,
        icon: `system-lock-screen-symbolic`
    }),
    onClicked: () => {
        Utils.execAsync("hyprlock")
    }  
})

const sleepButton = Widget.Button({
    class_name: "shutdownButton",
    vpack: "center",
    child: Widget.Icon({
        size: 150,
        icon: `weather-few-clouds-night-symbolic`
    }),
    onClicked: () => {
        Utils.execAsync("systemctl suspend")
    }  
})

const exitButton = Widget.Button({
    class_name: "shutdownButton",
    vpack: "center",
    child: Widget.Icon({
        size: 150,
        icon: `application-exit-symbolic`
    }),
    onClicked: () => {
        App.closeWindow("powermenu")
    }  
})

const powerMenu = Widget.Box({
    className: "transparentBackground",
    homogeneous: false,
    children: [
        powerButton,
        restartButton,
        lockButton,
        sleepButton,
        exitButton
    ]
})

export const PowerMenu = WindowRevealer({
    name: "powermenu",
    anchor: [],
    child: powerMenu,
    keymode: "on-demand"
})