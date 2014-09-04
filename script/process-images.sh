repdata=../data
repin=$repdata/processed-no
repout=$repdata/processed-image

for i in $repin/*.json;  do 
  file=`basename $i`
  poster=`jq '.Poster' $i | awk -F/ '{print $NF}' | sed 's/\"//g' | sed 's/^A$/NA/g' `; jq -c '.Poster="'$poster'"' $i > $repout/$file
done