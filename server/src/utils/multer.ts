import multer from "multer";
const fs = require("fs")




export const imageStorage = multer.diskStorage({
    destination: function (req:any, _:any, callback:any) {
      const topdir = "./uploads";
      var dir = `./uploads/${req.ui}`;
      try {
        if (!fs.existsSync(topdir)) {
          fs.mkdirSync(topdir);
        }
      } catch (err) {
        console.error(err);
      }
      try {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
      } catch (err) {
      }
  
      callback(null, dir);
    },
    filename: function (_:any, file:any, callback:any) {
      let name = file.originalname +  Date.now() + "." + "jpg"
      if (file.mimetype === "image/jpeg") {
        name = file.originalname +  Date.now() + "." + "jpg";
      } else if (file.mimetype === "image/png") {
        name = file.originalname +  Date.now() + "." + "png";
      }
      callback(null, name);
    },
  });
  var uploadImage = multer({ dest: "./uploads", storage: imageStorage }).array("photos", 12);
  

  export const AvatarStorage = multer.diskStorage({
    destination: function (_2:any, _:any, callback:any) {
      const topdir = "./avatar";
      var dir = `./avatar`;
      try {
        if (!fs.existsSync(topdir)) {
          fs.mkdirSync(topdir);
        }
      } catch (err) {
        console.error(err);
      }
      try {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
      } catch (err) {
      }
  
      callback(null, dir);
    },
    filename: function (_:any, file:any, callback:any) {
      
      let name = file.originalname + "." + "jpg"
      if (file.mimetype === "image/jpeg") {
        name = file.originalname  + Date.now() + "." + "jpg";
      } else if (file.mimetype === "image/png") {
        name = file.originalname + Date.now() + "." + "png";
      }
      
      callback(null, name);
    },
  });
  
  

  export const uploadAvatar = multer({ dest: "./avatar", storage: AvatarStorage }).single('avatar');

  export const uploadImageMiddleware = (req:any, res:any, next:any) => {
      req.ui = Date.now();
      uploadImage(req, res, function (err:any) {
        if (err) {
          return res.end("Something went wrong!");
        }
        next();
      });
  } 