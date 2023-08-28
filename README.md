<div align="center">
  <h1>YelpCamp :closed_book:</h1>
  <strong>By Jamie Barlow</strong>
</div>

## Purpose / Background :bulb:

- This is a web application allowing the user to create and review campgrounds, similar to a review site like Yelp.
- The project forms a major part of Colt Steele's [Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/) on Udemy. It features full CRUD (Create, Read, Update, Destroy) functionality, and is built using the MERN (MongoDB/Express/Node) stack, with RESTful architecture (exposing CRUD functionality to users with a uniform interface). The app is styled using CSS and BootStrap components.
- YelpCamp has proved to be a fantastic first-hand learning exercise, working with the many fundamental considerations that go into fully building and launching a live full-stack application. This includes building on core CRUD functionality with a number of extra technologies to enhance features like form validation, user authentication and authorization, and other means of dealing with common security issues, along with additional UI features such as geocoded cluster maps.
- Experience with this app has inspired, and will form the foundation for, building future full-stack applications.

## Features :heavy_check_mark:

- CRUD (create, read, update, delete) functionality for campgrounds and reviews
- Server-side routing handled in Express
- Client-side form validations using BootStrap, server-side validation with Express (incl. custom error-handling middleware) and JOI
- Data persistence and relationships managed with MongoDB and Mongoose
- User registration and login functions, customised with session/cookie data
- User authentication and authorization/access permissions, with Passport.js
- Flash messaging feedback for successful user interactions and errors
- Image uploading functionality, using Multer middleware to parse multipart/form-data (used for submitting files), and hosting by Cloudinary API

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
- Git Version Control

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
