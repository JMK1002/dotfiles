{
	...
}:
{
	services.hyprpolkitagent.enable = true;

	wayland.windowManager.hyprland = {
		enable = true;
		xwayland.enable = true;
		extraConfig = ''
			-- Managed by Home Manager. Hyprland >= 0.55 (Lua config).

			local colors = require("wallust")

			---- Variables ----
			local terminal    = "kitty"
			local fileManager = "thunar"
			local mainMod     = "SUPER"

			---- Monitors ----
			hl.monitor({ output = "",     mode = "preferred",     position = "auto",      scale = 1, mirror = "eDP-1" })
			hl.monitor({ output = "DP-1", mode = "2560x1440@60", position = "auto-left", scale = 1 })
			hl.monitor({ output = "DP-2", mode = "2560x1440@60", position = "auto-left", scale = 1 })

			---- Autostart ----
			hl.on("hyprland.start", function()
				hl.exec_cmd("noctalia")
				hl.exec_cmd("systemctl --user start hyprpolkitagent")
			end)

			---- Environment ----
			hl.env("XCURSOR_SIZE", "24")
			hl.env("HYPRCURSOR_SIZE", "24")

			---- Look and feel ----
			hl.config({
				general = {
					gaps_in     = 5,
					gaps_out    = 20,
					border_size = 4,
					col = {
						active_border   = { colors = { colors.color13, colors.color5 }, angle = 45 },
						inactive_border = "rgba(595959aa)",
					},
					resize_on_border = false,
					allow_tearing    = true,
					layout           = "dwindle",
				},

				decoration = {
					rounding         = 3,
					active_opacity   = 1.0,
					inactive_opacity = 1.0,

					blur = {
						enabled        = true,
						size           = 11,
						passes         = 3,
						xray           = false,
						ignore_opacity = true,
						noise          = 0.08,
						contrast       = 1.5,
						vibrancy       = 0.1696,
					},
				},

				dwindle = {
					preserve_split = true,
				},

				master = {
					new_status = "master",
				},

				misc = {
					force_default_wallpaper = 0,
					disable_hyprland_logo   = true,
					middle_click_paste      = false,
				},

				input = {
					kb_layout     = "us",
					follow_mouse  = 1,
					accel_profile = "flat",
					sensitivity   = 0,
					touchpad = {
						natural_scroll       = true,
						disable_while_typing = false,
					},
				},

				cursor = {
					no_hardware_cursors = 1,
				},

				gestures = {
					workspace_swipe_touch    = true,
					workspace_swipe_distance = 500,
				},
			})

			---- Animations ----
			hl.curve("myBezier", { type = "bezier", points = { { 0.05, 0.5 }, { 0.3, 1.05 } } })

			hl.animation({ leaf = "windows",     enabled = true, speed = 3, bezier = "myBezier" })
			hl.animation({ leaf = "windowsOut",  enabled = true, speed = 3, bezier = "default", style = "popin 80%" })
			hl.animation({ leaf = "border",      enabled = true, speed = 5, bezier = "default" })
			hl.animation({ leaf = "borderangle", enabled = true, speed = 4, bezier = "default" })
			hl.animation({ leaf = "fade",        enabled = true, speed = 3, bezier = "default" })
			hl.animation({ leaf = "workspaces",  enabled = true, speed = 4, bezier = "default" })

			---- Touchpad gesture ----
			hl.gesture({ fingers = 3, direction = "horizontal", action = "workspace" })

			---- Workspace rules ----
			for i = 1, 5 do
				hl.workspace_rule({ workspace = tostring(i), monitor = "eDP-1", persistent = true })
			end

			---- Keybindings ----
			hl.bind(mainMod .. " + Q", hl.dsp.exec_cmd(terminal))
			hl.bind(mainMod .. " + C", hl.dsp.window.close())
			hl.bind(mainMod .. " + M", hl.dsp.exit())
			hl.bind(mainMod .. " + E", hl.dsp.exec_cmd(fileManager))
			hl.bind(mainMod .. " + V", hl.dsp.window.float({ action = "toggle" }))
			hl.bind(mainMod .. " + R", hl.dsp.exec_cmd("noctalia msg panel-toggle launcher"))
			hl.bind(mainMod .. " + P", hl.dsp.window.pin())
			hl.bind(mainMod .. " + J", hl.dsp.layout("togglesplit"))
			hl.bind(mainMod .. " + L", hl.dsp.exec_cmd("noctalia msg session lock"))
			hl.bind(mainMod .. " + SHIFT + S", hl.dsp.exec_cmd("noctalia msg screenshot-region"))

			hl.bind(mainMod .. " + right", hl.dsp.focus({ direction = "right" }))
			hl.bind(mainMod .. " + left",  hl.dsp.focus({ direction = "left" }))
			hl.bind(mainMod .. " + up",    hl.dsp.focus({ direction = "up" }))
			hl.bind(mainMod .. " + down",  hl.dsp.focus({ direction = "down" }))

			for i = 1, 5 do
				local ws = tostring(i)
				hl.bind(mainMod .. " + " .. ws,         hl.dsp.focus({ workspace = "m~" .. ws }))
				hl.bind(mainMod .. " + SHIFT + " .. ws, hl.dsp.window.move({ workspace = "m~" .. ws }))
			end

			hl.bind(mainMod .. " + F", hl.dsp.window.fullscreen({ action = "toggle" }))

			hl.bind(mainMod .. " + SHIFT + right", hl.dsp.window.resize({ x = 80,  y = 0,   relative = true }), { repeating = true })
			hl.bind(mainMod .. " + SHIFT + left",  hl.dsp.window.resize({ x = -80, y = 0,   relative = true }), { repeating = true })
			hl.bind(mainMod .. " + SHIFT + up",    hl.dsp.window.resize({ x = 0,   y = -80, relative = true }), { repeating = true })
			hl.bind(mainMod .. " + SHIFT + down",  hl.dsp.window.resize({ x = 0,   y = 80,  relative = true }), { repeating = true })

			hl.bind(mainMod .. " + mouse:272", hl.dsp.window.drag(),   { mouse = true })
			hl.bind(mainMod .. " + mouse:273", hl.dsp.window.resize(), { mouse = true })
		'';
	};
}
