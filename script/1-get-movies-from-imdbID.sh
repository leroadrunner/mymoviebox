repdata=../data
repin=$repdata/imdbID
repout=$repdata/json-raw

echo ; echo "---------------------------------" ; echo $0 ; echo
 
for i in `ls $repin`; do
  item=`echo $i | awk -F. '{print $1}'`
  movie=`cat $repin/$i`
  set -x; wget -q -O $repout/${item}.json http://www.omdbapi.com/?i=$movie ;set +x
done

