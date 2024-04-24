const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const indexRouter = require('./routers/indexRouter');
const port = process.env.PORT
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(indexRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(process.env.ONGKIR_KEY);
})