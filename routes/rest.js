const express = require('express');
const credentials = require('../resources/credentials');
const {getDB} = require('../resources/C');

const router = express.Router();
const adminPassword = credentials.rest.password;

// retrieve  item from back-end
router.get('/get*', (req, res) => {
    const {articleid} = req.body;

    getDB()
    .then( db => {
        const collection = db.db("translation").collection("articles");

        if(articleid) {
            return collection.find({articleid});
        }
        // return entire collection if a specific article title is not requested
        return collection.find({});
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
        console.warn(articleData);
        collection.insertOne(articleData);
    });
    
    // Success. Link to new asset's endpoint
    res.json({message:'Item successfully created'});
});

router.post('/delete*', (req, res) => {
    const {password, articleid} = req.body;
    console.warn(articleid);
    // db could still be a promise at this stage.
    const db = getDB();

    if(password !== adminPassword) res.json({message:'Incorrect Password. Item not deleted'});

    db.then( v => {
        const collection  = v.db("translation").collection("articles");
        
        if(articleid) {
            collection.remove({articleid}, {justOne: true});
            res.json({message: 'Item deleted.'});
            return;
        }
        res.json({message:'No valid article ID provided. No action taken.'});
    });
});

router.post('/update*', () => {
    const {password, articleid} = req.body;

    const db = getDB();

    if(password !== adminPassword) res.json({message:'Incorrect Password. New item not created'});

    // Create entry for item in back-end 
    db.then( v => {
        const collection  = v.db("translation").collection("articles");
        
        const articleData = req.body;
        // don't want to save password to db!
        delete articleData.password;

        if( articleid ) {
            collection.update({articleid}, {$set:articleData});
        }
        res.json({message:'No valid article ID provided. No action taken.'});
    });
    
    // Success. Link to new asset's endpoint
    res.json({message:'Item successfully created'});
});

module.exports = router;
