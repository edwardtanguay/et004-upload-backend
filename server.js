import express from 'express';
import cors from 'cors';
import multer from 'multer';

const app = express();
const port = 5889;

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images/')
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
});

const upload = multer({ storage: storage });

app.use(cors());

app.post('/image', upload.single('file'), function (req, res) {
	res.json({});
});

app.listen(port, () => {
	console.log(`listening at http://localhost:${port}`);
});