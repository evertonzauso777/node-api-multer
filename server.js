var express = require('express')

const app = express()
const bodyParser = require('body-parser');
const multer = require('multer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8080;
var router = express.Router();


//Multer Configuração
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    }, 
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    },
})

const upload = multer({ storage })

app.use('/enviadas', express.static(__dirname + '/uploads'));
app.use('/api', router);


router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    res.json({ message: 'File uploaded successfully', filename: req.file.filename })
})

app.listen(port);

console.log('conectado a porta' + " " + port);