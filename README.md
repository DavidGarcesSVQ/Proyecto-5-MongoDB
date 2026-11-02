# Proyecto-5-MongoDB
Proyecto-5-MongoDB
## Adaptaciones respecto al enunciado original

Durante la implementación del proyecto se han realizado las siguientes adaptaciones:

1. **Conexión a MongoDB:** he utilizado Docker para ejecutar MongoDB en el entorno de GitHub Codespaces, evitando tener que instalar MongoDB directamente en el equipo. La conexión se realiza mediante `mongodb://localhost:27017/proyecto-basico-express-movies`.

2. **Conexión con Mongoose:** he omitido las opciones `useNewUrlParser` y `useUnifiedTopology`, ya que me decía que están obsoletas en las versiones actuales de Mongoose.

3. **Consulta por año:** he utilizado el operador `$gte` en lugar de `$gt` para incluir también las películas estrenadas en el año indicado. De esta manera, la consulta devuelve las películas estrenadas a partir de 2010 incluido, tal como solicita el enunciado.

4. **Carga inicial de datos:** el archivo `movies.seed.js` elimina los documentos existentes mediante `deleteMany({})` antes de insertar las seis películas de ejemplo, evitando duplicados al ejecutar nuevamente la semilla.

5. **Gestión de errores:** se han incorporado bloques `try/catch` en las operaciones de consulta y en la conexión con MongoDB para gestionar posibles errores.