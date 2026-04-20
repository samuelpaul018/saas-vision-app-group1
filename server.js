const express = require('express');
const multer = require('multer');
const path = require('path');
const vision = require('@google-cloud/vision');

const app = express();
const port = process.env.PORT || 8080;
const maxUploadMb = Number(process.env.MAX_UPLOAD_MB || 5);

const visionClient = new vision.ImageAnnotatorClient();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: maxUploadMb * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype || !file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image uploads are allowed.'));
    }
    cb(null, true);
  },
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', {
    appTitle: 'Google Cloud Vision Label Detector',
    maxUploadMb,
    teamMembers: [
      'Add Member 1',
      'Add Member 2',
      'Add Member 3',
      'Add Member 4'
    ],
  });
});

app.post('/analyze', upload.single('pic'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).render('error', {
        message: 'Please choose an image file before submitting the form.',
      });
    }

    const [result] = await visionClient.labelDetection({
      image: {
        content: req.file.buffer,
      },
    });

    const labels = (result.labelAnnotations || []).map((item) => ({
      description: item.description || 'Unknown',
      score: typeof item.score === 'number' ? (item.score * 100).toFixed(2) : 'N/A',
      topicality: typeof item.topicality === 'number' ? (item.topicality * 100).toFixed(2) : 'N/A',
    }));

    res.render('result', {
      fileName: req.file.originalname,
      mimeType: req.file.mimetype,
      labels,
    });
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.error(error);

  if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).render('error', {
      message: `Upload failed: image must be ${maxUploadMb} MB or smaller.`,
    });
  }

  res.status(500).render('error', {
    message: error.message || 'Unexpected server error.',
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
