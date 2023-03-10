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



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ygvslal.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

async function run(){
    try {

        const usersCollection = client.db('bookHouse').collection('users');
        const booksCollection = client.db('bookHouse').collection('allBook');
        const categoryBookCollection = client.db('bookHouse').collection('bookCategorys');
        const userBookCollection = client.db('bookHouse').collection('userbooks');


        // -------------------
        app.get('/category', async (req, res) => {
            const query = {};
            const books = await categoryBookCollection.find(query).toArray();
            res.send(books);
        });

        app.get('/category/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = {_id:ObjectId(id)};
            const category = await categoryBookCollection.find(query).toArray();
            res.send(category);
        });


        // ------------------

        // user Api

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        app.get('/users', async (req, res) => {
            const query = {};
            const users = await usersCollection.find(query).toArray();
            res.send(users);
        });

        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = {_id:ObjectId(id)};
            const user = await usersCollection.find(query).toArray();
            res.send(user);
        });





        app.get('/users/role/:email', async (req, res) => {

            const email = req.params.email;
            const query = { email }
            const user = await usersCollection.findOne(query);
            res.send(user);
        })

        //----------

        app.get('/allSeller', async (req, res) => {
            
            let query = {role:"seller" };

            let seller=usersCollection.find(query) 
            const allSeller=await seller.toArray();           

            // const booking = await booksCollection.find(query);
            res.send(allSeller);
        })

        app.get('/allBuyers', async (req, res) => {
            
            let query = {role:"buyers" };

            let buyers=usersCollection.find(query) 
            const allBuyers=await buyers.toArray();           
            res.send(allBuyers);
        })





        app.delete('/user/:id',async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(filter);
            res.send(result);
        })



        app.put('/user/verified/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    verified:'Yes'
                }
            }
            const result = await usersCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });




          // temporary to update price field on appointment options
        app.get('/addbookre', async (req, res) => {
            const filter = {}
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    report: "no"
                }
            }
            const result = await booksCollection.updateMany(filter, updatedDoc, options);
            res.send(result);
        })





        // 
        // 


        // All Book Api

        app.post('/books', async (req, res) => {
            const book = req.body;
            console.log(book);
            const result = await booksCollection.insertOne(book);
            res.send(result);
        });

        app.delete('/books/:id',async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await booksCollection.deleteOne(filter);
            res.send(result);
        })


        app.put('/book/advertised/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    advertised:'Yes'
                }
            }
            const result = await booksCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });


        app.get('/book/advertised/item', async (req, res) => {
            let query = {
                advertised:"Yes",
                salesStatus:"available"
         };

            let books=booksCollection.find(query) 
            const allbook=await books.toArray();           
            res.send(allbook);
        });


        












        app.get('/seller/:id', async (req, res) => {
            const id = req.params.id;
            let query = {sellerId: id };

            let sellerProduct=booksCollection.find(query) 
            const allProduct=await sellerProduct.toArray();           

            // const booking = await booksCollection.find(query);
            res.send(allProduct);
        })

        app.get('/categorybooks/:id', async (req, res) => {
            const id = req.params.id;
            let query = {categoryId: id };

            let categorybook=booksCollection.find(query) 
            const allbook=await categorybook.toArray();           

            // const booking = await booksCollection.find(query);
            res.send(allbook);
        })










        app.get('/ActionandAdventure', async (req, res) => {
            
            let query = {category:"Action and Adventure" };

            let buyers=booksCollection.find(query) 
            const allBuyers=await buyers.toArray();           
            res.send(allBuyers);
        })


        app.put('/allBook/bookmodal/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    salesStatus: 'Booked'
                }
            }
            const result = await booksCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });

        //
        //
        //

        app.post('/userbooks', async (req, res) => {
            const userbook = req.body;
            console.log(userbook);
            const result = await userBookCollection.insertOne(userbook);
            res.send(result);
        });

        app.get('/userbooks/:id', async (req, res) => {
            const id = req.params.id;
            let query = {
                userId: id
             };

            let userbook=userBookCollection.find(query) 
            const alluserbook=await userbook.toArray();           
            res.send(alluserbook);
        })

        app.get('/userbooksemail/:email', async (req, res) => {
            const email = req.params.email;
            let query = {
                userEmail: email
             };

            let userbook=userBookCollection.find(query) 
            const alluserbook=await userbook.toArray();           
            res.send(alluserbook);
        })





        
    } finally {
        
    }
}
run().catch(console.log);



 
 
app.get('/', async (req, res) => {
    res.send('Book House server is running');
})
 
app.listen(port, () => console.log(`Book House running on ${port}`))