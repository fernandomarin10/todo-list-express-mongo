const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;
const connectionString = '';

MongoClient.connect(connectionString)
    .then(client => {
        console.log('Connected to Database');
        const db = client.db('basic-crud');
        const todoList = db.collection('quotes')
        console.log("conectado a basic crud");

        //server connection
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.static('public'));
        app.use(bodyParser.json());

        app.set('view engine', 'ejs');
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })

        //routes
        app.post('/todo', (req, res) => {
            console.log(`Intentando insertar:${req.body.name}:${req.body.description}`);
            todoList.insertOne(req.body)
                .then(result => {
                    console.log("insert exitoso");
                    res.redirect('/');
                })
                .catch(error => console.error(error));
        })
        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(results => {
                    console.log(results);
                    res.render('index.ejs', { quotes: results });
                })
                .catch(error => console.error(error));

        })
        app.put('/todo', (req, res) => {
            console.log(req.body);
            todoList.findOneAndUpdate(
                { name: 'fer' },
                {
                    $set: {
                        name: req.body.name,
                        description: req.body.description
                    }
                },
                {
                    upsert: true
                }
            )
                .then(result => {
                    res.json('Success');
                })
                .catch(error => console.error(error))
        })

        app.delete('/todo', (req, res) => {
            // Handle delete event here
            todoList.deleteOne(
                { name: req.body.name }
            )
                .then(result => {
                    if (result.deletedCount === 0) {
                        return res.json('No quote to delete')
                    }
                    res.json('Success deleting');
                })
                .catch(error => console.error(error))
        })
    })
    .catch(error => console.error(error))



