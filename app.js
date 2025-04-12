const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Configura MongoDB
const uri = "mongodb+srv://student:dPgF0sb0ADBUZHCI@clusterunam.6pxlppf.mongodb.net/?retryWrites=true&w=majority&appName=ClusterUNAM";
const client = new MongoClient(uri);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

let db;

// Conexión a MongoDB
async function connectDB() {
    try {
        await client.connect();
        db = client.db('vulnerableApp');
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error de conexión a MongoDB:', error);
    }
}
connectDB();

// Ruta principal
app.get('/', (req, res) => {
    res.render('login');
});

// Ruta POST vulnerable (NoSQL injection aquí)
app.post('/login', async (req, res) => {
    let { username, password } = req.body;

    try {
        if (typeof username === 'string' && username.startsWith('{')) {
            username = JSON.parse(username);
        }
        if (typeof password === 'string' && password.startsWith('{')) {
            password = JSON.parse(password);
        }
    } catch (e) {
        console.log("No se pudo parsear como JSON, continuando como string");
    }

    console.log("Datos parseados:", { username, password });

    try {
        const query = {
            username: username,
            password: password
        };

        console.log("Consulta MongoDB:", JSON.stringify(query, null, 2));

        const user = await db.collection('users').findOne(query);

        if (user) {
            res.send(`<h2>¡Login exitoso! Bienvenido, ${user.username}.</h2>`);
        } else {
            res.send('<h2>Credenciales incorrectas</h2>');
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error en el servidor');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});