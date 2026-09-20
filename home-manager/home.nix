{
  inputs,
  lib,
  config,
  pkgs,
  ...
}: {
  imports = [

  ];

  home = {
    username = "Julian";
    homeDirectory = "/home/Julian";
  };

  home.packages = with pkgs; [
      wget
      kitty
      zed-editor
    ];

  programs.home-manager.enable = true;
  programs.firefox.enable = true;

  programs.git = {
    enable = true;
    settings.user = {
      name = "Julian Kovalovsky";
      email = "JMKovalovsky@gmail.com";
    };
  };

  home.stateVersion = "25.11";
}
