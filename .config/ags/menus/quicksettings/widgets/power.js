const powerprofiles = await Service.import('powerprofiles')

const width = 350

export const powerButton = Widget.ToggleButton({
    css: `padding: 0.5rem; margin: 1rem; min-width: ${width / 2 - 45}px`,
    child: Widget.Icon({
        size: 30,
        icon: "battery-level-0-charging-symbolic"
    }),
    onToggled: (self) => {
        self.toggleClassName("saving", self.active)
        if (self.active) powerprofiles.active_profile = "power-saver"
        else powerprofiles.active_profile = "balanced"
    }
})
.hook(powerprofiles, self => {
    self.active = (powerprofiles.active_profile == "power-saver")
    self.toggleClassName("saving", self.active)
}, "changed")