{
	config,
	lib,
	...
}: {
	config.var = {
		username = "Julian";
		hostname = "home";
		configDirectory = "/home/" + config.var.username + "/.dotfiles/nixos";
	};

	options.var = lib.mkOption {
		type = lib.types.attrs;
		readOnly = true;
	};
}
