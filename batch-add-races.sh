#!/bin/bash
# declare an array called array and define 3 vales

array=( '{"name":"Colorado Trail Race","year":2019}' '{"name":"Colorado Trail Race","year":2017}' '{"name":"Colorado Trail Race","year":2016}' '{"name":"Colorado Trail Race","year":2015}' '{"name":"Colorado Trail Race","year":2014}' '{"name":"Colorado Trail Race","year":2013}' '{"name":"Colorado Trail Race","year":2012}' '{"name":"Colorado Trail Race","year":2011}' '{"name":"Colorado Trail Race","year":2010}' '{"name":"Colorado Trail Race","year":2009}' )
for i in "${array[@]}"
do
  echo $i
  curl --request POST \
    --url http://localhost:3000/api/create-race \
    --header 'content-type: application/json' \
    --data "$i"
done

