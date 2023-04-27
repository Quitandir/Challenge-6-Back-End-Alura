module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Tutores', [
			{
				nome: "Moisés Enick",
       			email: "moises@email.com",
        		senha: "12345678",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				nome: "Elen Rame",
        		email: "elen@email.com",
        		senha: "12345678",
				createdAt: new Date(),
				updatedAt: new Date()
			}

		], {})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Tutores', null, {})
	}
}