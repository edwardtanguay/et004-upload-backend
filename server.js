import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low, JSONFile } from 'lowdb';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = join(__dirname, '/data/db.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

const app = express();
const port = 5889;

// db.data.fileItems.push({
// 	title: 'added',
// 	description: '333',
// 	notes: '222',
// 	fileName: 'added.jpg'
// });
// await db.write();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploadedFiles/');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});

const upload = multer({ storage: storage });

app.use(cors());

app.get('/fileitems', async (req, res) => {
	await db.read();
	res.send(db.data.fileItems);
});

app.post('/uploadfile', upload.single('file'), function (req, res) {
	res.json({});
});

app.listen(port, () => {
	console.log(`listening at http://localhost:${port}`);
});
