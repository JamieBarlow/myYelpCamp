<div align="center">
  <h1>YelpCamp :closed_book:</h1>
  <strong>By Jamie Barlow</strong>
</div>

## Purpose / Background :bulb:

- This is a web application allowing the user to create and review campgrounds, similar to a review site like Yelp or Tripadvisor.
- The project forms a major part of Colt Steele's [Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/) on Udemy. It features full CRUD (Create, Read, Update, Destroy) functionality, and is built using the MongoDB/Express/Node stack, with RESTful architecture (exposing CRUD functionality to users with a uniform interface). The app is styled using CSS and BootStrap components, and is also soon to be expanded with React components.
- YelpCamp has proved to be a fantastic first-hand learning exercise, working with the many fundamental considerations that go into fully building and launching a live full-stack application. This includes building on core CRUD functionality with a number of extra technologies to enhance features like form validation, user authentication, authorization/permissions, and multiple means of dealing with common security issues, along with additional UI features such as animated review ratings and geocoded cluster maps.
- Experience with this app has inspired, and will form the foundation for, building future full-stack applications.

## Features :heavy_check_mark:

- Register / login functionality, with server-side authentication and specific authorization/permissions for campgrounds linked to a user's id and session/cookie data;
- CRUD (Create, Read, Update/Edit, Destroy) functionality for campgrounds and reviews (for logged in users);
- Flash success/error messages providing user feedback for login, registration, and create/edit/delete actions;
- Client-side form validations using BootStrap, server-side data validation with Express (incl. custom error-handling middleware) and JOI;
- Multiple image uploading functionality, using Multer middleware to parse multipart/form-data (used for submitting files), and hosting on Cloudinary CDN;
- Geo-coded cluster map displaying all campgrounds;

## Technologies :floppy_disk:

- HTML/CSS
- JavaScript
- BootStrap
- EJS
- Express
- MongoDB
- Mongoose
- Node.js
- Passport.js
- Heroku
- Git Version Control

This project has taught me to use a wide range of tech, building on the MongoDB/Express/Node stack with numerous libraries, while also making considered choices about the best tools for each task. For some key examples:

