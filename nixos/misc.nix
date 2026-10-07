{
	pkgs,
	...
}:
{
	# Allows dynamic linking
	# useful for using uv to create python venvs
	programs.nix-ld = {
		enable = true;
		libraries = with pkgs; [
			stdenv.cc.cc.lib   # libstdc++.so.6 for most wheels
			zlib               # CPython, many compiled extensions
			openssl
			libffi
			glibc
		];
	};
}
