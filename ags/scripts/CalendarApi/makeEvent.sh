source $HOME/.config/ags/scripts/CalendarApi/venv/bin/activate

# Example command:
# bash makeEvent.sh jmkovalovsky@gmail.com "Test" 2025-02-28 "leos kitchen (trust)" 1 "hehe"

calendar=$1
title=$2
# yyyy-mm-dd HH:MM(am/pm)
when=$3
where=$4
# in minutes
duration=$5
description=$6

gcalcli add \
	--calendar "${calendar}" \
	--title "${title}" \
	--when "${when}" \
	--where "${where}" \
	--duration "${duration}" \
	--description "${description}"

deactivate