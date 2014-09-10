repdata=../data
repin=$repdata/processed-all
i=0

function getCredentials() {
	url=`meteor mongo --url mymoviebox`
#	url='mongodb://client-e2fe53fe:16cc6bc3-217c-eaa9-4e17-ed78983f26cb@production-db-b1.meteor.io:27017/mymoviebox _meteor_com'
	client=`echo $url|sed 's/.*\/\/\(client.*\)\:.*:.*/\1/g'`
	password=`echo $url|sed 's/.*\/\/client.*\:\(.*\)@.*/\1/g'`
	hostname=`echo $url|sed 's/.*@\(.*\)\/.*/\1/g'`
	echo "------------------------------"
	echo
}
getCredentials

# eval `ls $repin/*.json | awk '{print "mongoimport -h '$hostname' -u '$client' -p '$password' --db mymoviebox_meteor_com --collection movies --file "$0" ;"}'`
for file in `ls $repin/*.json`; do
	test $i -gt 10 && getCredentials && i=0
#	echo 'mongoimport -h '$hostname' -u '$client' -p '$password' --db mymoviebox_meteor_com --collection movies --file' $file
	mongoimport -h $hostname -u $client -p $password --db mymoviebox_meteor_com --collection movies --file $file
	((i=i+1))
done
