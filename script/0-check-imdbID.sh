repdata=../data
repin=$repdata/filenames
repout=$repdata/imdbID

echo
echo "---------------------------------"
echo $0
echo

ndbls=`awk -F: '{print $1}' $repin/*.imdbid|sort|uniq -c|awk '{print $1}'|sort|uniq -c|wc -l`
if test $ndbls -gt 1; then 
	echo "doublons detectés - exit 2"
	exit 2
fi
echo "deplacement des fichiers de $repin vers $repout"

eval `grep ^tt $repin/*.imdbid|awk -F: '{print "mv "$1" '$repout/' ;"}'`
