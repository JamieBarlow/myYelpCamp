if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const Review = require('./models/review');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');
const AppError = require('./AppError');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');
const User = require('./models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');

// Joi validation schemas:
const { campgroundSchema, reviewSchema } = require('./schemas');

// Routing
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');

// Mongoose
mongoose.set('strictQuery', false);
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
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })) // Used to parse the req.body
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize());

const sessionOptions = { 
    name: 'YCSession',
    secret: 'thisisnotagoodsecret',
    resave: false, 
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + (1000 * 60 * 60 * 24 * 7),
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());
app.use((req, res, next) => {
    console.log(req.query);
    // console.log('Req.session:')
    // console.log(req.session);
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);
app.use('/', userRoutes);

// For logging middleware
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
    if (password === 'chickennugget') {    // query string needs to be this
        next();
    }
    return next(new AppError('Password required', 401));
}

// Routing
app.get('/fakeUser', async (req, res) => {
    const user = new User({email: 'colttt@gmail.com', username: 'colttt'});
    const newUser = await User.register(user, 'fakePassword');
    res.send(newUser);
})

app.get('/', (req, res) => {
    console.log(`request time: ${req.requestTime}`)
    res.render('home');
})

// Secret password test
app.get('/secret', verifyPassword, (req, res) => {
    res.send(`MY SECRET IS: Sometimes I wear headphones in public so I
	don't have to talk to people`)
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

// Generic error handling
const genericError = (err, req, res, next) => {
    const { status = 500 } = err;
    if(!err.message) err.message = 'Something went wrong';
    console.log(err.status)
    res.status(status).render('errorPage', { err });
}

const handleValidationErr = err => {
    console.log(`${err._message}. Cannot add campground - reason: ${err.errors.title.properties.message}`)
    return new AppError(`Validation failed...${err.message}`, 400)
}

// Error handling middleware
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') err = handleValidationErr(err);
    console.log(err.name);
    next(err);
})
app.use(verifyPassword);
app.use(genericError);

app.listen(3000, () => {
    console.log('Serving on port 3000')
})