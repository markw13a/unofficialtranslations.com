const express = require('express');
const credentials = require('../resources/credentials');
const {getDB} = require('../resources/C');

const router = express.Router();
const adminPassword = credentials.rest.password;

// retrieve  item from back-end
router.get('/get*', (req, res) => {
    const {id} = req.query;

    getDB()
    .then( db => {
        const collection = db.db("translation").collection("articles");

        // return entire collection if a specific article title is not requested
        return collection.find(id ? {id} : {});
    }) // need to convert MongoDB object to array
    .then( results => results.toArray())
    .then( data => res.json({data}));
});

// write item to back-end if correct password provided
router.post('/create*', (req, res) => {
    const {password} = req.body;   
    // db could still be a promise at this stage.
    const db = getDB();

    if(password !== adminPassword) res.json({message:'Incorrect Password. New item not created'});

    // Create entry for item in back-end 
    db.then( v => {
        const collection  = v.db("translation").collection("articles");
        
        const articleData = req.body;
        // don't want to save password to db!
        delete articleData.password;
        collection.insertOne(articleData);
    });
    
    // Success. Link to new asset's endpoint
    res.json({message:'Item successfully created'});
});

router.post('/delete*', (req, res) => {
    const {password, id} = req.body;
    // db could still be a promise at this stage.
    const db = getDB();

    if(password !== adminPassword) res.json({message:'Incorrect Password. Item not deleted'});

    db.then( v => {
        const collection  = v.db("translation").collection("articles");
        
        if(id) {
            collection.remove({id}, {justOne: true});
            res.json({message: 'Item deleted.'});
            return;
        }
        res.json({message:'No valid article ID provided. No action taken.'});
    });
});

router.post('/update*', (req, res) => {
    const {password, id} = req.body;
    const db = getDB();

    if(password !== adminPassword) res.json({message:'Incorrect Password. New item not created'});

    if( !id ) res.json({message:'No valid article ID provided. No action taken.'});

    // Create entry for item in back-end 
    db.then( v => {
        const collection  = v.db("translation").collection("articles");
        
        const articleData = req.body;
        // don't want to save password to db!
        delete articleData.password;
        collection.update({id}, articleData);
    });
    
    res.json({message:'Item successfully created'});
});

module.exports = router;
