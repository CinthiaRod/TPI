// Constantes para las URLs de tu API
const API_URL_USERS = '/users'; // URL para las operaciones con usuarios (ej. http://localhost:3000/users)
const API_URL_BOOKS = '/books'; // URL para las operaciones con libros (ej. http://localhost:3000/books)

// --- Funciones de Utilidad para la Interfaz (UI) ---

/**
 * Abre y configura el formulario de gestión de usuarios (registro/login).
 * Oculta/muestra el campo 'User ID' según la acción.
 * @param {string} action - La acción a realizar ('create' para registro, 'modify' para login).
 */
function openUserForm(action) {
    // Establece el valor del campo oculto 'user-action' para saber qué operación se va a realizar
    document.getElementById("user-action").value = action;
    // Hace visible el formulario de usuario
    document.getElementById("user-form").style.display = "block";

    // Muestra u oculta el campo 'User ID'
    // El ID solo es necesario para modificar o eliminar, no para crear/registrar.
    // Aunque tu HTML usa 'modify' para "Login", si "Login" no requiere un ID en el formulario
    // (solo username/password), esta lógica podría necesitar un ajuste en el futuro.
    // Por ahora, si la acción es diferente de 'create', muestra el ID.
    document.getElementById("user-id").style.display =
        action !== "create" ? "block" : "none";

    // Limpia los campos del formulario cada vez que se abre
    document.getElementById("user-id").value = '';
    document.getElementById("user-username").value = '';
    document.getElementById("user-password").value = '';
    document.getElementById("user-role").value = 'user'; // Valor por defecto
}

/**
 * Abre y configura el formulario de gestión de libros.
 * Oculta/muestra el campo 'Book ID' según la acción.
 * @param {string} action - La acción a realizar ('create', 'modify', 'delete').
 */
function openBookForm(action) {
    // Establece el valor del campo oculto 'book-action'
    document.getElementById("book-action").value = action;
    // Hace visible el formulario de libros
    document.getElementById("book-form").style.display = "block";

    // Muestra u oculta el campo 'Book ID'
    // El ID solo es necesario para modificar o eliminar, no para añadir.
    document.getElementById("book-id").style.display =
        action !== "create" ? "block" : "none";

    // Limpia los campos del formulario cada vez que se abre
    document.getElementById("book-id").value = '';
    document.getElementById("book-title").value = '';
    document.getElementById("book-author").value = '';
    document.getElementById("book-year").value = '';
    document.getElementById("book-stock").value = '';
}

/**
 * Cierra un formulario específico ocultándolo.
 * @param {string} formId - El ID del formulario a cerrar (ej. 'user-form', 'book-form').
 */
function closeForm(formId) {
    document.getElementById(formId).style.display = "none";
}


// --- Funciones para la Comunicación con la API (Peticiones Fetch) ---

/**
 * Envía los datos del formulario de usuario a la API.
 * Maneja operaciones de registro (POST), login (POST), modificación (PUT) y eliminación (DELETE).
 * @param {Event} event - El evento de envío del formulario.
 */
async function submitUserForm(event) {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // 1. Recoger los valores del formulario
    const action = document.getElementById("user-action").value;
    const id = document.getElementById("user-id").value;
    const username = document.getElementById("user-username").value;
    const password = document.getElementById("user-password").value;
    const role = document.getElementById("user-role").value;

    const userData = { // Objeto con los datos del usuario a enviar al backend
        username: username,
        password: password,
        role: role,
    };

    // 2. Determinar la URL y el método HTTP según la acción
    let url = API_URL_USERS; // URL por defecto para crear (registro)
    let method = "POST";     // Método por defecto para crear

    if (action === "modify") { // Para login (que aquí llamas 'modify' en el HTML)
        url = `${API_URL_USERS}/login`; // Suponiendo que tu endpoint de login es /users/login
        method = "POST"; // El login casi siempre es POST, incluso si el HTML lo llama 'modify'
        // Para el login, no necesitas el ID del usuario en la URL, solo username y password en el body.
        // Asegúrate de que tu backend maneje la ruta POST /users/login.
    } else if (action === "delete") { // Para eliminar
        url = `${API_URL_USERS}/${id}`; // URL con el ID del usuario a eliminar
        method = "DELETE";
        // Para DELETE, el body (userData) a menudo no es necesario, pero no causa problema si se envía.
    } else if (action === "create") { // Para registro
        url = API_URL_USERS; // URL base para registro (POST)
        method = "POST";
    }

    // Nota importante: Si tienes una operación de "modificar usuario" real (PUT),
    // y tu HTML tuviera un botón para ello, tendrías que añadir otro `else if (action === "update")` aquí.
    // Tal como está, 'modify' se usa para "Login" en tu HTML, lo cual es algo confuso,
    // pero el script se adapta a esa convención.

    // 3. Realizar la petición Fetch a la API
    try {
        console.log(`Enviando petición a: ${url} con método: ${method}`, userData);
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json", // Indica que estamos enviando JSON
            },
            body: JSON.stringify(userData), // Convierte el objeto JavaScript a una cadena JSON
        });

        // 4. Manejar la respuesta del servidor
        if (!response.ok) { // Si la respuesta no es OK (ej. 400, 401, 500)
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            console.error("Error en la respuesta de la API:", errorData);
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        const result = await response.json(); // Parsea la respuesta JSON exitosa
        console.log("Éxito:", result);

        // Opcional: Mostrar un mensaje al usuario
        alert(`Operación de usuario exitosa: ${JSON.stringify(result.message || result)}`);

        // 5. Cerrar el formulario y/o actualizar la UI
        closeForm("user-form");
        // Si tuvieras una tabla de usuarios, podrías llamar a fetchUsers() aquí para actualizarla
        // fetchUsers();

    } catch (error) {
        console.error("Error en la operación de usuario:", error);
        alert(`Error en la operación de usuario: ${error.message || 'Error desconocido'}`);
    }
}

