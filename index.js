const express = require('express');
const app = express();
const port = 8080;

//importar o model pergunta (criação da tabela)
const pergunta = require('./database/Pergunta');

//importando a conexao
const conexao = require('./database/database.js')
// authenticate serve para conectar
//then serve para quando for conectado com sucesso
conexao.authenticate().then(() => {
    console.log('conexao feita com o banco de dados')
}).catch((msgErro) => {
    console.log('Ocorreu um erro ao conectar ao banco de dados')
})

//traduzir dados do formulario para JS (receber dados do html)
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.set('view engine', 'ejs');
app.use(express.static('public'));

//rotas
app.get('/', (req, res) => {
    //select perguntas
    //raw true serve para não trazer dados desnecessarios
    //ira listar as perguntas, entao sera recebida na variavel perguntas
    pergunta.findAll({raw: true, order: [
        ['id','DESC'] //DESC => Decrescente || ASC => Crescente
    ]}).then(perguntas => {
        //console.log(perguntas);
        res.render("index", {
            perguntas: perguntas
        });
    })

})
app.get('/perguntar', (req, res) => {
    res.render('perguntar');
})
//post serve para receber dados de formulario
app.post('/salvarpergunta', (req, res) => {
    //recebendo titulo e descrição do formulário
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    //inserção no banco
    pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        //se a inserção for feita com sucesso, vai redirecionar para a pagina principal
        res.redirect('/')
    });
})

app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id;
    //buscar um dado com uma condição
    pergunta.findOne({
        //buscar onde o id seja igual
        where: {
            id: id
            //titulo: "como instalar o node?"
        }
    }).then(pergunta => {
        if (pergunta != undefined) { //pergunta achada
            res.render('pergunta', {
                pergunta: pergunta
            });

        }else { //perguntada não encontrada
            res.redirect('/');
        }
    });
})

//criar servidor
app.listen(port, () => {
    console.log(`Rodando...`);
})
