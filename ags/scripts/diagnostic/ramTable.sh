
processes=9
input=$(ps aux --sort=-%mem | head -n $((processes+1)) | awk '{print $4, $11}' | tail -n $((processes)))
# Create an array for the top processes
processes_array=()

# Loop through the top processes and add them to the array
first_line=true
while read -r line; do
	if [ "$first_line" = true ]; then
		first_line=false
	else
		processes_array+=(",")
	fi
	percent=$(echo "$line" | awk '{print $1}')
	command=$(echo "$line" | awk '{print $2}')
	bn=$(basename $command)

	processes_array+=("{\"process\": \"$bn\", \"%\": \"$percent\"}")
done <<<"$input"
# Print the JSON array
echo "[${processes_array[@]}]"
