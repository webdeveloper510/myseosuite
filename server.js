const http = require('http');
const mongoConnect = require('./app/database/connection').mongoConnection;
const app = require('./app/app');
const appConfig = require('./app/config/appConfig');
const port = appConfig.APP_PORT;
const server = http.createServer(app);

(async() => {
    try{
        await mongoConnect(appConfig.MONGO_URL);
       console.log(`Connected to Database`);
        server.listen(port, () => {
            console.log(`Listening to ${port}`)
        });
    }catch(err){
        console.log(`Connection Failed`);
    }
})();