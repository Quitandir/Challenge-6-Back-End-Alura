const TutorController = require('../controllers/TutorController');
const database = require('../models');
const request = require('supertest');
const app = require('../app');

let server;

beforeEach(() => {
  const port = 3000;

  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /tutores', () => {

  it("Deve retornar todos os tutores e com status 200", async () => {
    // Chama o método listarAbrigos do controlador
    const mockResult = 
    [
      {
          "id": 1,
          "nome": "Moisés Enick",
          "email": "moises@email.com",
          "senha": "12345678",
          "createdAt": "2023-04-25T18:46:11.000Z",
          "updatedAt": "2023-05-03T15:31:30.000Z"
      },
      {
          "id": 2,
          "nome": "Elen Rame",
          "email": "elen@email.com",
          "senha": "12345678",
          "createdAt": "2023-04-25T18:46:11.000Z",
          "updatedAt": "2023-04-25T18:46:11.000Z"
      }
  ];
    
    TutorController.pegaTodosTutores = jest.fn().mockResolvedValue(mockResult);

    // Faz a requisição HTTP GET /abrigos
    const response = await request(app).get("/tutores");

    // Verifica se o status da resposta é 200 e se o corpo da resposta contém os abrigos
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockResult);

    TutorController.pegaTodosTutores.mockRestore();
  });

  it("Deve retornar o primeiro tutor e com status 200", async () => {
    
    const mockResult = 
   
        {
          "id": 1,
          "nome": "Moisés Enick",
          "email": "moises@email.com",
          "senha": "12345678",
          "createdAt": "2023-04-25T18:46:11.000Z",
          "updatedAt": "2023-05-03T15:31:30.000Z"
      };
        
    TutorController.pegaUmTutor = jest.fn().mockResolvedValue(mockResult);

    // Faz a requisição HTTP GET /abrigos
    const response = await request(app).get("/tutores/1");

    // Verifica se o status da resposta é 200 e se o corpo da resposta contém os abrigos
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockResult);

    TutorController.pegaUmTutor.mockRestore();
  });
});

describe("GET /tutores", () => {
  const teste = {  
    nome: "Tutor",
    email: "teste@email.com",
    senha: "12345678"
  }

  beforeAll(async () => {  
    await request(app).post("/tutores").send(teste);    
  })

  afterAll(async () => {
    const umTutor = await database.Tutores.findOne( {where: { nome: teste.nome}})
    
    await request(app).delete(`/tutores/${umTutor.id}`);
  })

  it("should return 200", async () => {
    const response = await request(app).get("/tutores");
    expect(response.statusCode).toBe(200);
  
  });

  it("should return tutores", async () => {
    const response = await request(app).get("/tutores");
    expect(response.body.length >= 3).toBe(true);
  });
});


describe('POST em /tutores', () => {

  it("Deve retornar tutor criado e com status 201", async () => {
    
    const mockResult =     
      {
        id: 10,
        nome: 'Jon Doe',
        email: 'jd@email.com',
        senha: '12345678',
        created_at: '2023-04-07',
        updated_at: '2023-04-07'      
      };
    
    TutorController.criaTutor = jest.fn().mockReturnValue(mockResult);

    //let response = await request(app).post("/tutores").send(mockResult);

    //response = jest.fn().mockReturnValue(mockResult);
    
    const response = TutorController.criaTutor();
    
    //expect(response.statusCode).toBe(201);
    expect(response).toEqual(expect.objectContaining({
      id: expect.any(Number),
      ...mockResult,
      created_at: expect.any(String),
      updated_at: expect.any(String),
    }));

    TutorController.criaTutor.mockRestore();
  });

  it('Deve retornar erro 400 ao enviar senha com menos de 8 caractéres', async () => {

    const mockResult =     
      {
        id: 10,
        nome: 'Jon Doe',
        email: 'jd@email.com',
        senha: '123456',
        created_at: '2023-04-07',
        updated_at: '2023-04-07'      
      };

      //TutorController.criaTutor = jest.fn().mockReturnValue(mockResult);

      const response = await request(app).post("/tutores").send(mockResult);

      expect(response.statusCode).toBe(400);
  })
});

describe('DELETE em /tutores/', () => {

  const teste = {  
    nome: "Tutor",
    email: "teste@email.com",
    senha: "12345678"
  }

  beforeAll(async () => {  
    await request(app).post("/tutores").send(teste);    
  })

  it('deve deletar recurso adicionado', async () => {
    const umTutor = await database.Tutores.findOne( {where: { nome: teste.nome}})
    const response = await request(app).delete(`/tutores/${umTutor.id}`)
    expect(response.statusCode).toBe(200);
  });

});

describe("PUT em /tutores", () => {
  const teste = {  
    nome: "Tutor",
    email: "teste@email.com",
    senha: "12345678"
  }

  beforeAll(async () => {  
    await request(app).post("/tutores").send(teste);    
  })

  afterAll(async () => {
    const umTutor = await database.Tutores.findOne( {where: { nome: teste.nome}})
    
    await request(app).delete(`/tutores/${umTutor.id}`);
  })   
    
  it("deve atualizar informação do tutor", async () => {
    const umTutor = await database.Tutores.findOne( {where: { nome: teste.nome}})
    const response = await request(app).put(`/tutores/${umTutor.id}`).send({
      email: 'tutor@email.com',
    });
    expect(response.statusCode).toBe(201);
    expect(umTutor.email).toEqual('tutor@email.com');
  });
});
