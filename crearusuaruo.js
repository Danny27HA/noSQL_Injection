const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://student:dPgF0sb0ADBUZHCI@clusterunam.6pxlppf.mongodb.net/?retryWrites=true&w=majority&appName=ClusterUNAM";

async function crearUsuario() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('vulnerableApp');
        
        await db.collection('users').insertOne({
            username: "usuario_prueba",
            password: "clave_segura"
        });
        
        console.log("Usuario creado exitosamente");
    } finally {
        await client.close();
    }
}

crearUsuario().catch(console.error);