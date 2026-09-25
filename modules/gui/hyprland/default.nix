{
	...
}:
{
	wayland.windowManager.hyprland = {
		enable = true;

		settings = {
			source = [ "./wallust.conf" ];

			# Variables
			"$terminal" = "kitty";
			"$fileManager" = "thunar";
			"$mainMod" = "SUPER";

			# Monitors
			monitor = [
				",preferred,auto,1,mirror,eDP-1"
				"DP-1,2560x1440@60,auto-left,1"
				"DP-2,2560x1440@60,auto-left,1"
			];

			# Autostart
			"exec-once" = [
				"noctalia"
			];

			# Environment
			env = [
				"XCURSOR_SIZE,24"
				"HYPRCURSOR_SIZE,24"
			];

			# Look and Feel
			general = {
				gaps_in = 5;
				gaps_out = 20;
				border_size = 4;
				"col.active_border" = "$color13 $color5 45deg";
				"col.inactive_border" = "rgba(595959aa)";
				resize_on_border = false;
				allow_tearing = true;
				layout = "dwindle";
			};

			decoration = {
				rounding = 3;
				active_opacity = 1.0;
				inactive_opacity = 1.0;

				blur = {
					enabled = true;
					size = 11;
					passes = 3;
					xray = 0;
					ignore_opacity = 1;
					noise = 0.08;
					contrast = 1.5;
					vibrancy = 0.1696;
				};
			};

			animations = {
				enabled = true;
				bezier = [ "myBezier, 0.05, 0.5, 0.3, 1.05" ];
				animation = [
					"windows, 1, 3, myBezier"
					"windowsOut, 1, 3, default, popin 80%"
					"border, 1, 5, default"
					"borderangle, 1, 4, default"
					"fade, 1, 3, default"
					"workspaces, 1, 4, default"
				];
			};

			dwindle = {
				pseudotile = true;
				preserve_split = true;
			};

			master = {
				new_status = "master";
			};

			misc = {
				force_default_wallpaper = 0;
				disable_hyprland_logo = true;
				middle_click_paste = false;
			};

			# Input & Gestures
			input = {
				kb_layout = "us";
				follow_mouse = 1;
				accel_profile = "flat";
				sensitivity = 0;
				touchpad = {
					natural_scroll = true;
					disable_while_typing = false;
				};
			};

			gestures = {
				workspace_swipe_touch = true;
				workspace_swipe_distance = 500;
				gesture = [ "3, horizontal, workspace" ];
			};

			# Workspace Rules
			workspace = [
				"1, monitor:eDP-1, persistent:true"
				"2, monitor:eDP-1, persistent:true"
				"3, monitor:eDP-1, persistent:true"
				"4, monitor:eDP-1, persistent:true"
				"5, monitor:eDP-1, persistent:true"
			];

			# Keybindings
			bind = [
				"$mainMod, Q, exec, $terminal"
				"$mainMod, C, killactive,"
				"$mainMod, M, exit,"
				"$mainMod, E, exec, $fileManager"
				"$mainMod, V, togglefloating,"
				"$mainMod, R, exec, noctalia msg panel-toggle launcher"
				"$mainMod, P, exec, hyprctl dispatch pin"
				"$mainMod, J, togglesplit,"
				"$mainMod, L, exec, noctalia msg session lock"
				"$mainMod+SHIFT, S, exec, noctalia msg screenshot-region"

				"$mainMod, right, movefocus, r"
				"$mainMod, left, movefocus, l"
				"$mainMod, up, movefocus, u"
				"$mainMod, down, movefocus, d"

				"$mainMod, 1, workspace, m~1"
				"$mainMod, 2, workspace, m~2"
				"$mainMod, 3, workspace, m~3"
				"$mainMod, 4, workspace, m~4"
				"$mainMod, 5, workspace, m~5"

				"$mainMod+SHIFT, 1, movetoworkspace, m~1"
				"$mainMod+SHIFT, 2, movetoworkspace, m~2"
				"$mainMod+SHIFT, 3, movetoworkspace, m~3"
				"$mainMod+SHIFT, 4, movetoworkspace, m~4"
				"$mainMod+SHIFT, 5, movetoworkspace, m~5"

				"$mainMod, F, fullscreen"
			];

			binde = [
				"$mainMod+SHIFT, right, resizeactive, 80 0"
				"$mainMod+SHIFT, left, resizeactive, -80 0"
				"$mainMod+SHIFT, up, resizeactive, 0 -80"
				"$mainMod+SHIFT, down, resizeactive, 0 80"
			];

			bindm = [
				"$mainMod, mouse:272, movewindow"
				"$mainMod, mouse:273, resizewindow"
			];
		};
	};
}
