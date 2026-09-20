{
	config,
	...
}: {
	imports = [
		./variables.nix

		../modules/gui/zed
		../modules/gui/kitty.nix
		../modules/gui/firefox.nix

		../modules/tui/git.nix
	];

	home = {
		username = config.var.username;
		homeDirectory = "/home/${config.var.username}";
	};

	programs.home-manager.enable = true;

	home.stateVersion = "25.11";
}
