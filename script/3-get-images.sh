repdata=../data
repin=$repdata/json-raw
repout=../public/posters

echo ; echo "---------------------------------" ; echo $0 ; echo

set -x; eval `cat $repin/*.json |./jq '.Poster'|awk '$0 !~ /\"N\/A/ {print "wget -q -P '$repout' "$0" ;"}'` 
