import express from 'express';
import './database'
import { routes } from "./routes";

const PORT = process.env.PORT || 3500;

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (request, response) => {
    return response.json({ message: 'Olá nlw5' });
});
app.post('/', (request, response) => {
    return response.json({ message: 'Usuário salvo com sucesso!' })
});

app.listen(PORT, () => console.log(`Server is running on ${PORT} `));