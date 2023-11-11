/*************************/
/*** Import used modules */
const express = require('express')
const noteCtrl = require('../controllers/c_note')

/***************************/
/*** Get Expresss's router */
let router = express.Router()

/*********************************************/
/*** Middleware to log date for each request */
router.use((req, res, next) => {
    const event = new Date()
    console.log('Note Time:', event.toString())
    next()
})


/************************************/
/*** Routes for note resource */

router.get('/', noteCtrl.getAllNotes)

router.get('/:id', noteCtrl.getNote)

router.put('', noteCtrl.addNote)

/*
router.patch('/:id', noteCtrl.updateNote)

router.delete('/:id', noteCtrl.deleteNote)
*/

module.exports = router