# .dotfiles

Julian's personal NixOS configuration, managed as a Nix flake with Home Manager.

## Overview

- **System**: NixOS, flake output `nixosConfigurations.home`
- **Desktop**: Hyprland (Wayland compositor) + Noctalia shell
- **Home Manager**: manages user-level packages and dotfiles, integrated into the NixOS build (no separate `home-manager switch` needed)

## Structure

```
.
├── flake.nix              # Flake inputs/outputs
├── flake.lock
├── home/
│   ├── configuration.nix  # Top-level NixOS system config, imports nixos/ modules
│   ├── home.nix           # Top-level Home Manager config, imports modules/ modules
│   ├── hardware-configuration.nix
│   ├── variables.nix      # Shared settings (username, hostname, timezone, git identity)
│   └── secrets/           # Password hash, etc.
├── nixos/                 # System-level modules (audio, bluetooth, network, bootloader, ...)
├── modules/
│   ├── cli/                # CLI tools (git, claude, duckdb, fastfetch, languages, wallust)
│   └── gui/                # GUI apps (hyprland, noctalia, kitty, zed, helium, spotify, nixcord, ...)
│   └── fonts/               # Nerd Fonts
├── overlays/               # Nixpkgs overlays
└── pkgs/                   # Custom package derivations
```

## Usage

Rebuild and switch the system (from `/etc/nixos` symlinked to this repo, or run directly with `--flake`):

```sh
sudo nixos-rebuild switch --flake .#home
```

## Notable bits

- `home/variables.nix` centralizes machine-specific settings (username, hostname, timezone, git name/email) via a custom `config.var` option, consumed by both the NixOS and Home Manager configs.
- Flake inputs include `nixpkgs` (26.05), `nixpkgs-unstable`, `home-manager`, and a few third-party flakes: `noctalia`, `nixcord`, `helium-browser`.
