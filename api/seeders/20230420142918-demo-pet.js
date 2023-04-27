module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Pets', [
			{
				imagem: null,
				nome: 'Dunga',
				idade: '2 anos',
				porte: 'P',
				descricao: 'Calmo e educado',
				adotado: true,
				abrigo_id: 1,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				imagem: null,
				nome: 'Felícia',
				idade: '3 meses',
				porte: 'P',
				descricao: 'Ativa e carinhosa',
				adotado: false,
				abrigo_id: 1,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				imagem: null,
				nome: 'Sirius',
				idade: '2 anos',
				porte: 'G',
				descricao: 'Destruidor de sofás',
				adotado: false,
				abrigo_id: 1,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				imagem: null,
				nome: 'Fiona',
				idade: '1 mês',
				porte: 'P',
				descricao: 'Rato do banhado',
				adotado: false,
				abrigo_id: 1,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				imagem: null,
				nome: 'Sid',
				idade: '8 meses',
				porte: 'M',
				descricao: 'Pulguento',
				adotado: false,
				abrigo_id: 1,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				imagem: null,
				nome: 'Yoda',
				idade: '1 ano',
				porte: 'M',
				descricao: 'Mestre do universo',
				adotado: false,
				abrigo_id: 1,
				createdAt: new Date(),
				updatedAt: new Date()
			},

		], {})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Pets', null, {})
	}
}
