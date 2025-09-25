const bodyParser = require("body-parser") //biblioteca que acabamos de instalar
const express = require("express") //biblioteca que acabamos de instalar
const app = express() //criar o servidor do app da biblioteca express

app.use(express.static('.')) //criar o servidor
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json()) //middleware para ler dados do corpo de requisição (formulário)
const multer = require("multer") //middleware para lidar com uploads de arquivos

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './upload')
    },
    filename:function(req, file, callback){
        callback(null, '${Date.now()}_${file.originalmente)')
    }
}) //Rota post que recebe um arquivo

const upload = multer({storage}).single('arquivo')
//para salvar o arquivo no destino correto

app.post('/upload', (req, res) =>{
    upload(req, res, err => {
        if(err){
            return res.end('Ocorreu um erro.')
        }

        res.end('Concluído com sucesso.')
    })
})

app.listen(8080, () => console.log('Executando...')
)//coloca o servidor para rodar na porta 8080.