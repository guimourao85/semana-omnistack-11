/** 
 * Estudio Inicial React, Node.Js

 * Rota e Recurso

 * Métodos HTTP: 
 * GET:     Buscar uma informação do back end
 * POST:    Criar uma informação no back-end
 * PUT:     Alterar uma informação no back end
 * DELETE:  Deletar uma informação no back-end
 **/

/**
 * Tipos de Parâmetros
 * 
 * Query:    São parametros nomeados, enviados na rota, após a
 *           interrogação "?", Ex.: (Filtros Paginação).
 * Route:    São parâmetros utilizados pra identificar recursos.
 * 
 * Request:  Corpo da requisição, utilizado para criar ou alterar recursos.
 * 
 */
const { response } = require('express');
const express = require('express');
const cors = require('cors'); // Para permitir que toda aplicação (FrontEnd), possa comunicar com o BackEnd.
const routes = require('./routes'); //Quando for arquivo, referenciar arquivo, no caso esta na mesma pasta  (Src)

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(3333);
