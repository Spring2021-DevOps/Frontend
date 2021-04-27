**UBER REACT App**
- To test locally :
`
    npm update
	`
	`npm install`
	`npm run build`
	`npm start`
- Running on nginx :
    1. Update the app's .conf file in /etc/nginx 
	2. Add it to sites-available
	3. Add a symbolic link to sites-enabled
	4. sudo systemctl restart nginx
	
-  The application can be run on an AWS instance using the terraform script



### Setup Uber frontend on GCP
​
### Pre-requisite
Follow the readme in https://github.com/Spring2021-DevOps/Terraforms/GKE to setup initial resources
​
1. Setup GCP Cloudbuild
i. Go to GCP
ii. Under the CICD services, select the Cloud Build service
iii. Select the project csye7220 that was created as a part of pre-requisite
iv. Select Triggers and create a new trigger
Follow steps to setup the trigger:
a. Give a trigger name
b. Select event as Push to branch
c. From source, select connect to a new repository
d. Select GitHub and authenticate the github source
e. Select the repository which you want to target for build
f. Select the configuration as Cloud build configuration
g. Select the location as repository
h. Select the file as cloudbuild.yaml
i. Create the trigger
​
2. Authenticate your cloudbuild account to access the EKS cluster and create deployments 
Run the following command from CLI
```gcloud projects add-iam-policy-binding $project_name --member=serviceAccount:$account_number@cloudbuild.gserviceaccount.com --role=roles/container.developer```
​
3. Make you Container Registry public
a. Go to  Container Registry
b. Click on settings
c. Change visibility to public
​
4. All set!
a. Run your Cloud Build manually.
b. On successful build, go to GKE and check the workload within your cluster
c. The deployments are picked up from https://github.com/Spring2021-DevOps/Frontend/deployments
​
5. Get you load balancer
a. Go to GKE and select your cluster
b. Click on load balancers and copy the IP address
c. Access the IP on port 3000 to verify that the application is accessible
​
Note: For the frontend to access backend, modify the docker file with the load balancer DNS of backend which will be created on running AWS Code Build

