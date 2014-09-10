repdata=../data
repin=$repdata/processed-image
repout=$repdata/processed-all

for i in `ls $repin/*.json`;  do 
  file=`basename $i`
  r=`echo $file|awk -F. '{print $1}'`
  size=`grep $r $repdata/movies-list.csv | awk -F\; '{print $1}'`
  ./jq -c '.size="'$size'"' $i > $repout/${file}
done
