{
	...
}: {
	imports = [
		./lsps
	];

	programs.zed-editor = {
		enable = true;
		userSettings = {
			tab_size = 4;
			hard_tabs = true;
		};
	};
}
