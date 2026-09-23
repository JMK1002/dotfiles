{
	config,
	...
}: {
	imports = [
		# Hardware config
		./hardware-configuration.nix

		# System modules
		../nixos/nix.nix
		../nixos/bootLoader.nix
		../nixos/network.nix
		../nixos/region.nix
		../nixos/printing.nix
		../nixos/audio.nix
		../nixos/hyprland.nix
		../nixos/ssh.nix
		../nixos/battery.nix
		../nixos/bluetooth.nix
		../nixos/noctalia.nix

		# Fonts
		../modules/fonts/nerdfonts.nix

		# Variables
		./variables.nix
	];

	users.users.${config.var.username} = {
		hashedPasswordFile = "secrets/${config.var.username}.hash";
		isNormalUser = true;
		extraGroups = ["wheel"];
	};

	# https://nixos.wiki/wiki/FAQ/When_do_I_update_stateVersion
	system.stateVersion = "25.11";
}
