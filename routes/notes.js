const notes = require('express').Router();
const fs = require("fs");
const { parse } = require('path');
const uuid = require('../helpers/uuid')

// returning the databasse and saves not as JSON
notes.get('/', (req,res) =>{
  fs.readFile('./db/db.json', (err, data) => {
    if(err){
      console.log(`${req.method} not working`)
    }
    else{
      res.json(JSON.parse(data));
    };
  })
})

notes.post('/', (req,res) => {
  const {title, text} = req.body;

  if(title && text) {
    const newNotes = {
      title,
      text,
      id: uuid(),
    };

    fs.readFile('./db/db.json', 'utf8', (err, data) =>
    {
      if(err) {
        console.error(err);
      } else{
        const parseNotes = JSON.parse(data);
        parseNotes.push(newNotes);

        fs.writeFile('./db/db.json', JSON.stringify(parseNotes, null, 3),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info('Note added')
        );
      }
    });
    const response = {
      status: 'good',
      body: newNotes,
    };
    res.status(201).json(response);
  } else{
    res.status(500).json('Note not added.');
  }
})

notes.delete('/:id', (req, res) =>{
  res.send("DELETE Request Called");
  const paramsId = req.params.id
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if(err){
      console.info('failed to read - from delete')
    }
    else{ 
        const parseData = JSON.parse(data);
        const  remainData  = parseData.filter((data) => {
          data.id !== paramsId;
        })
        fs.writeFile('./db/db.json',JSON.stringify(remainData, null, 3), (err) => {
          err 
          ? console.error(err)
          : console.info(`remainData: ${remainData}`), console.info(remainData) 
        })
    }
  })
})

  module.exports = notes;