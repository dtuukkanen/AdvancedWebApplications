import multer, { StorageEngine, Multer } from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, "../../../public/images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    const fileName: string = path.parse(file.originalname).name;
    const uuid: string = uuidv4();
    const ext: string = path.parse(file.originalname).ext;
    cb(null, `${fileName}_${uuid}${ext}`);
  },
});

const upload: Multer = multer({ storage });

export default upload;
