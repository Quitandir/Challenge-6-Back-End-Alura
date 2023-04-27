module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Abrigos', [
			{
				imagem: null,
				email: "abrigo@email.com",
				senha: "12345678",
        		nome: "Abrigo dos Pulguentos",
        		telefone: "51-99999999",
        		cidade: "Canoas",
        		sobre: "Lar temporário para cãozinhos e gatíneos.",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				imagem: null,
				email: "lar@email.com",
				senha: "12345678",
        		nome: "Lar Temporário",
        		telefone: "51-99999999",
        		cidade: "Canoas",
        		sobre: "Lar temporário para cãozinhos e gatíneos.",
				createdAt: new Date(),
				updatedAt: new Date()
			}

		], {})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Abrigos', null, {})
	}
}