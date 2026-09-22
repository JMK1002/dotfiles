{
	config,
	...
}:
{
	time.timeZone = config.var.timeZone;
	time.hardwareClockInLocalTime = true;
	i18n.defaultLocale = config.var.defaultLocale;
}
