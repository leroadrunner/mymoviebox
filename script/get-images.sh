repdata=../data
repin=$repdata/processed-no
repout=../public/posters

eval `cat $repin/*.json |jq '.Poster'|awk '$0 !~ /\"N\/A/ {print "wget -q -P '$repout' "$0" ;"}'`
