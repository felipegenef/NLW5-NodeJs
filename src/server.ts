import express from 'express';
const PORT = process.env.PORT || 3500;

const app = express();

app.get('/', (request, response) => {
    return response.json({ message: 'Olá nlw5' });
});
app.post('/', (request, response) => {
    return response.json({ message: 'Usuário salvo com sucesso!' })
});

app.listen(PORT, () => console.log(`Server is running on ${PORT} `));