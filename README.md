# Alura Challenge Back-End 6° Edição

## Sobre o desafio

Ao longo de quatro semanas, o objetivo do projeto foi desenvolver uma plataforma que conecta abrigos temporários de animais para adoção e futuros tutores interessados em adotar um bixinho novo.

Semana 01: Criação de API e integração com Banco de Dados.

Semana 02: Relacionamento entre entidades e engenharia de software.

Semanas 03 & 04: Autenticação, testes e deploy.

## Tecnologias

Este projeto está sendo desenvolvido com Node, Sequelize e MySQL.

## Endpoints

### Tutores

|Descrição|Verbo|Endpoint|Retorno|   
|---|---|---|---|
|  Cadastra novo tutor |  POST   |  /tutores	 |  Json com o tutor cadastrado |
|  Mostra todos tutores | GET	  |  /tutores  |   Json com uma lista de tutores |
| Detalha um tutor  |   GET |  /tutores/:id  |    Json com o tutor solicitado |
|Atualiza um tutor	       |         PUT	            |        /tutores/:id	        |          Json com o tutor atualizado|
|Exclui um tutor	             |     DELETE	         |       /tutores/:id	         |         Mostra id excluído|
|Loga um tutor	              |      POST	           |       /tutores/login	       |         Mensagem de sucesso|
|Mostra todos pets disponíveis	|    GET	           |         /pets	             |             Json com todos pets disponíveis|
|Detalha um pet específico	    |    GET	           |         /pets/:id	         |             Mensagem de sucesso|

### Abrigos

|Descrição|Verbo|Endpoint|Retorno|   
|---|---|---|---|
|Cadastra novo abrigo	|POST	|/abrigos|	Json com o abrigo cadastrado|
|Mostra todos abrigos	|GET	|/abrigos	|Json com uma lista de abrigos|
|Detalha um abrigo	|GET	|/abrigos/:id|	Json com o abrigo solicitado|
|Atualiza um abrigo	|PUT	|/abrigos/:id	|Json com o abrigo atualizado|
|Exclui um abrigo	|DELETE	|/abrigos/:id	|Mostra id excluído|
|Loga um abrigo	|POST	|/abrigos/login|	Mensagem de sucesso|
|Mostra todos pets do abrigo	|GET	|/abrigos/:id/pets	|Json com todos pets do abrigo|
|Detalha um pet específico|	GET|	/pets/:id|	Mensagem de sucesso|
|Cadastra novo pet	|POST	|/pets/|	Json com o pet cadastrado|
|Atualiza um pet|	PUT	|/pets/:id	|Json com o pet atualizado|
|Exclui um pet	|DELETE|/pets/:id|	Mostra id excluído|
|Mostra todas adoções do abrigo|	GET	|/adocoes/:abrigoId|	Json com uma lista de adocoes|
|Detalhar uma adoção|	GET|	/adocoes/:id|	Json com a adoção solicitada|
|Cria nova adoção	|POST|	/abrigos/:abrigoId/adocoes/tutores/:tutorId/pets/:petId	|Json com adoção criada|
|Exclui uma adoção|	DELETE	|/adocoes/:id|	Mostra id excluído|
|Atualiza uma adoção|	PUT|	/adocoes/:id|	Json com adoção atualizada|

## Próximos passos

Ainda não consegui implementar os testes propostos pelo desafio: unitários e de integração. Depois de conferir projetos de outros colegas e pesquisar por guias e páginas, sinto que me falta mais estudo sobre testes e como conseguir implementá-los corretamente.
