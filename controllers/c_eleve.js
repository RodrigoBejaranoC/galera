/*************************/
/*** Import used modules */
const { format } = require('mysql2');
const DB = require('../db.config');
const Eleve = DB.Eleve;

/*****************************************/
/*** Unit route for Eleve resource */


exports.getAllEleves = (req, res) => {
    Eleve.findAll()
        .then(eleves => res.json({ message: "All Eleve" }))
        .catch(e => res.status(500).json({ message: 'Database Error', error: e }))
}

exports.getEleve = async (req, res) => {
    let eleveId = parseInt(req.params.id);
    // Vérification si le champ id es présent et cohérent
    if (!eleveId) {
        return res.json(400).json({ message: 'Missing Parameter' });
    }
    try {
        //Récuperation
        let eleve = await Eleve.findOne({ where: { id: eleveId } })
        // si l' Eleve n'existe pas
        if (eleve === null) {
            return res.json(400).json({ message: 'This Eleve does not exist' });
        }

        // envoi des données
        return res.json({ data: eleve });
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err });
    }

}

exports.addEleve = async (req, res) => {
    const { nom, debut, fin } = req.body; // de structurer le BODY pour avoir une shortcut à ses parts
    //validation des données reçues
    if (!firstname || !lastname || !email || !id_formation || !password) {
        return res.status(400).json({ message: 'Missing Data' });
    }
    try {
        //Vérification si l' Eleve existe
        let eleve = await Eleve.findOne({ where: { email: email }, raw: true }); // mejor trabajar con el ID
        if (eleve !== null) {
            return res.status(409).json({ message: `The Eleve ${firstname} ${lastname} already exists!` })
        }
        //Création
        eleve = await Eleve.create(req.body);
        return res.json({ message: 'Eleve Created', data: eleve });
    } catch (err) {
        return res.status(500).json({ message: 'Database error', error: err });
    }
}

/*

exports.updateEleve = async (req, res) => {
    let pid = parseInt(req.params.id)

    return res.json({ message: `Eleve id:${pid} Updated`})
}

exports.deleteEleve =  (req, res) => {
    let pid = parseInt(req.params.id)

    return res.status(204).json({})
}
*/
