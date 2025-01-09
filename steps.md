1. Initialize repo folder
2. npm init (create pakage.json)
3. create src, src/app.js
4. node src/app.js (with console.log(""))
5. npm install express
6. create express server
7. listen to the port (7777)
8. create request handler
9. If any update will do in server, it won't be reflected in client side need to close and re-run
10. npm install nodemon (will update server automatically) - (https://www.npmjs.com/package/nodemon)
npm install -g nodemon
11. update command in package.json (under script)
12. diff b/w caret and tilde (^ vs ~)

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
