/*************************/
/*** Import used modules */
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

/** Connexion de la base de données */
let DB = require('./db.config');


/************************/
/*** API Initialization */
const app = express()

app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/****************************/
/*** Import routers modules */
const auth_router = require('./routers/auth')
const formation_router = require('./routers/r_formation')
const formateur_router = require('./routers/r_formateur')
const eleve_router = require('./routers/r_eleve')
const note_router = require('./routers/r_note')
const module_router = require('./routers/r_module')

/****************************/
/*** Main router parameters */

app.get('/', (req, res) => res.send(`I'm online. All is OK !`))

app.use('/auth', auth_router)
app.use('/formation', formation_router)
app.use('/formateur', formateur_router)
app.use('/eleve', eleve_router)
app.use('/note', note_router)
app.use('/module', module_router)

app.get('*', (req, res) => res.status(501).send('What the hell are you doing !?!'))


/********************************/
/*** Démarrage de l'API */

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MONGODB CONX OK");
    //Connexion MAriaDB
    DB.Sequelize.authenticate()
      .then(() => console.log('Maria DB CNX OK'))
      .then(() => {
        app.listen(process.env.DB_PORT, () => {
          console.log("Funciona");
        })
      })
      .catch(e => console.log("Database error - MariaDB", e))
    //fin connexion mariaDB
  })
  .catch(e => console.log("Database error - MongoDB", e))



/*app.listen(process.env.SERVER_PORT, () => {
  console.log(`This server is running on port ${process.env.SERVER_PORT}. Have fun !`)
})*/


