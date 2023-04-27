module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Adocoes', [
			{
				status: "confirmada",
				data: new Date(),
				tutor_id: 1,
				abrigo_id: 1,
				pet_id: 1,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				status: "pendente",
				data: new Date(),
				tutor_id: 2,
				abrigo_id: 2,
				pet_id: 2,
				createdAt: new Date(),
				updatedAt: new Date()
			}

		], {})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Adocoes', null, {})
	}
}