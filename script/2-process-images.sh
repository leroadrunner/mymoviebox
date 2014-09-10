# modifie the image adress in json file
repdata=../data
repin=$repdata/json-raw
repout=$repdata/processed-image

for i in `ls $repin/*.json`;  do 
  file=`basename $i`
  poster=`./jq '.Poster' $i | awk -F/ '{print $NF}' | sed 's/\"//g' | sed 's/^A$/NA/g' `; ./jq -c '.Poster="'$poster'"' $i > $repout/$file
done
