/** import module */

const { Sequelize } = require('sequelize');

/** Connexion à la base de données */

let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
}
);

/*** Mise en place des modeles et relations*/

const db = {};
db.sequelize = sequelize;
db.Formation = require('./models/m_formation')(sequelize);
db.Formateur = require('./models/m_formateur')(sequelize);
db.Eleve = require('./models/m_eleve')(sequelize);
db.Module = require('./models/m_module')(sequelize);
db.Note = require('./models/m_note')(sequelize);

//Relation Formation - Eleve
db.Formation.hasMany(db.Eleve, { foreignKey: 'id_formation' });
db.Eleve.belongsTo(db.Formation, { foreignKey: 'id_formation' });


//Relation Formation - Module
db.Formation.hasMany(db.Module, { foreignKey: 'id_formation' });
db.Module.belongsTo(db.Formation, { foreignKey: 'id_formation' });

//Relation Module - Formateur
db.Module.hasMany(db.Formateur, { foreignKey: 'id_formateur' });
db.Formateur.belongsTo(db.Module, { foreignKey: 'id_formateur' });

//Relation Formateur - Note
db.Note.hasMany(db.Formateur, { foreignKey: 'id_formateur' });
db.Formateur.belongsTo(db.Note, { foreignKey: 'id_formateur' }, { onDelete: 'CASCADE' });

//Relation Eleve - Note
db.Note.hasMany(db.Eleve, { foreignKey: 'id_eleve' });
db.Eleve.belongsTo(db.Note, { foreignKey: 'id_eleve' });


/** Sinchronisation des modèles */
//sequelize aurait besoin de faire des changements sur la BD
db.sequelize.sync({ alter: true }); //Quand la BD est stable il faut commenter cette ligne


module.exports = db;
