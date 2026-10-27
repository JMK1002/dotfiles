{
	pkgs,
	inputs,
	...
}:
let
	pkgsUnstable = import inputs.nixpkgs-unstable {
		system = pkgs.stdenv.hostPlatform.system;
		config.allowUnfree = true;
	};
in
{
	home.packages = with pkgsUnstable; [
		osu-lazer-bin
		gamemode
	];
}
