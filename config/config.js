 
 const USER_NAME = encodeURIComponent(process.env.USER_NAME)
 const USER_PASSWORD = encodeURIComponent(process.env.USER_PASSWORD);
 const DB = "node_shop";

 
 module.exports = {
   MONGODB_URI: `mongodb://${USER_NAME}:${USER_PASSWORD}@ds153422.mlab.com:53422/${DB}`,
   SECRET: process.env.SECRET,
   SENDGRID_API_KEY: process.env.SENDGRID,   
   FROM_EMAIL: process.env.APP_EMAIL
  }