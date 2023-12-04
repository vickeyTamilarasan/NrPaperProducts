let express = require('express');
let bodyparser = require('body-parser');
let cors = require('cors');
let mongoose = require('mongoose');
let multer = require('multer');
let path = require('path');
let fs = require('fs');


let app = express()


app.use(cors());

app.use(bodyparser.urlencoded({ extended: true }))

app.use(express.json())

mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://admin:admin@cluster0.nbueqfo.mongodb.net/PaperProducts?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let regSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobileNo: String,
    dateofbirth: String,
    address: String
})

let ProductUser = mongoose.model('ProductUser', regSchema)

app.get('/', async (req, res) => {
    // res.send('Hello world')
    let a = await ProductUser.find()
    res.json(a)
})

// Login Process

let c;
app.get('/login', async (req, res) => {
    c = await ProductUser.find()
    res.json(c)
})

app.post('/login', async (req, res) => {
    try {
        c = await ProductUser.findOne({ name: req.body.name, password: req.body.password })
        if (c.name === req.body.name && c.password === req.body.password) {
            res.status(200).json(c);
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch {
        res.status(401).json({ message: 'Invalid username or password' });
    }


})

app.get('/login/:id', async (req, res) => {
    let { id } = req.params;
    let b = await ProductUser.findById(id);
    res.json(b)
})

// Register Process

app.get("/register", async (req, res) => {
    // res.send("Hello World")
    let b = await ProductUser.find()
    res.json(b)
    // res.render('register')
})

app.post('/register', async (req, res) => {
    try {
        let d = await ProductUser.findOne({ name: req.body.name });
        if (d.name === req.body.name) {
            res.status(401).json({ message: 'Data Already exits' });
        } else {
            b = await ProductUser({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                mobileNo: req.body.mobileNo,
                dateofbirth: req.body.dateofbirth,
                address: req.body.address
            })
            b.save();
            res.json(b);
        }
    } catch {
        b = await ProductUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            mobileNo: req.body.mobileNo,
            dateofbirth: req.body.dateofbirth,
            address: req.body.address
        })
        b.save();
        res.json(b);
    }

    // console.log("Data Registered");
    // res.redirect('/contact')
})

app.get('/register/:id', async (req, res) => {
    let { id } = req.params;
    let b = await ProductUser.findById(id);
    res.json(b)
})

app.put('/register/:id', async (req, res) => {
    let { id } = req.params;
    let b = await ProductUser.findById(id);
    b.name = req.body.name;
    b.email = req.body.email;
    b.password = req.body.password;
    b.mobileNo = req.body.mobileNo;
    b.dateofbirth = req.body.dateofbirth;
    b.address = req.body.address;
    b.save();
    res.json(b)

})
app.delete('/register/:id', async (req, res) => {
    let { id } = req.params;
    let b = await ProductUser.findByIdAndDelete(id)
    res.json('data deleted')
})

// Storage Setting 

let fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
        // cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

// Upload Setting

let upload = multer({ storage: fileStorage })

// let upload = multer({
//     storage: fileStorage,
//     limits : {
//         fileSize : 1000000
//     },
//     fileFilter: (req, file, cb) => {
//         if (!file.originalname.match(/\.(png|jpg) $/)) {
//             return cb(new Error('Please Upload an Image File!'));
//         }
//         else {
//             cb(undefined, true);
//         }
//     }
// });

// var upload = multer({ dest: 'items/' });
// Add Item

let itemSchema = mongoose.Schema({
    name: String,
    gsm: String,
    image: {
        data: Buffer,
        contentType: String
    },
    price: String,
    quantity: String
})

let ProductItem = mongoose.model('ProductItem', itemSchema)

app.get("/items", async (req, res) => {
    let b = await ProductItem.find()
    res.json(b)
})

