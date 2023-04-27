const {Router} = require('express')

const TutorController = require('../controllers/TutorController')
const PetController = require('../controllers/PetController')

const router = Router()

router.get('/tutores', TutorController.pegaTodosTutores)
router.get('/tutores/:id', TutorController.pegaUmTutor)
router.post('/tutores/', TutorController.criaTutor)
router.post('/tutores/login', TutorController.logaTutor)
router.put('/tutores/:id', TutorController.atualizaTutor)
router.delete('/tutores/:id', TutorController.apagaTutor)

// Rotas para os pets

router.get('/pets', PetController.pegaTodosPetsDisponiveis)
router.get('/pets/:id', PetController.pegaUmPet)

module.exports = router;