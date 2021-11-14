//fazendo a conexao com o banco
//primeiro importar o sequelize
const Sequelize = require('sequelize');
//depois instanciar e fazer a conexao
//nome do banco, usuario, senha, servidor e tipo do banco
const conexao = new Sequelize('guiaperguntas', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = conexao;