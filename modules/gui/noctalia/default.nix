{
	inputs,
	...
}:
{
	imports = [
		inputs.noctalia.homeModules.default
	];

	programs.noctalia = {
		enable = true;
		systemd.enable = true;
		settings = {
			shell = {
		        launch_apps_as_systemd_services = true;
			};
			hooks = {
				wallpaper_changed = "wallust run -p=harddark16 \"$NOCTALIA_WALLPAPER_PATH\" && pkill -SIGUSR1 kitty";
			};
		};
	};
}
