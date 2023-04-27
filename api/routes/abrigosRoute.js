const {Router} = require('express')
//Router é uma ferramenta do express

const AbrigoController = require('../controllers/AbrigoController')
const PetController = require('../controllers/PetController')
const AdocaoController = require('../controllers/AdocaoController')

const router = Router()

// Métodos do abrigo

router.get('/abrigos', AbrigoController.pegaTodosAbrigos)
router.get('/abrigos/:id', AbrigoController.pegaUmAbrigo)
router.post('/abrigos/', AbrigoController.criaAbrigo)
router.post('/abrigos/login', AbrigoController.logaAbrigo)
router.put('/abrigos/:id', AbrigoController.atualizaAbrigo)
router.delete('/abrigos/:id', AbrigoController.apagaAbrigo)

// Métodos para os pets

router.get('/pets/:id', PetController.pegaUmPet)
router.get('/abrigos/:abrigoId/pets', PetController.pegaTodosPetsDoAbrigo)
router.post('/abrigos/:abrigoId/pets', PetController.cadastraPet)
router.put('/pets/:id', PetController.atualizaPet)
router.delete('/pets/:id', PetController.apagaPet)

// Método para adoções

router.get('/adocoes/:abrigoId', AdocaoController.pegaTodasAdocoes)
router.get('/adocoes/:id', AdocaoController.pegaUmaAdocao)
router.post('/abrigos/:abrigoId/adocoes/tutores/:tutorId/pets/:petId', AdocaoController.criaAdocao)
router.delete('/adocoes/:id', AdocaoController.apagaAdocao)
router.put('/adocoes/:id/pet/:petId', AdocaoController.atualizaAdocao)

module.exports = router;