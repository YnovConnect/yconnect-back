export default {
    mongoUri: process.env.MONGO_URI || 'mongodb://yconnect:yconnectAdminMdp@squirrel.kilian-marmilliot.com:27017/yconnect?authSource=admin',
    bcryptSalt: 10,
    origin: process.env.ORIGIN,
    secretToken: "yconnectSecretToken",
};
