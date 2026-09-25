{
	inputs,
	...
}:
{
	imports = [ inputs.nixcord.homeModules.nixcord ];

	programs.nixcord = {
		enable = true;

		discord.vencord.enable = true;
		vesktop.enable = true;

		config = {
			useQuickCss = false;
			frameless = true;

			enabledThemes = [
				"wallust.css"
			];

			plugins = {
				alwaysAnimate.enable = true;
			};
		};
	};
}
