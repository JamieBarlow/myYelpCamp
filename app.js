const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');
const AppError = require('./AppError');

// Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
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
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));

// For logging middleware
let requestTime = function (req, res, next) {
    let date = Date.now();
    let dateFormatted = new Date(date).toString().slice(4, 24);
    req.requestTime = dateFormatted;
	console.log("Method:", req.method.toUpperCase(), "Path:", req.path, "Time:", req.requestTime);
	next();
}

app.use(requestTime);

// Wrapper function for async route handlers
function wrapAsync(fn){
	return function(req, res, next) {
		fn(req, res, next).catch(e => next(e))
	}
}

// Password verification test function
const verifyPassword = (req, res, next) => {
    const { password } = req.query;        
    if(password === 'chickennugget') {    // query string needs to be this
        next();
    }
    return next(new AppError('Password required', 401));
}

// Generic error handling
const genericError = (err, req, res, next) => {
	const { status = 500, message = 'Something went wrong' } = err;
    console.log(err.status)    
	res.status(status).send(message);
}

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
app.get('/campgrounds', wrapAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}))

// NEW form for new campgrounds
app.get('/campgrounds/new', wrapAsync(async (req, res) => {
    res.render('campgrounds/new');
}))

// CREATE creating new campgrounds
app.post('/campgrounds', wrapAsync(async(req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}));

// SHOW route for specific campground
app.get('/campgrounds/:id', wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
        throw new AppError('Campground Not Found', 404);
    }
    res.render('campgrounds/show', { campground });
}));

// EDIT route (show form for editing item)
app.get('/campgrounds/:id/edit', wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
}));

// UPDATE route
app.put('/campgrounds/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground})
    res.redirect(`/campgrounds/${campground._id}`)
}))

// DESTROY route
app.delete('/campgrounds/:id', wrapAsync(async(req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}))

app.use(verifyPassword);
app.use(genericError);

app.listen(3000, () => {
    console.log('Serving on port 3000')
})