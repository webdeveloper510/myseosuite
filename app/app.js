const express = require('express');
const morgan = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const pageNotFound = require('./middlewares/pageNotFound');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

const options = {
    definition : {
        openapi : '3.0.0',
        info : {
            title : 'Seo-Suite API',
            version :'1.0.0',
            description : "Seo-Suite API documentation",
            contact : {
                name : 'Code nomad'
            },
            servers : [
                {
                    url : "http://localhost:3500"
                }
            ]
        },
    },
    apis : [`${__dirname}/routes/userRoutes.js`]
};

const swaggerDocs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes defination.
userRoutes(app);
adminRoutes(app);

app.use(pageNotFound);
app.use(errorHandler);

module.exports =  app;