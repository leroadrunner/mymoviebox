repdata=../data
repin=$repdata/processed-all

eval `ls $repin/*.json | awk '{print "mongoimport -h 127.0.0.1:3001 --db meteor --collection movies --file "$0" ;"}'`
