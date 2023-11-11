/*** Import module */
const { DataTypes } = require('sequelize')

/** Modele formation */

module.exports = (sequelize) => {
    const Formateur = sequelize.define('Formateur', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true        // Ici une validation de données
            },
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(64),
            is: /^[0-9a-f]{64}$/i,    // Ici une contrainte
            allowNull: false
        }

    })
    return Formateur
}