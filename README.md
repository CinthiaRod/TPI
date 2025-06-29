                                            📚​Gestión de una Librería📚​

🎯​El objetivo de este proyecto es desarrollar una API-rest para la gestión de una librería🎯​

Este sistema sigue el patrón de diseño MVC (Modelo-Vista-Controlador) para organizar y estructurar el código de manera modular y escalable. Los datos de la librería se almacenan en bases de datos locales, representadas como archivos JSON, permitiendo su fácil manipulación y persistencia. 


🗃️​Estructura del proyecto🗃️​

El proyecto sigue la estructura del patrón MVC:
📂 Integrador_Delgado_Garcia_Higuera_Rodriguez
 ├── 📂 BACKEND  
 |   ├── 📂 CONTROLLERS      ​    ➡️​ Controladores para manejar la lógica del programa 
 |   |    ├──📃bookController.js
 |   |    ├──📃usersController.js
 |   ├── 📂 DATABASE             ​➡️​ Archivos JSON para la persistencia de datos  
 |        ├──📃​books.json
 |        ├──📃​users.json
 |   ├── 📂 MIDDLEWARES          ➡️​ Procesamiento y validación de las solicitudes de la API
 |   |    ├──📃authMiddleware.js
 |   |    ├──📃ErrorMiddleware.js
 |   |    ├──📃ValidateMiddleware.js
 |   ├── 📂 MODELS               ​➡️​ Modelos para la gestión de datos
 |   |    ├──📃​bookModel.js
 |   |    ├──📃usersModel.js
 |   ├── 📂 ROUTES               ​➡️​ Manejo de las rutas del programa 
 |   |    ├──📃​bookRoutes.js
 |   |    ├──📃usersRoutes.js
 |   ├── 📂 SERVICES             ​➡️​ Servicios con la lógica del negocio de la aplicación
 |   |    ├──📃​bookService.js
 |   |    ├──📃usersService.js
 |   ├── index.js      ​          ➡️​ Archivo principal que configura la app, registra middlewares y rutas, y enciende el servidor.
 ├── 📂 PUBLIC
 |   ├── index.html              ➡️​ Archivo principal que define la estructura visual de la página web.
 |   ├── script.js               ➡️ Agrega interactividad y conecta con el backend mediante JavaScript.
 |   ├── style.css               ➡️ Aplica estilos y diseño al contenido HTML.
 ├── 📂 node_modules             ➡️​ Dependencias del proyecto 
 ├── ​​💼​ package-lock.json    ​    ➡️​ Dependencias del proyecto 
 ├── ​​💼​ package.json             ​➡️​ Dependencias del proyecto  
 ├── ​​🧾​ README.md                ➡️​ Documentación del proyecto



                        ​​​🚨​​​​🚨​Instrucciones para ejecutar el proyecto​​​🚨​​​​🚨​
              
1. Disponer en tu equipo de los software Visual Studio Code(VSC) y Git bash, previamente instalados, lo anterior para poder correr el proyecto.
2. Abrir la capeta 📂 Integrador_Delgado_Garcia_Higuera_Rodriguez en VSC.
3. Posicionate en la terminal dentro de la carpeta 📂 Integrador_Delgado_Garcia_Higuera_Rodriguez-->📂 BACKEND 
4. Enceder el sevidor en la terminal ejecutando el siguiente comando: node index.js
5. Ingresar a la API desde el navegador utilizando Ctrl + click sobre el enlace http://localhost:3001

​​​                    
                              ​📡​Uso del servidor TCP (server.js)

El servidor está implementado usando el módulo net de Node.js y escucha en el puerto 3001. El servidor maneja las conexiones de múltiples clientes, recibe comandos y responde con los resultados de las acciones solicitadas, como mostrar, agregar, eliminar o buscar libros, autores y editoriales.
​​​​​​​​​                                  
                                    💻​​Uso de la API

La interacción con el servidor se realiza mediante una interfaz gráfica desplegada en el navegador con ruta local, la cual tiene un menú interactivo que te permitirá:

​​​​​         🚀​Menú de Usuarios​​​​​🚀​

1. Mostrar usuarios: Muestra todos los autores.
2. Agregar usuario: Permite agregar un nuevo autor.
3. Modificar usuario: Permite mopdificar características del usuario deseado.
4. Eliminar usuario: Permite eliminar un autor por ID.

​​​​​         🚀​Menú de Libros​​​​​🚀​

1. Mostrar libros: Muestra todos los libros.
2. Agregar libro: Permite agregar un nuevo libro.
3. Modificar libro: Permite modificar la información del libro deseado.
4. Eliminar libro: Permite eliminar un libro por ID.

​​​​​        🚀Formulario de inicio de sesión​​​​​🚀​

1. Identificación mediante usuario
2. Solo usuario "admin" tiene acceso a todas las funcionalidades de la API.
3. Los otros usuarios solo pueden consultar "Mostrar todos los libros.

       ​​​​​​
                                  ⚠️​​​​​​​⚠️​Manejo de Errores​​​​​​⚠️​​​​​​​⚠️​
          
Para el correcto funcionamiento y comunicación entre el cliente y el servidor, se utilizaron diversas herramientas dentro del código para poder llevar los mensajes apropiados según sea necesario para trasmitir la información en cuanto a los posibles errores durante el uso de la API.
