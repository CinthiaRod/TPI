// Constantes para las URLs de tu API
const API_URL_USERS = '/users'; // URL para las operaciones con usuarios (ej. http://localhost:3000/users)
const API_URL_BOOKS = '/books'; // URL para las operaciones con libros (ej. http://localhost:3000/books)

// --- Funciones de Utilidad para la Interfaz (UI) ---
// At the top of script.js
let authToken = null;


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

//--------------------------------------
async function submitUserForm(event) {
    event.preventDefault();

    const action = document.getElementById("user-action").value;
    const username = document.getElementById("user-username").value;
    const password = document.getElementById("user-password").value;
    const role = document.getElementById("user-role").value;

    const userData = { username, password, role };
   const API_BASE_URL = 'http://localhost:3001'; 

const url = action === "modify"
  ? `${API_BASE_URL}/users/login`
  : `${API_BASE_URL}/users/register`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        
        if (response.ok) {
            if (action === "modify") {
                authToken = result.token;
                alert("Login successful! Token saved.");
            } else {
                alert("Registration successful!");
            }
            closeForm("user-form");
        } else {
            throw new Error(result.message || "Operation failed");
        }
    } catch (error) {
        alert("Error: " + error.message);
        console.error("Error:", error);
    }
}

//-------------------------------------------------------------------------------------

async function submitBookForm(event) {
    event.preventDefault();

    const action = document.getElementById("book-action").value;
    const id = document.getElementById("book-id").value;
    const title = document.getElementById("book-title").value;
    const author = document.getElementById("book-author").value;
    const year = document.getElementById("book-year").value;
    const stock = document.getElementById("book-stock").value;

    const bookData = {
        title,
        author,
        year: parseInt(year),
        stock: parseInt(stock)
    };

    let url = "/books";
    let method = "POST";

    if (action === "modify") {
        url = `/books/${id}`;
        method = "PUT";
    } else if (action === "delete") {
        url = `/books/${id}`;
        method = "DELETE";
    }

    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: method !== "DELETE" ? JSON.stringify(bookData) : undefined
        });

        const result = await response.json();

        if (response.ok) {
            alert("Book operation successful!");
            closeForm("book-form");
        } else {
            throw new Error(result.message || "Book operation failed");
        }
    } catch (error) {
        alert("Error: " + error.message);
        console.error("Error:", error);
    }
}



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

async function fetchAllBooks() {
    try {
        const response = await fetch("/books");
        if (!response.ok) throw new Error("Failed to fetch books");
        const books = await response.json();
        
        const booksList = document.getElementById("books-ul");
        booksList.innerHTML = books.map(book => `
            <li>
                <strong>${book.title}</strong> by ${book.author} (${book.year})
                <br>Stock: ${book.stock} | ID: ${book.id}
            </li>
        `).join("");
        
    } catch (error) {
        alert("Error: " + error.message);
        console.error("Error:", error);
    }
}