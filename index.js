require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())

console.log(process.env.DB_User)
console.log(process.env.DB_Pass)


const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.cqf2amb.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const servicesCollection = client.db('CAR-SERVICE').collection('Services');
        const bookingsCollection = cliend.db('CAR-SERVICE').collection('bookings')

        //get api for all data
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        //get api for a single data
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = {
                // Include only the `title` and `imdb` fields in the returned document
                projection: { title: 1, title: 1, price: 1 },
            };
            const result = await servicesCollection.findOne(query, options);
            res.send(result);
        })




        //insert a document
        app.post('bookings', async (req, res) => {
            const newBooking = req.body;
            console.log(newBooking);
            const result = await bookingsCollection.insertOne(newBooking);
            res.send(result);
        })






        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Car Service Server is running')
})

app.listen(port, () => {
    console.log(`Server is Running on Port: ${port}`)
})
