- Initialize repo folder
- npm init (create pakage.json)
- create src, src/app.js
- node src/app.js (with console.log(""))
- npm install express
- create express server
- listen to the port (7777)
- create request handler
- If any update will do in server, it won't be reflected in client side need to close and re-run
- npm install nodemon (will update server automatically) - (https://www.npmjs.com/package/nodemon)
- npm install -g nodemon
- update command in package.json (under script)
- diff b/w caret and tilde (^ vs ~)

- intialize git 
- gitignore
- create a remote repo on git
- push all the code to remote origin
- play with routes and route extensions ex. /hello,/hello/2,/xyz
- order of the routes matter a lot
- install postman app and make a workspace/collection > test API call
- write logic to handle GET,POST,PATCH,DELETE API calls and test them on postman
- explore routing and use of ?,+,*,() in the routes
- use of regex in routes /a/, /.*fly$/
- dynamic routes (request body and request params)

- Multiple route handlers - Play with the code
- next()
- next function and errors along with res.send()
- app.use("/route",rH,[rH2,rH3],rH4,rH5);
- what is a middleware? why do we need it?
- How express JS basically handles requests behind the scenes
- diff app.use and app.all
- Write a dummy auth middleware for admin
- write a dummy auth middleware for all except /user.login
- error handling using a app.use("/) - (err,req,res,next)

- Create a free cluster on mongodb official website (Mongo Atlas)
- Install mongoose library - https://mongoosejs.com/docs/guide.html
- Connect ur application to the database "Connection-url"/devTiner
- Call the connectDB function to database before starting application on 7777
- create userSchema & user model
- Create POST /signup API to add data to database
- Push some documents using API calls from postman
- Error handling using try and catch

- JS object vs JSON (diff)
- add the express.json middleware to ur app
- Make your signup API dynamic to receive data from end user
- Make GET call /feed to get all the user
- Make API call to get only one user having same email
- To get single user by email (use - find,use-findbyone)
- Create a delete user API
- Diff b/w PATCH and PUT
- API - update a user
- Update a mongoose model
- What are options in a Model.findOneAndUpdate method,explore more about it.
- API - Update the user with email ID

epi-8
- Explore schemaType from the doc
- add required,unique,lowercase,min,minLength,trim - https://mongoosejs.com/docs/schematypes.html
- Add default
- Create a custom validate function for gender
- Improve the DB schema - PUT all approprite validations on each field in schema.
- add timestamp to the schema.
[
- add options for needed fields - required,unique,lowercase,remaining options... (https://mongoosejs.com/docs/search.html?q=validators,https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate())
- add email,gender,needed fields
  [ to resolve issue - when we create new user then only it will allow to validate data only for paeticular method - where we gave the conditions like get method.]
- add runvalidator option,add custom validator,type : array of string]
- Add API level validation on Patch request & signup post API (allowed fields & skills length limit)
- DATA sanitization - add API validation foe each field.
- install validator (npm i validator - https://www.npmjs.com/package/validator)
- Explore validator library function and use validator func for password,email,photoUrl

EPI-09
- Validat data on signup API
- Install bcrypt package - npm i bcrypt
- Create PasswordHash using bcrypt.hask & save the user is encrypted password - https://www.npmjs.com/package/bcrypt

- create login API - POST /login
- validate data and throw new error If email or password is invalid.

EPI-10
- install cookie-parser - https://expressjs.com/en/resources/middleware/cookie-parser.html
- just send a dummy cookie to user
- create GET /profile API and check if you get the cookies back.
- install jsonnwebtoken (jsw) - [npm jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- in login API , after email and password validation, create a JSW token and send it to user in cookies. - expressjs.com [https://expressjs.com/en/5x/api.html#res.cookie]
- read the cookies inside your profile API and find the logged in user

- userAuth middleware
- add the userAuth middleware in profile API and new sendConnectionRequest API
- set the expiry of JWT token and cookies to 7 days.

- create userSchema method to getJWT()
- Create UserSchema method to comaprepassword(passwordInputByUser)

