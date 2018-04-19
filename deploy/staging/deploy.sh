echo $STAGING_SETTINGS > settings.json
echo $DEPLOYMENT_TOKEN > deployment_token.json
METEOR_SESSION_FILE=deployment_token.json meteor deploy staging-chat.sapien.network --settings settings.json
