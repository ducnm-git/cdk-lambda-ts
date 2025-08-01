synth:
	npx cdk synth
diff:
	npx cdk diff
build-failed-with-parameters:
	npx cdk synth --parameters Duration=999
deploy: 
	npx cdk deploy --all --require-approval never
deploy-failed-with-parameters:
	npx cdk deploy --all --require-approval never --parameters Duration=999
destroy:
	npx cdk destroy --all --force