{
	...
}:
let
	templates = {
		# filename = desired path
		"kitty.conf" = "~/.config/kitty/wallust.conf";
		"hypr.conf" = "~/.config/hypr/wallust.conf";
		"zed.json" = "~/.config/zed/themes/wallust.json";
	};
in
{
	# Creates template files in .config
	xdg.configFile = (builtins.attrNames templates) |>
		map (filename: {
			name = "wallust/templates/${filename}";
			value.source = ./templates/${filename};
		}) |>
		builtins.listToAttrs;

	# Enables wallust and creates wallust.toml
	programs.wallust = {
		enable = true;
		settings = {
			backend = "fastresize";
			color_space = "labmixed";
			palette = "dark16";
			check_contrast = true;

			templates = templates |>
				builtins.mapAttrs (filename: target: {
					template = "${filename}";
					inherit target;
				});
		};
	};
}
