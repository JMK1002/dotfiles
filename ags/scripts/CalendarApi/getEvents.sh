source $HOME/.config/ags/scripts/CalendarApi/venv/bin/activate

# start=2000-1-1
# end=2100-1-1

start=$(date +%F -d'1 year ago')
end=$(date +%F -d'next year')

gcalcli agenda --tsv --details=all ${start} ${end} | sed -r 's/\t/,/g' | python -c 'import csv, json, sys; print(json.dumps([dict(r) for r in csv.DictReader(sys.stdin)]))'

deactivate

# {"id": "20260216_4145brf33cg0t00t3hut2m5jh0", "start_date": "2026-02-16", "start_time": "", "end_date": "2026-02-17", "end_time": "", "html_link": "https://www.google.com/calendar/event?eid=MjAyNjAyMTZfNDE0NWJyZjMzY2cwdDAwdDNodXQybTVqaDAgZW4udXNhI2hvbGlkYXlAdg", "hangout_link": "", "conference_entry_point_type": "", "conference_uri": "", "title": "Presidents' Day", "location": "", "description": "Public holiday", "calendar": "Holidays in United States", "email": "en.usa#holiday@group.v.calendar.google.com", "action": "patch"}
# id, start_date, start_time, end_date, end_time, html_link, title, location, description