const express = require('express');
const cors = require('cors');
 
require('dotenv').config();
const port = process.env.PORT || 5000;
 
const app = express();
 
// middleware
app.use(cors());
app.use(express.json());
 
// bookHouseDBUser
// 0qc4q2mDekRPhMsD



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ygvslal.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

async function run(){
    try {
        
    } finally {
        
    }
}
run().catch(console.log);



 
 
app.get('/', async (req, res) => {
    res.send('Book House server is running');
})
 
app.listen(port, () => console.log(`Book House running on ${port}`))