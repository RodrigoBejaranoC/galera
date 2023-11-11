/*************************/
/*** Import used modules */
const { format } = require('mysql2');
const DB = require('../db.config');
const Formation = DB.Formation;

/*****************************************/
/*** Unit route for Formation resource */

exports.getAllFormations = (req, res) => {
    Formation.findAll()
        .then(formations => res.json({ message: "All formation" }))
        .catch(e => res.status(500).json({ message: 'Database Error', error: e }))
}

exports.getFormation = async (req, res) => {
    let formationId = parseInt(req.params.id);
    // Vérification si le champ id es présent et cohérent
    if (!formationId) {
        return res.json(400).json({ message: 'Missing Parameter' });
    }
    try {
        //Récuperation
        let formation = await Formation.findOne({ where: { id: formationId } })
        // si la formation n'existe pas
        if (formation === null) {
            return res.json(400).json({ message: 'This formation does not exist' });
        }

        // envoi des données
        return res.json({ data: formation });
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err });
    }

}

exports.addFormation = async (req, res) => {
    const { nom, debut, fin } = req.body; // de structurer le BODY pour avoir une shortcut à ses parts
    //validation des données reçues
    if (!nom || !debut || !fin) {
        return res.status(400).json({ message: 'Missing Data' });
    }
    try {
        //Vérification si la formation existe
        let formation = await Formation.findOne({ where: { nom: nom }, raw: true }); // mejor trabajar con el ID
        if (formation !== null) {
            return res.status(409).json({ message: `The formation ${nom} already exists!` })
        }
        //Création
        formation = await Formation.create(req.body);
        return res.json({ message: 'Formation Created', data: formation });
    } catch (err) {
        return res.status(500).json({ message: 'Database error', error: err });
    }
}

/*
exports.updateFormation = async (req, res) => {
    let pid = parseInt(req.params.id)

    return res.json({ message: `Formation id:${pid} Updated` })
}

exports.deleteFormation = (req, res) => {
    let pid = parseInt(req.params.id)

    return res.status(204).json({})
}
*/