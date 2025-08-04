synth:
	if [ -z "${STACK}" ]; then \
		npx cdk synth --all; \
	else \
		npx cdk synth ${STACK}; \
	fi
diff:
	npx cdk diff
deploy: 
	npx cdk deploy --all --require-approval never
destroy:
	npx cdk destroy --all --force