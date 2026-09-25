{
	...
}: {
	imports = [
		./lsps
	];

	programs.zed-editor = {
		enable = true;
		userSettings = {
			format_on_save = "off";
			theme = "wal-readable";
			tab_size = 4;
			hard_tabs = true;
		};
	};
}
