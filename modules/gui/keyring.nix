{
	pkgs,
	...
}:
{
	# Configured to not need to login to keyring each login
	# Note that this uses tty login
	systemd.user.services.gnome-keyring = {
		Unit.Description = "GNOME Keyring";
		Service.ExecStart = "${pkgs.gnome-keyring}/libexec/gnome-keyring-daemon --start --components=secrets";
		Install.WantedBy = [ "default.target" ];
	};
}
