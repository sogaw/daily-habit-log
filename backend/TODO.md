- [] rename fire-gql-template to YOUR_PROJECT_ID
- [] gcloud auth login
- [] gcloud config set project YOUR_PROJECT_ID
- [] gcloud services enable iamcredentials.googleapis.com
- [] gcloud services enable cloudbuild.googleapis.com
- [] gcloud services enable artifactregistry.googleapis.com
- [] gcloud services enable run.googleapis.com
- [] gcloud artifacts repositories create backend-repository --location asia-northeast1 --repository-format docker
- [] add "Service Account Token Creator" to `xxx-compute@developer.gserviceaccount.com`