# Aplicación con Vulnerabilidad NoSQL 

# Instalación y Uso:

### Requisitos previos
- Node.js (v16 o superior)
- Conexión a internet (para acceder a MongoDB Atlas)

### Pasos para ejecutar:
1. **Clonar el repositorio o descargarlo directo de github**
   ```bash
   git clone https://github.com/Danny27HA/noSQL_Injection
   cd app-vulnerable-nosql

o descargar directo desde el link del git https://github.com/Danny27HA/noSQL_Injection

2. **Instalar dependencias**
   ```bash
   npm install express mongodb ejs body-parser


3. **Iniciar la base de datos**
   ```bash
    node crear-usuario.js

4. **Ejecutar la aplicación**
   ```bash
    node app.js

5. **Abrir en navegador**
http://localhost:3000





### Explotando la Vulnerabilidad

Método normal que fallará:

Ingresa lo siguiente en los siguientes campos:

Usuario: puma

Contraseña: feroz

Haz clcick en "Acceder"

Esto unicamente probará que el login funciona y que nos manda error ya que no exitse tal usuario con contraseña
--------------------------------------------------------------------------------------------------------------

Método de explotación:

En el campo usuario ingresar: {"$ne": null}

En el campo contraseña ingresar: {"$ne": null}

Haz clic en "Acceder" Y verás que habrás accedido como un usuario real de la base de datos
------------------------------------------------------------------------------------------------------------------

#### ¿Por qué funciona?

Cuando se envía {"$ne": null}, MongoDB interpreta:

username: { $ne: null } -- "username no es null"

password: { $ne: null } -- "password no es null"

Esto hace que la consulta devuelva el primer usuario que tenga cualquier valor en username y tenga cualquier valor en password
