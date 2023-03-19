import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://ShoesDb:12345@cluster0-shard-00-00.le9zi.mongodb.net:27017,cluster0-shard-00-01.le9zi.mongodb.net:27017,cluster0-shard-00-02.le9zi.mongodb.net:27017/test?ssl=true&replicaSet=atlas-7owskh-shard-0&authSource=admin&retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET || 'someThingsecret',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'AW65S7mcqmKGlPrm6CD1iWEtsItIWg8tEdzIQdDP-Xtf_x7Z1CDIZD-SeSNydEGhwu_d3_mNJc6bWcdi',
  accessKeyId: process.env.accessKeyId || 'accessKeyId',
  secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
};
