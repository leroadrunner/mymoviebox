repdata=../data
repout=$repdata/json-raw

echo
echo "---------------------------------"
echo $0
echo

for i in `cat $repdata/movies-list.csv`; do
  item=`echo $i | awk -F\; '{print $2}' | sed 's/^\.\///g'`
  movie=`echo "$item"|sed 's/\(^[A-Z]\)/\L\1/' | sed 's/\([A-Z]\)/\%20\1/g' `
  wget -q -O $repout/${item}.json http://www.omdbapi.com/?t=$movie
done

