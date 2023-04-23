const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const morgan = require('morgan');

// Mongoose
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('Database connected');
});

// Middleware
const app = express();
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true})) // Used to parse the req.body

let requestTime = function (req, res, next) {
    let date = Date.now();
    let dateFormatted = new Date(date).toString().slice(4, 24);
    req.requestTime = dateFormatted;
	console.log("Method:", req.method.toUpperCase(), "Path:", req.path, "Time:", req.requestTime);
	next();
}

app.use(requestTime);

// Password verification test function
const verifyPassword = (req, res, next) => {
    const { password } = req.query;        
    if(password === 'chickennugget') {    // query string needs to be this
        next();
    }
    res.send('Sorry you need a password!')
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routing - home page
app.get('/', (req, res) => {
    console.log(`request time: ${req.requestTime}`)
    res.render('home');
})

// Secret password test
app.get('/secret', verifyPassword, (req, res) => {
	res.send(`MY SECRET IS: Sometimes I wear headphones in public so I
	don't have to talk to people`)
})

// Index of all campgrounds
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
})

// NEW form for new campgrounds
app.get('/campgrounds/new', async (req, res) => {
    res.render('campgrounds/new');
})

// CREATE creating new campgrounds
app.post('/campgrounds', async(req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})

// SHOW route for specific campground
app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
})

// EDIT route
app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
})

// UPDATE route
app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground})
    res.redirect(`/campgrounds/${campground._id}`)
})

// DESTROY route
app.delete('/campgrounds/:id', async(req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})

// 404 error route
app.use((req, res) => {
    res.render('errorPage')
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})