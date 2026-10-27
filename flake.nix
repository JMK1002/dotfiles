{
	description = "Julian's Config";

	inputs = {
		nixpkgs.url = "github:nixos/nixpkgs/nixos-26.05";
		nixpkgs-unstable.url = "github:nixos/nixpkgs/nixos-unstable";

		home-manager = {
			url = "github:nix-community/home-manager/release-26.05";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		noctalia = {
			url = "github:noctalia-dev/noctalia";
		};

		nixcord = {
			url = "github:4evy/nixcord";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		helium-browser = {
		    url = "github:oxcl/nix-flake-helium-browser";
		    inputs.nixpkgs.follows = "nixpkgs";
		};
	};

	outputs = {
		self,
		nixpkgs,
		home-manager,
		...
	} @ inputs: {
		nixosConfigurations = {
			home = nixpkgs.lib.nixosSystem {
				specialArgs = {inherit inputs;};
				modules = [
					./home/configuration.nix
					home-manager.nixosModules.home-manager {
						home-manager.useGlobalPkgs = true;
						home-manager.useUserPackages = true;
						home-manager.users.Julian = import ./home/home.nix;
					    home-manager.extraSpecialArgs = {
					      inherit inputs;
					    };
					}
				];
			};
		};
	};
}