/**
 * Envía los datos del formulario de libros a la API.
 * Maneja operaciones de añadir (POST), modificar (PUT) y eliminar (DELETE).
 * @param {Event} event - El evento de envío del formulario.
 */
async function submitBookForm(event) {
    event.preventDefault(); // Evita que la página se recargue

    // 1. Recoger los valores del formulario
    const action = document.getElementById("book-action").value;
    const id = document.getElementById("book-id").value;
    const title = document.getElementById("book-title").value;
    const author = document.getElementById("book-author").value;
    const year = document.getElementById("book-year").value;
    const stock = document.getElementById("book-stock").value;

    const bookData = { // Objeto con los datos del libro a enviar al backend
        title: title,
        author: author,
        year: parseInt(year), // Asegúrate de convertir a número si es necesario en el backend
        stock: parseInt(stock) // Asegúrate de convertir a número
    };

    // 2. Determinar la URL y el método HTTP según la acción
    let url = API_URL_BOOKS; // URL por defecto para añadir un libro (POST)
    let method = "POST";     // Método por defecto para añadir

    if (action === "modify") { // Para modificar
        url = `${API_URL_BOOKS}/${id}`; // URL con el ID del libro a modificar
        method = "PUT";
    } else if (action === "delete") { // Para eliminar
        url = `${API_URL_BOOKS}/${id}`; // URL con el ID del libro a eliminar
        method = "DELETE";
        // Para DELETE, el body (bookData) a menudo no es necesario, pero no causa problema si se envía.
    }
    // Nota: El botón "List of all Books" en tu HTML usa 'create'. Si tu API tiene un endpoint GET /books
    // para listar, esta función submitBookForm NO es la adecuada para eso.
    // Deberías usar fetchBooks() directamente o crear una función específica para mostrar la lista.

    // 3. Realizar la petición Fetch a la API
    try {
        console.log(`Enviando petición a: ${url} con método: ${method}`, bookData);
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookData),
        });

        // 4. Manejar la respuesta del servidor
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            console.error("Error en la respuesta de la API:", errorData);
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Éxito:", result);

        // Opcional: Mostrar un mensaje al usuario
        alert(`Operación de libro exitosa: ${JSON.stringify(result.message || result)}`);

        // 5. Cerrar el formulario y/o actualizar la UI
        closeForm("book-form");
        // Si tuvieras una tabla de libros, podrías llamar a fetchBooks() aquí para actualizarla
        // fetchBooks();

    } catch (error) {
        console.error("Error en la operación de libro:", error);
        alert(`Error en la operación de libro: ${error.message || 'Error desconocido'}`);
    }
}

// --- Funciones para Obtener Listas (Inicialmente no conectadas a botones en tu HTML, pero útiles) ---

/**
 * Obtiene y loguea todos los usuarios desde la API.
 * Debería usarse si quieres mostrar la lista completa en la UI.
 */
async function fetchUsers() {
    try {
        const response = await fetch(API_URL_USERS);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const users = await response.json();
        console.log("Usuarios obtenidos:", users);
        // Aquí podrías tener lógica para mostrar los usuarios en una tabla, etc.
        // Por ejemplo: displayUsers(users);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        alert(`Error al obtener usuarios: ${error.message}`);
    }
}

/**
 * Obtiene y loguea todos los libros desde la API.
 * Debería usarse si quieres mostrar la lista completa en la UI.
 */
async function fetchBooks() {
    try {
        const response = await fetch(API_URL_BOOKS);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const books = await response.json();
        console.log("Libros obtenidos:", books);
        // Aquí podrías tener lógica para mostrar los libros en una tabla, etc.
        // Por ejemplo: displayBooks(books);
    } catch (error) {
        console.error("Error al obtener libros:", error);
        alert(`Error al obtener libros: ${error.message}`);
    }
}