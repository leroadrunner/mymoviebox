volume=/Volumes/wd-1To/
dataDir=../../data/backup/batch-*/*
movieDir=/Volumes/LaCie/multimedia/video/movie/

> testResultExtractListFromUser.sh
> copyResultExtractListFromUser.sh
for f in $(eval `awk '{print "grep -l "$0" '$dataDir' ;"}' imdbIDlistFromUser.txt`); do
  basef=`basename $f`
  file=`echo $basef|awk -F. '{print $1}'`
  echo 'ls -d '$movieDir$file' > /dev/null' >> testResultExtractListFromUser.sh
  echo cp -r $movieDir$file $volume >> copyResultExtractListFromUser.sh
done
