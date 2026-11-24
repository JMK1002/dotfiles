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
		vite
		docker
		tailwindcss
		typst
		ocaml
		postgresql
		gradle
		maven
	];

	programs.java = {
		enable = true;
		package = pkgs.jdk25;
	};
}
