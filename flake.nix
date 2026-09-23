{
	description = "Julian's Config";

	inputs = {
		nixpkgs.url = "github:nixos/nixpkgs/nixos-25.11";

		home-manager = {
			url = "github:nix-community/home-manager/release-25.11";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		noctalia = {
			url = "github:noctalia-dev/noctalia";
		};
	};

	outputs = {
		self,
		nixpkgs,
		home-manager,
		noctalia,
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
