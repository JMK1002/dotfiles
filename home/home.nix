{
	config,
	...
}: {
	imports = [
		# GUI modules
		../modules/gui/hyprland
		../modules/gui/noctalia
		../modules/gui/zed
		../modules/gui/helium
		../modules/gui/nixcord
		../modules/gui/kitty.nix

		# CLI modules
		../modules/cli/wallust
		../modules/cli/git.nix

		# Variables
		./variables.nix
	];

	home = {
		username = config.var.username;
		homeDirectory = "/home/${config.var.username}";
	};

	programs.home-manager.enable = true;

	home.stateVersion = "26.05";
}
