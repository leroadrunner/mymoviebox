repout=./
i=0
file=mongodump-`date '+%Y%m%d%H%M%S'`

function getCredentials() {
	url=`meteor mongo --url mymoviebox`
#	url='mongodb://client-e2fe53fe:16cc6bc3-217c-eaa9-4e17-ed78983f26cb@production-db-b1.meteor.io:27017/mymoviebox _meteor_com'
	client=`echo $url|sed 's/.*\/\/\(client.*\)\:.*:.*/\1/g'`
	password=`echo $url|sed 's/.*\/\/client.*\:\(.*\)@.*/\1/g'`
	hostname=`echo $url|sed 's/.*@\(.*\)\/.*/\1/g'`
}
getCredentials

mongodump -h $hostname -u $client -p $password --db mymoviebox_meteor_com --collection movies --out $file
mongodump -h $hostname -u $client -p $password --db mymoviebox_meteor_com --collection users --out $file
