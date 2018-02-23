#!/bin/bash
stop=100
check(){
	if [[ $(($1 % $2)) -eq "0" ]];then
		output+=$3
	fi
return 1
}
for ((i=1 ; i<=$stop; i++)); do
	check $i 3 fizz
	check $i 5 buzz
	if [[ $output == "" ]];then
		echo $i
	else
		echo $output
	fi
	output=""
done
