const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.set('strictQuery', false);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

async function getUnsplashImg() {
    const clientID = 'ABhnQtYm5-yuKn5fSfByt85dJgpFmSinNcNQdKE1Dds';
    const collection = 483251;
    const endpoint = `https://api.unsplash.com/photos/random/?client_id=${clientID}&collections=${collection}`;
    return await fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the JSON data here
            let imgObject = {};
            imgObject.url = data.urls.regular;
            imgObject.creator = data.user.name;
            imgObject.username = data.user.username;
            return imgObject;
        })
        .catch(error => {
            // Handle any errors here
            console.error('There was a problem with the image fetch operation:', error);
        });
}

// For removing all existing items / testing
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 40; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const image = await getUnsplashImg();
        const camp = new Campground({
            author: '64a02632652e51b6a4acfc9d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dakgl7s9n/image/upload/v1688740334/YelpCamp/ebn0fzl8mlnicxc5nxke.jpg',
                    filename: 'YelpCamp/ebn0fzl8mlnicxc5nxke'
                },
                {
                    url: 'https://res.cloudinary.com/dakgl7s9n/image/upload/v1688740334/YelpCamp/zcysoiumb6lspcadozzn.jpg',
                    filename: 'YelpCamp/zcysoiumb6lspcadozzn'
                }
            ],
            creator: image.creator,
            username: image.username,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close()
});