I used [EJS](https://ejs.co/) to create **page templates**, making the layout consistent with a boilerplate and 'partial' layout components such as a navbar, footer and error message pages/popups. This allowed me to increase production efficiency and consistency in the frontend, by taking a modular approach with the app's interface elements. 

EJS also allowed me to embed or **interpolate JavaScript**, enabling dynamically updated content which could be linked to a specific user and their **authorization/permissions** - for example, showing and hiding the option to leave a review depending on the user's login status, and the option to delete a campground or review only if they are the 'author' of that particular campground or review.

**Data** persistence and relationships were managed with [MongoDB](https://www.mongodb.com/). While a 'relational' or SQL-based database would also have worked, MongoDB was chosen because of its frequent pairing and compatibility with both Express and Node.js. This was then ported to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core-high-int_prosp-brand_gic-null_emea-gb_ps-all_desktop_eng_lead&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=19609110867&adgroup=142438572621&cq_cmp=19609110867&gad=1&gclid=Cj0KCQiAo7KqBhDhARIsAKhZ4uhJRH26AYKeZLNmxZdrZH4YIdCgIxVNvgxJpqnABENG_UB93ZEMUssaAnTLEALw_wcB), a cloud-based equivalent, easing the transition from a local project to a web-based app. Using Atlas also allowed me to separate my development environment from my production environment, when seeding and testing features of the database.

I paired MongoDB with [Mongoose](https://mongoosejs.com/), which allowed me to define consistent data schemas/models, useful for robust server-side **validation**. For added security, this functionality was extended with the [joi](https://joi.dev/) library, which allowed me to include further server-side validations in the event of any incoming data that bypasses the app's form submission layer, e.g. those made via external API requests. I also implemented client-side validations using [BootStrap](https://getbootstrap.com/), with 'toast' pop-up notifications to provide user feedback. 

I used [Express](https://expressjs.com/) for server-side routing, due to its wide support and flexibility. In the backend, I employed **RESTful routing patterns**, which helped me to establish a structured interaction between the client-side API and the database, allowing for clearly-defined CRUD (Create, Read, Update, Delete) operations. 

To extend Express, I created my own custom **middleware** for general error handling, handling async processes, and validation. This helped to make my code modular and reusable. I integrated this with a [Model-View-Controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) design pattern, maintaining a clear separation of concerns throughout the app.

The course taught me some very useful fundamentals in terms of **authenticating** a user from scratch, but to simplify the process I used [Passport.js](https://www.passportjs.org/) middleware for Node.js, which provides pre-defined 'strategies' for authenticating usernames/passwords in Express/Node.js. This was extended with [passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose), which adds useful methods to the Mongoose data model, while allowing sensitive user data to be stored in secure, encrypted (salted and hashed) form. The end result is a robust and secure registration and login process.

To support handling **session/cookie data**, I added further middleware from libraries such as [express-session](https://www.npmjs.com/package/express-session) and [connect-flash](https://www.npmjs.com/package/connect-flash), which allowed me to **authorize** users within their login session, and use basic cookie data to provide customised flash messages.

The app includes **image uploading** functionality for multiple images, for which I used [Multer](https://www.npmjs.com/package/multer) middleware to parse the multipart/form-data (used for submitting image files). The images are hosted and accessed via the [Cloudinary API](https://cloudinary.com/documentation/image_upload_api_reference) using [multer-storage-cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary), rather than directly in the database, which would have limited their file size.

I used [Mapbox's geocoding API](https://docs.mapbox.com/api/search/geocoding/) to produce **GeoJSON** coordinates, and the [Mapbox GL JS API](https://docs.mapbox.com/mapbox-gl-js/api/) for displaying campgrounds on individual maps, as well as a combined cluster map, to which I added customized styling, popup navigation links, and additional controls.

To improve the app's **security**, I used [express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize) to help sanitize user inputs and thereby prevent database injections. I also extended JOI with [sanitize-html](https://www.npmjs.com/package/sanitize-html) to prevent cross-site scripting, and used [Helmet](https://www.npmjs.com/package/helmet?activeTab=readme) to set HTTP response headers/content security policy.

Finally, the app was launched on the [Heroku](https://dashboard.heroku.com/login) platform, using their CLI to push updates directly from my GitHub repo.

## How to Use :page_with_curl:

- 

## Development Challenges and Lessons :wrench:

- Introducing extra features, such as image uploading functionality, began to 'break' other parts of the application, such as the back-end validation required for creating new campgrounds - this was dependent on a specific data model, which had now been modified to handle file uploads. The isssue was initially difficult to diagnose, as it returned 'undefined' errors rather than standard validation errors. This really highlighted the importance of testing and debugging at every stage of development, as well as clear error handling. I found that taking a modular approach to app-building made it far easier to isolate the issue to specific files/functions, in tandem with Git version control, which allowed me to identify the specific changes triggering the issue
- I learned a lot about the many considerations that go into building a full-stack CRUD application. The project was a really good exercise in breaking an app down into all of its component parts, while seeing how they interrelate. For example, I learned the difference between authentication - registering a user, securely storing their password (with encryption), and confirming their login - and authorization (in addition to requiring a login to access certain content or functions in general, the app also handles specific permissions depending on the user, and applies server-side security measures to restrict this access, as well as hiding content)',
- I learned about data persistence through the browser session and cookies.',
- I learned how to approach app-building in a modular way - through templating pages, and creating middleware that can be re-used throughout the app. This avoids duplicating code, and makes things cleaner, easier to read and maintain - really important even for personal projects! One approach taken was using the MVC (Model-View-Controller) design pattern, which taught me how to practically implement a 'separation of concerns' for different parts of the app.",
- Data models

## Upcoming features :hourglass:

- 

## License :scroll:

- [GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html)
