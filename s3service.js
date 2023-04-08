const { S3 } = require('aws-sdk');
require('dotenv').config();
const multer = require('multer');
const app = express();
const uuid = require('uuid').v4;



//multer uses form data for request not  JSON

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "destination");
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${uuid()}-${originalname}`)
//     },
// });

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    if(file.mimetype.split("/")[0] === 'image'){
        cb(null, true);
    }else {
        cb(new Error("File is not the correct format", false));
    }
}

const upload = multer({storage, fileFilter});

exports.s3Uploadv2 =async (file) => {
    const s3 = new S3()

    const param = {
        Bucket: process.env.AWS_BUCKET.NAME,
        Key: `uploads/${uuid()}-${file.originalname}`, 
        Body: file.buffer
    }
   const result = await s3.upload(param).promise();
   return result;
}


app.post("/upload", upload.single("file"),  async (req, res) => {
    const result = await this.s3Uploadv2();
    res.json({ status: "success", result });
})

