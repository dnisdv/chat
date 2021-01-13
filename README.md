# Chat app
<img src="https://i.imgur.com/qOEbjnI.png" alt="project image" />


### Frontend stack:

* ReactJS
* Typescript
* Redux
* React Router
* Axios
* date-fns
* Formik

### Backend stack:

- NodeJS
- TypeScript
- Express
- Mongoose
- Multer
- Socket.io
- JWT


### Requirements:
* Node.js installed
* MongoDB connection


### Usage:
1. Clone repo on your local machine:
```
$ git clone https://github.com/dnisdv/chat
$ cd chat
```
2. Install run dependencies:
```
$ npm i
```
3. Install server & client dependencies:
```
$ npm run client-install
$ npm run server-install
```
4. Create a `.env` file in ```server``` folder and insert the following code. Replace values with yours!!
```
  NODE_ENV=development
  PORT=3003

  JWT_SECRET=UpFJjpWKYteH5rMHSxst
  JWT_MAX_AGE=7d
```
5.Run it:
```
$ npm start
```
