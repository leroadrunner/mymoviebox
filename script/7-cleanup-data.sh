repdata=../data
repbkp=$repdata/backup
repimdbID=$repdata/imdbID
repjson=$repdata/json-raw
repimg=$repdata/processed-image
repall=$repdata/processed-all
mmbRDate=`./jq '.mmbRecordDate' $repall/* |sort |uniq|sed s/\"//g`
repbatch=$repbkp/batch-$mmbRDate

echo ; echo "---------------------------------" ; echo $0 ; echo

set -x
rm $repimdbID/*
rm $repjson/*
rm $repimg/*
mkdir $repbatch
mv $repall/* $repbatch
