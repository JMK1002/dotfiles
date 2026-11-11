{
	...
}: {
	programs.kitty = {
		enable = true;
		font = {
			name = "JetBrainsMono Nerd Font";
			size = 15;
		};

		settings = {
			# Text
			hide_window_decorations = "yes";
			window_margin_width = 4;

			# Misc
			sync_to_monitor = "yes";
			confirm_os_window_close = 0;
			remember_window_size = "no";

			# Background
			background_opacity = 0.65;

			# Tabs
			tab_bar_edge = "top";
			tab_bar_style = "powerline";
			tab_powerline_style = "slanted";
			tab_title_max_length = 0;
			active_tab_font_style = "bold";
			tab_bar_min_tabs = 1;

			# Audio
			enable_audio_bell = "no";
		};

		# Note that this looks weird in the conf because of the indentation
		extraConfig = ''
			include wallust.conf

			# Tab shortcuts
			map ctrl+w close_tab
			map ctrl+t new_tab
			map ctrl+1 goto_tab 1
			map ctrl+2 goto_tab 2
			map ctrl+3 goto_tab 3
			map ctrl+4 goto_tab 4
			map ctrl+5 goto_tab 5

			# Movement shortcuts
			map ctrl+up scroll_line_up
			map ctrl+down scroll_line_down
			map ctrl+backspace send_text all \x17
		'';
	};
}
