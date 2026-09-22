{
	config,
	...
}: {
	imports = [
		# GUI modules
		../modules/gui/zed
		../modules/gui/kitty.nix
		../modules/gui/firefox.nix

		# TUI modules
		../modules/tui/git.nix

		# Variables
		./variables.nix
	];

	home = {
		username = config.var.username;
		homeDirectory = "/home/${config.var.username}";
	};

	programs.home-manager.enable = true;

	home.stateVersion = "25.11";
}
