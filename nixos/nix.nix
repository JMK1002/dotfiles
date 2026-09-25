{
	...
}:
{
	nix = {
		settings = {
			experimental-features = [ "nix-command" "flakes" "pipe-operators" ];
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
