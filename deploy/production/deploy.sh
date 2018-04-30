echo $PROD_SETTINGS > settings.json
echo $DEPLOYMENT_TOKEN > deployment_token.json
METEOR_SESSION_FILE=deployment_token.json meteor deploy chat.sapien.network --settings settings.json
