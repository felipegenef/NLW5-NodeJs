import express, { response } from 'express';
import {createServer} from 'http'
import {Server, Socket} from 'socket.io'
import path from 'path';

import './database'
import { routes } from "./routes";


const app = express();

app.use(express.static(path.join(__dirname,'..','public')))
app.set('views',path.join(__dirname,'..','public'));
app.engine('html',require("ejs").renderFile);
app.set('view engine','html')
const http = createServer(app); //criando o protocolo http
const io = new Server(http); // criando o protocolo ws

io.on('connection',(socket:Socket)=>{
    
});

app.use(express.json());
app.use(routes);


app.get('/pages/client',(request,response)=>{
    return response.render('html/client.html');
});


app.get('/', (request, response) => {
    return response.json({ message: 'Olá nlw5' });
});
app.post('/', (request, response) => {
    return response.json({ message: 'Usuário salvo com sucesso!' })
});
export {http,io}