require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

const methodOverride = require('method-override');

const expressError = require('./utils/expressError.js')


async function main(){
    await mongoose.connect(process.env.ATLASDB_URL);
}
main().then(()=>{
    console.log("database connected DB");
}).catch((err)=>{
    console.log(err);
});


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
    extended: true,
    }),
);

const port = process.env.PORT;
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'/public')));
app.set(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine('ejs',ejsMate);

const listingsRouter = require('./routes/listing.js');
const reviewsRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');

const store = MongoStore.create({
    mongoUrl: process.env.ATLASDB_URL,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 18 * 60 * 60,
});


const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() * 18 * 60 * 60 * 1000,
        maxAge: 18 * 60 * 60 * 1000,
        httpOnly: true,
    },
}

store.on('error', (err)=>{
    console.log('ERROR in MONGO-SESSION STORE => ',err);
});

app.get('/',(req,res)=>{
    res.redirect('/listings');
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.deletee = req.flash('deletee');
    res.locals.update = req.flash('update');
    res.locals.errorr = req.flash('errorr');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    res.locals.isReviewAuthor = true;
    next();
});


//users
app.use('/', userRouter);

//listings
app.use('/listings', listingsRouter);

//reviews
app.use('/listings/:id/reviews', reviewsRouter);



app.all('*', (req,res,next)=>{
    next(new expressError(404, 'page not found!'));
});

app.use((err,req,res,next)=>{
    let {statusCode=500, message="something went wrong!"} = err;
    // res.status(statusCode).send(message);

    res.status(statusCode).render('error.ejs', {err});
});

app.listen(port, ()=>{
    console.log(`Listening on http://localhost:${port}`);
});