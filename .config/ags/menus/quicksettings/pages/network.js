// import settings from ".../settings.js"
const { wifi } = await Service.import("network")

const menuOpened = Variable(0)

const WifiItemRevealer = (accessPoint) => {
        const username = Widget.Entry({
            className: "gradientBackground",
            placeholderText: "Username",
            visibility: true
        })

        const password = Widget.Entry({
            className: "gradientBackground",
            placeholderText: "Password",
            visibility: false
        })
        
        const connectButton = Widget.Button({
            label: "Connect",
            onClicked: () => {
                if (username.text == "" && password.text == "") {
                    Utils.execAsync(`nmcli device wifi connect ${accessPoint.bssid}`)
                }
                else if (username.text == "") {
                    Utils.execAsync(`nmcli device wifi connect ${accessPoint.bssid} password ${password.text}`)
                }
                else if (password.text == "") {
                    Utils.execAsync(`nmcli device wifi connect ${accessPoint.bssid} username ${username.text}`)
                }
                else {
                    Utils.execAsync(`nmcli device wifi connect ${accessPoint.bssid} username ${username.text} password ${password.text}`)
                }
            }
        })

        return Widget.Revealer({
            transition: "slide_down",
            child: Widget.Box({
                vertical: true,
                children: [
                    username,
                    password,
                    connectButton
                ]
            })
        })
}

const WifiItem = (accessPoint) => {
    const revealer = WifiItemRevealer(accessPoint)

    const icon = Widget.Icon(accessPoint.iconName)
    const label = Widget.Label(" " + accessPoint.ssid)
    const headerBox = Widget.Box({
        vertical: false,
        children: [
            icon,
            label
        ]
    })

    const headerButton = Widget.Button({
        child: headerBox,
        onClicked: () => {
            revealer.reveal_child = !revealer.reveal_child
            menuOpened.value += revealer.reveal_child ? 1 : -1
        }
    })

    return Widget.Box({
        vertical: true,
        children: [
            headerButton,
            revealer
        ]
    })
}

const ScrollableMenu = () => {
    const menu = Widget.Box({
        vertical: true,
        children: wifi.access_points
            .sort((a, b) => (b.strength - a.strength))
            .map(accessPoint => WifiItem(accessPoint))
    })
    .hook(wifi, self => {
        if (menuOpened.value == 0) {
            self.children = wifi.access_points
                .sort((a, b) => (b.strength - a.strength))
                .map(accessPoint => WifiItem(accessPoint))
        }
    }, "changed")
    .poll(20000, () => {
        if (wifi.enabled) wifi.scan()
    }) 

    return Widget.Scrollable({
        hscroll: "never",
        css: "min-height: 300px;",
        child: menu
    })
}

export const WifiMenu = (page) => {
    const backButton = Widget.Button({
        label: "",
        onClicked: () => {
            page.value = "home"
        }
    })
    
    const wifiToggle = Widget.ToggleButton({
        child: Widget.Icon({
            icon_name: wifi.icon_name || "network-wireless-disabled-symbolic"
        })
        .hook(wifi, self => {
            self.icon_name = wifi.icon_name || "network-wireless-disabled-symbolic"
        }, "changed"),
        active: !wifi.enabled,
        on_toggled: ({ active }) => {
            wifi.enabled = !wifi.enabled
            if (wifi.enabled) {
                wifi.scan()
            }
        }
    })

    const header = Widget.Box({
        vertical: false,
        css: "margin-bottom: 0.357rem;",
        children: [
                backButton,
                wifiToggle,
                Widget.Label({
                    className: "whiteText",
                    label: "Networks"
            })
        ]
    })

    return Widget.Box({
        className: "menuPadding",
        vertical: true,
        children: [
            header,
            ScrollableMenu()
        ]
    })
}