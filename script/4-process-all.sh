# update jsons with specifics records
repdata=../data
repin=$repdata/processed-image
repout=$repdata/processed-all
mmbRecordDate=`date '+%Y%m%d%H%M%S'`

echo ; echo "---------------------------------" ; echo $0 ; echo

for i in `ls $repin/*.json`;  do 
  file=`basename $i`
  r=`echo $file|awk -F. '{print $1}'`
  size=`grep ./$r $repdata/movies-list.csv | awk -F\; '{print $1}'`
  set -x; cat $i | ./jq -c '.size="'$size'"' | ./jq -c '.mmbRecordDate="'$mmbRecordDate'"' > $repout/${file}; set +x
done
