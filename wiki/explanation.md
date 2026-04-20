# explanation

## Overview

This project implements a Software as a Service example using Google Cloud Vision API. The user interacts with a simple HTML form in the browser. The browser sends the selected image to a Node.js + Express server using a multipart form upload. The server temporarily stores the uploaded image in memory using Multer, then sends the raw image bytes to Google Cloud Vision's Label Detection service using the official Node.js client library.

The Vision API returns a set of label annotations for the image. The server extracts useful fields such as label description, confidence score, and topicality, then renders those results into an HTML response using the EJS template engine.

## Main files

### `server.js`
- Creates the Express web server
- Configures Multer for image uploads
- Creates the Vision API client
- Defines the route for the home page (`GET /`)
- Defines the route that receives the uploaded image (`POST /analyze`)
- Calls the Vision API and formats the results
- Handles upload and server errors gracefully

### `views/index.ejs`
Contains the browser-side HTML form where the user selects an image file and submits it.

### `views/result.ejs`
Displays the labels returned by Google Cloud Vision in a formatted table.

### `views/error.ejs`
Displays an error message if the upload fails or the Vision call throws an exception.

### `public/styles.css`
Provides the CSS styling for the upload page and result page.

### `app.yaml`
Tells Google App Engine how to run the application. In this project the runtime is Node.js 20.

## Upload flow

1. User opens the root URL in a browser.
2. The app serves `index.ejs` with a form using `enctype="multipart/form-data"`.
3. The user chooses an image and clicks submit.
4. The browser posts the image to `/analyze`.
5. Multer reads the uploaded file into memory.
6. The server passes the image bytes to `visionClient.labelDetection()`.
7. Google Cloud Vision returns detected label annotations.
8. The server renders `result.ejs` with the returned labels.

## Deployment process

1. Create or choose a Google Cloud project.
2. Enable `vision.googleapis.com` and `appengine.googleapis.com`.
3. Create the App Engine application.
4. Authenticate with the Google Cloud CLI.
5. Deploy the application using `gcloud app deploy`.
6. Test the live URL and verify the results.

## Why the client library was used

The official Node.js client library simplifies authentication, request formatting, and error handling. It is easier and cleaner than manually calling the REST API.
