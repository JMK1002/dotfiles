#!/usr/bin/env bash

# Get the CPU usage percentage using the 'top' command
cpuUsage=$(mpstat -P ALL 1 1 | awk 'END {print 100 - $NF}')

# Print the CPU usage percentage
printf "%.0f\n" "$cpuUsage"
