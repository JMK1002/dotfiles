{
	config,
	...
}: {
	programs.git = {
		enable = true;
		settings = {
			user = {
				name = config.var.git.name;
				email = config.var.git.email;
			};
			init.defaultBranch = "main";
			core.editor = "zed";
		};
	};
	programs.gh.enable = true;
}
