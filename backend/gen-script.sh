#!/bin/bash

if [ $# -eq 0 ]; then
  echo "Error: Please specify a file name as the first argument"
  exit 1
fi

touch "./script/src/`date +"%Y%m%d%H%M%S"_${1}`.ts"
