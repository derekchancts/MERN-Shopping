const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// const itemRoutes = require('./routes/items');


const app = express();
app.use(cors());

dotenv.config();

// EXPRESS BODY PARSER
app.use(express.json());


// Use Routes
app.use('/api/items', require('./routes/items'));
app.use('/api/users', require('./routes/users'));



// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  
  // will load the index.html file unless if we hitting the api routes above or in development
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}



const port = process.env.PORT || 5000;

const dbURI = process.env.DB_CONNECT
mongoose.connect(dbURI, 
  { useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }).then(() => console.log('MongoDB Connected'))
    .then(() => app.listen(port, () => console.log(`server started on port ${port}`)))
    .catch((err) => console.log(err))






