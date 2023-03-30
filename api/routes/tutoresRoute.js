const {Router} = require('express')
//Router é uma ferramenta do express

const TutorController = require('../controllers/TutorController')

const router = Router()

router.get('/tutores', TutorController.pegaTodosTutores)
router.get('/tutores/:id', TutorController.pegaUmTutor)
router.post('/tutores/', TutorController.criaTutor)
router.put('/tutores/:id', TutorController.atualizaTutor)
router.delete('/tutores/:id', TutorController.apagaTutor)


module.exports = router;