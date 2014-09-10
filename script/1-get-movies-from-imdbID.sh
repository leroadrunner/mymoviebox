repdata=../data
repin=$repdata/imdbID
repout=$repdata/json-raw

for i in `ls $repin`; do
  item=`echo $i | awk -F. '{print $1}'`
  movie=`cat $repin/$i`
  wget -q -O $repout/${item}.json http://www.omdbapi.com/?i=$movie
done