app.post('/items', upload.single('itemImage'), async (req, res) => {

    // const itemImage = req.file.filename;
    try {
        let d = await ProductItem.findOne({ name: req.body.name });
        if (d.name === req.body.name) {
            res.status(401).json({ message: 'Data Already exits' });
        } else {
            upload(req, res, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    let i = ProductItem({
                        name: req.body.name,
                        gsm: req.body.gsm,
                        image: {
                            data: fs.readFileSync("images/" + req.file.filename),
                            contentType: 'image/jpg'
                        },
                        price: req.body.price,
                        quantity: req.body.quantity
                    })
                    i.save();
                    res.json(i);
                }
            })

        }
    } catch {
        upload(req, res, (err) => {
            if (err) {
                console.log(err);
            } else {
                let i = ProductItem({
                    name: req.body.name,
                    gsm: req.body.gsm,
                    image: {
                        data: fs.readFileSync("images/" + req.file.filename),
                        contentType: 'image/jpg'
                    },
                    price: req.body.price,
                    quantity: req.body.quantity
                })
                i.save();
                res.json(i);
            }
        })
    }

})

app.get('/items/:id', async (req, res) => {
    let { id } = req.params;
    let b = await ProductItem.findById(id);
    res.json(b)
})

app.put('/items/:id',upload.single('itemImage'), async (req, res) => {
    let { id } = req.params;
    let b = await ProductItem.findById(id);
    b.name = req.body.name;
    b.gsm = req.body.gsm;
    b.image = {
        data: fs.readFileSync("images/" + req.file.filename),
        contentType: 'image/jpg'
    };
    b.price = req.body.price;
    b.quantity = req.body.quantity;
    b.save();
    res.json(b)
})

app.delete('/items/:id', async (req, res) => {
    let { id } = req.params;
    let b = await ProductItem.findByIdAndDelete(id)
    res.json('data deleted')
})

// Cart Item

let CartitemSchema = mongoose.Schema({
    name: String,
    gsm: String,
    image: String,
    price: String,
    qtycart: String
})

let CartItem = mongoose.model('CartItem', CartitemSchema)

app.get("/cart", async (req, res) => {
    let b = await CartItem.find()
    res.json(b)
})

app.post('/cart', async (req, res) => {
    let i = await CartItem({
        name: req.body.name,
        gsm: req.body.gsm,
        image: req.body.image,
        price: req.body.price,
        qtycart: req.body.qtycart
    })
    i.save();
    res.json(i);
    // try {
    //     let d = await CartItem.findOne({ name: req.body.name });
    //     if (d.name === req.body.name) {
    //         res.status(401).json({ message: 'Data Already exits' });
    //     } else {
    //         let i = await CartItem({
    //             name: req.body.name,
    //             gsm: req.body.gsm,
    //             image: req.body.image,
    //             price: req.body.price,
    //             qtycart: req.body.qtycart
    //         })
    //         i.save();
    //         res.json(i);
    //     }
    // } catch {
    //     let i = await CartItem({
    //         name: req.body.name,
    //         gsm: req.body.gsm,
    //         image: req.body.image,
    //         price: req.body.price,
    //         qtycart: req.body.qtycart
    //     })
    //     i.save();
    //     res.json(i);
    // }

})

app.get('/cart/:id', async (req, res) => {
    let { id } = req.params;
    let b = await CartItem.findById(id);
    res.json(b)
})

app.put('/cart/:id', async (req, res) => {
    let { id } = req.params;
    let b = await CartItem.findById(id);
    b.name = req.body.name;
    b.gsm = req.body.gsm;
    b.image = req.body.image;
    b.price = req.body.price;
    b.qtycart = req.body.qtycart;
    b.save();
    res.json(b)
})
app.delete('/cart/:id', async (req, res) => {
    let { id } = req.params;
    let b = await CartItem.findByIdAndDelete(id)
    res.json('data deleted')
})

app.delete('/cart', async (req, res) => {
    await CartItem.deleteMany()
    res.json({ message: 'Order placed sucessfully' })
})

app.listen(2000, console.log('Servier Running'))