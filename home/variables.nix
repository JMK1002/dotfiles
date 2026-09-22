{
	config,
	lib,
	...
}: {
	config.var = {
		username = "Julian";
		hostname = "home";
		configDirectory = "/home/" + config.var.username + "/.dotfiles/nixos";

		timeZone = "America/New_York";
		defaultLocale = "en_US.UTF-8";
	};

	options.var = lib.mkOption {
		type = lib.types.attrs;
		readOnly = true;
	};
}
