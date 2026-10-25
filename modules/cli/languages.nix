{
	pkgs,
	...
}:
{
	home.packages = with pkgs; [
		(python3.withPackages (ps: with ps; [
			dbus-python
			pip
		]))
		uv
		gnumake
		gcc
		lldb
		clang-tools
		nodejs
		typst
		ocaml

	];
}
