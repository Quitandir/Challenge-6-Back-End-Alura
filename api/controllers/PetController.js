const { where } = require('sequelize');
const database = require('../models');

class PetController {
    static async pegaTodosPetsDisponiveis (req, res) {
        try {
            const todosPets = await database.Pets.findAll()
            if(todosPets.lenght === 0) return res.status(200).json({msg: 'Nenhum pet encontrado.'})
            return res.status(200).json(todosPets)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaTodosPetsDoAbrigo (req, res) {
        const {abrigoId} = req.params
            
        try {                                                    
            const todosPets = await database.Pets.scope('todos').findAll( {where: { abrigo_id: Number(abrigoId)}})
            if(todosPets.lenght === 0) return res.status(200).json({msg: 'Nenhum pet encontrado.'})
            return res.status(200).json(todosPets)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
    static async pegaUmPet (req, res) {
        const {id} = req.params
            
        try {                                                    
            const umPet = await database.Pets.scope('todos').findOne( {where: { id: Number(id)}})
            if(umPet === null) return res.status(200).json({msg: 'Nenhum pet encontrado.'})
            return res.status(200).json(umPet)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async cadastraPet(req, res) {
        const {abrigoId} = req.params;
        const petInfo  = req.body;

        if(!petInfo.imagem == "") {
            const ehImagem = await fetch(petInfo.imagem, { method: 'HEAD' }).then(ehImagem => {
              if (!ehImagem.headers.get('Content-Type').startsWith('image')) {
                return res.status(400).json({ message: "URL não é uma imagem válida." });
            }})
        }    

        try {
            const novoPetCriado = await database.Pets.create({abrigo_id: Number(abrigoId), ...petInfo})
            return res.status(200).json(novoPetCriado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaPet (req, res) {
        const {id} = req.params
        const novasInfos = req.body

        try {
            await database.Pets.scope('todos').update(novasInfos, {where: { id: Number(id)}} )
            
            const PetAtualizado = await database.Pets.findOne( {where: { id: Number(id)}})
            return res.status(200).json(PetAtualizado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaPet (req, res) {
        const {id} = req.params
            
        try {                                                    
            await database.Pets.scope('todos').destroy( {where: { id: Number(id)}})
            return res.status(200).json({mensagem: `id ${id} deletado.`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PetController;