<!-- This is commented out. -->

# Posts and Comments

This project is for ticketing system.

# Pre-requisites

1. Install docker, NodeJS and visual code
2. Make sure enabled and download Kubernetes in docker.
3. Make sure Scaffold is downloaded.
4. Make sure Environment Variables and Kubernetes Secret created.

# Set up environment variables and kubernetes secret (Not necessary)

1. Set up Docker environment variables
   Run "docker run -e REPOSITORY_NAME=<myrepository> <myimage>"
2. Set up Kubernetes secret
   Run "kubectl create secret generic <mysecret> \
    --from-literal=REPOSITORY_NAME=<myrepository> \"
3. List Docker environment variables
   Run "docker ps". Copy the container_name_or_id.
   Run "docker exec container_name_or_id env"
4. List Kubernetes secret
   Run "kubectl get secrets"

## Usage

### Running the Project:

<!-- Make sure "127.1.1.1 posts.com" is added in hosts file, in local environment. -->

1. Make sure "scaffold dev" is executed in the root folder, by CMD prompt.
2. Make sure "kubectl port-forward --namespace=ingress-nginx service/ingress-nginx-controller 8080:80" is run in local, by WSL.
3. Browse the url "http://ticketing.dev:8080".
