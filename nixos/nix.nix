{
	...
}:
{
	nix = {
		settings = {
			experimental-features = [ "nix-command" "flakes" ];
			flake-registry = "";
		};
		channel.enable = false;
	};

	nixpkgs = {
		overlays = [

		];

		config = {
			allowUnfree = true;
		};
	};
}
