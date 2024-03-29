const express = require('express')
const config = require('config')

const db = require('./db/mongodb')
const app = express()

app.use(express.json({ extended: true }))
app.use('/items', require('./routes/items.routes'))

const PORT = config.get('port') || 5000

app.post('/item', async (req, res) => {
    try {
        const newItem = req.body
        db.getDB().collection('item').insertOne(newItem, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                // res.json({result : result, document : result.ops[0],msg : "Successfully inserted Todo!!!",error : null});
                res.json(result.ops[0]._id);
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Wrong' })
    }
})


app.get('/item', (req, res) => {
    // get all Todo documents within our todo collection. send back to user as json
    db.getDB().collection('item').find({}).toArray((err, documents) => {
        if (err)
            console.log(err);
        else {
            res.json(documents);
        }
    });
});

app.put('/item/:id', (req, res) => {
    // Primary Key of Todo Document we wish to update
    const todoID = req.params.id;
    // Document used to update
    const userInput = req.body;
    // Find Document By ID and Update
    db.getDB().collection('item').findOneAndUpdate({ _id: db.getPrimaryKey(todoID) }, { $set: userInput }, { returnOriginal: false }, (err, result) => {
        // db.getDB().collection('item').findOneAndUpdate({ _id: db.getPrimaryKey(todoID) }, { $set: { todo: userInput.todo } }, { returnOriginal: false }, (err, result) => {
        if (err)
            console.log(err);
        else {
            res.json(result);
        }
    });
});

app.delete('/item/:id', (req, res) => {
    // Primary Key of Todo Document
    const todoID = req.params.id;
    // Find Document By ID and delete document from record
    db.getDB().collection('item').findOneAndDelete({ _id: db.getPrimaryKey(todoID) }, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json(result);
    });
});


db.connect((err) => {
    // If err unable to connect to database End application
    if (err) {
        console.log('unable to connect to database');
        process.exit(1);
    }
    // Successfully connected to database. Start up our Express Application. And listen for Request
    else {
        app.listen(PORT, () => {
            console.log('connected to database and server');
        });
    }
});