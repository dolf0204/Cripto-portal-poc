#!/bin/bash
modeArg=$1

if [ -z "$modeArg" ]; then
    echo "No build mode supplied, build PRODUCTION"
    modeArg="production"
fi

# load env file in env
export $(egrep -v '^#' .env.$modeArg | xargs)


appName="$(tr [A-Z] [a-z] <<< "$VUE_APP_NAME")"
appName="$(tr ' ' '-' <<< "$appName")"

yarn build --mode $modeArg

wait

FILE_NAME="deploy.${appName}.${modeArg}.$(date +"%d.%m.%Y").zip"

cd dist/

zip -r $FILE_NAME .

mv $FILE_NAME ../

echo "created zip ${FILE_NAME}"
