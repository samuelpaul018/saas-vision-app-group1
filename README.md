# Google App Engine SaaS Exercise - Google Cloud Vision API

This project is a complete starter solution for the Exercise-SaaS assignment. It provides:

- a browser HTML form that uploads an image
- a Node.js + Express server that receives the image
- a server-side call to Google Cloud Vision Label Detection
- a formatted HTML response showing detected labels
- Google App Engine deployment configuration
- wiki content templates for the required deliverables

## Team members

Replace this section with your full assigned team member names before submission.

- Member 1
- Member 2
- Member 3
- Member 4

## Project structure

```text
saas-vision-app/
  app.yaml
  package.json
  server.js
  public/
    styles.css
  views/
    index.ejs
    result.ejs
    error.ejs
  wiki/
    app.md
    demonstration.md
    explanation.md
    state-of-system.md
```

## Prerequisites

- Google Cloud project with billing enabled
- Google App Engine application created
- Vision API enabled
- Node.js 20+
- Google Cloud CLI installed and authenticated

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Authenticate for local testing using application default credentials:
   ```bash
   gcloud auth application-default login
   ```
3. Start the local server:
   ```bash
   npm start
   ```
4. Open the local app in your browser:
   ```text
   http://localhost:8080
   ```

## Enable required Google Cloud services

```bash
gcloud services enable vision.googleapis.com appengine.googleapis.com
```

## Create App Engine app (first time only)

```bash
gcloud app create --region=us-central
```

Choose a region that matches your class requirements if your instructor specified one.

## Deploy to Google App Engine

```bash
gcloud app deploy
```

After deployment, open the app:

```bash
gcloud app browse
```

## Notes about credentials

When deployed to Google App Engine, the application usually uses the default service account automatically. Make sure the service account has permission to access the Vision API.

For local development, `gcloud auth application-default login` is usually the easiest approach.

## What to customize before submission

- replace all placeholder team member names
- push the code to a shared GitHub repository
- create the GitHub wiki pages using the markdown files in `/wiki`
- add screenshots of your running app and results
- add the deployed App Engine URL to the wiki and repo

## Common troubleshooting

### "The Application Default Credentials are not available"
Run:
```bash
gcloud auth application-default login
```

### "API has not been used" or permission errors
Enable Vision API and verify the correct Google Cloud project is selected:
```bash
gcloud config set project YOUR_PROJECT_ID
```

### Upload fails
Check file type, file size, and App Engine logs:
```bash
gcloud app logs tail -s default
```
