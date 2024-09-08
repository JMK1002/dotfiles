const hyprland = await Service.import("hyprland")

const workspaceCount = 5;

function getWorkspaceButton(id) {
    return Widget.Button({
        css: "background: none;",
        child: Widget.Label({
            setup: self=> {
                if (id == Number(hyprland.active.workspace.id)) self.label = ""
                else self.label = ""
            }
        })
        .hook(hyprland, (self) => {
            if (id == Number(hyprland.active.workspace.id)) self.label = ""
            else self.label = ""
        }, "changed"),
        onClicked: () => {
            Utils.execAsync(`hyprctl dispatch workspace ${id}`)
        }
    })
}

const buttons = []

for (let i = 1; i <= workspaceCount; i++) {
    buttons.push(getWorkspaceButton(i))
}

export const workspaces = Widget.Box({
    className: "gradientBackground",
    children: buttons
})