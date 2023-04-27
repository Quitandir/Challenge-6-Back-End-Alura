const { where } = require('sequelize');
const database = require('../models');

class AdocaoController {
    static async pegaTodasAdocoes (req, res) {
        const {abrigoId} = req.params

        try {
            const todasAdocoes = await database.Adocoes.findAll( {where: { abrigo_id: Number(abrigoId)}})
            if(todasAdocoes.length === 0) return res.status(200).json({msg: 'Nenhuma adoção encontrada.'})
            return res.status(200).json(todasAdocoes)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaAdocao (req, res) {
        const {id} = req.params
            
        try {                                                    
            const umaAdocao = await database.Adocoes.findOne( {where: { id: Number(id)}})
            if(umaAdocao ===  null) return res.status(200).json({msg: 'Nenhuma adoção encontrada.'})
            return res.status(200).json(umaAdocao)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaAdocao (req, res) {
        const {abrigoId, tutorId, petId} = req.params
        const novaAdocao = req.body
        try {
            const novaAdocaoCriada = await database.Adocoes.create({
                abrigo_id: Number(abrigoId), tutor_id: Number(tutorId), pet_id: Number(petId), ...novaAdocao})

            if(novaAdocao.status === 'confirmada'){
                await database.Pets.update({adotado: true}, {where: { id: Number(petId)}})
            }

            return res.status(200).json(novaAdocaoCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaAdocao (req, res) {
        const {id, petId} = req.params
        const novasInfos = req.body
        

        try {
            await database.Adocoes.update(novasInfos, {where: { id: Number(id)}} )
            
            const adocaoAtualizada = await database.Adocoes.findOne( {where: { id: Number(id)}})

            if(adocaoAtualizada.status === 'confirmada'){
                await database.Pets.update({adotado: true}, {where: { id: Number(petId)}})
            }

            return res.status(200).json(adocaoAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaAdocao (req, res) {
        const {id} = req.params
            
        try {                                                    
            await database.Adocoes.destroy( {where: { id: Number(id)}})
            return res.status(200).json({mensagem: `Adoção id ${id} deletada.`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = AdocaoController;