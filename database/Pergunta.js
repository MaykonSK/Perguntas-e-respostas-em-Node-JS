// gerando tabela com model
const Sequelize = require('sequelize');
const conexao = require('./database');

//criando tabela
//allowNull impede que o campo seja nulo
const Pergunta = conexao.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//sincronizar com o banco de dados
//force false significa que se a tabela existir, não vai forçar a criação
Pergunta.sync({force: false}).then(() => {
    //then é opcional, serve para identificar verdadeiro ou falso
    console.log('Tabela criada')
})

module.exports = Pergunta;
