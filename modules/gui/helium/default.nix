{
	inputs,
	config,
	pkgs,
	...
}:
{
	imports = [
		inputs.helium-browser.homeModules.default
	];

	programs.helium = {
		enable = true;
		package = inputs.helium-browser.packages.${pkgs.stdenv.hostPlatform.system}.helium;
		flags = [
			"--ozone-platform=wayland"
			"--enable-features=UseOzonePlatform,VaapiVideoDecoder,VaapiVideoEncoder,CanvasOopRasterization"
			"--disable-features=UseChromeOSDirectVideoDecoder,WaylandWpColorManagerV1"
			"--enable-accelerated-video-decode"
			"--enable-gpu-rasterization"
			"--use-gl=egl"
			# "--no-default-browser-check"
			# "--show-avatar-button=never"

			"--force-dark-mode"
			"--load-extension=/home/${config.var.username}/.config/helium/theme/"
		];

	};
}
