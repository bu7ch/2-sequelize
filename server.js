const express = require('express');
const app = express();
const db = require('./models')

const port = 5678

app.use(express.json());

// verification de la connexion à la db
db.sequelize.authenticate()
    .then(() => console.log('Connexion db works'))
    .catch(err => console.error('Erreur de connexion DB:', err));

app.post('/api/auteurs', async (req,res) => {
   try {
    const newAuteur = await db.Auteur.create(req.body);
    res.json(newAuteur)
   } catch (error) {
    res.json({message: error.message})
   }
})
app.get('/api/auteurs/:auteurId/livres', async (req,res) => {
    const auteurId = parseInt(req.params.auteurId)
    try {
        const auteur = await db.Auteur.findByPk(auteurId, {
            include:[{model:db.Livre, as: 'livres'}]
        })
        if (!auteur) {
            res.json({message:'Auteur non trouvé.'})
        }
        res.json(auteur.livres)
    } catch (error) {
        res.json({message: "Erreur serveur"})
    }
})
app.put('/api/livres/:id', async (req, res)=> {
    const livreId = parseInt(req.params.id);
    try {
        const [nbLigneAffectees] = await db.Livre.update(req.body, {
            where: {id: livreId}
        });
        if (nbLigneAffectees === 0) {
            res.json({message: "Livre non trouvé ou aucune modification apporté."})
        }
        const  livreUpdated = await db.Livre.findByPk(livreId, {
            include:[{model:db.Auteur, as: 'auteur'}]
        })
        res.json({livreUpdated})
    } catch (error) {
        res.json({message: "Erreur lors de la mise à jou:." + error})
    }
})

app.listen(port, () => {
    console.log(`Serveur app demarré sur le port ${port}`);
    
})