// --- Configuración global ---
const API_BASE_URL = 'http://localhost:3001';
let authToken = localStorage.getItem('token') || null;

// --- Autenticación ---
function updateAuthStatus() {
  const authStatus = document.getElementById('auth-status');
  if (authToken) {
    authStatus.innerHTML = `
      <p>Welcome! You are logged in</p>
      <button onclick="logout()">Logout</button>
    `;
  } else {
    authStatus.innerHTML = `
      <p>You are not logged in</p>
      <button onclick="showLoginForm()">Login</button>
    `;
  }
}

function logout() {
  authToken = null;
  localStorage.removeItem('token');
  updateAuthStatus();
  alert('Logged out successfully');
}

function showLoginForm() {
  closeForm('user-form');
  closeForm('book-form');
  document.getElementById('login-form').style.display = 'block';
}

function closeForm(formId) {
  document.getElementById(formId).style.display = 'none';
}

function checkAuthThen(callback, ...args) {
  if (!authToken) {
    alert('Please login first');
    showLoginForm();
  } else {
    window[callback](...args);
  }
}

// --- Login ---
async function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (!response.ok || !data.token) throw new Error(data.message || 'Login failed');

    authToken = data.token;
    localStorage.setItem('token', authToken);
    updateAuthStatus();
    closeForm('login-form');
    alert('Login successful!');
  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed. Try again.');
  }
}

// --- Renderizado en DOM ---
function renderUsuariosEnDOM(usuarios) {
  const container = document.getElementById('usuarios-lista');
  container.innerHTML = usuarios.map(user => `
    <div class="user-item">
      <p><strong>ID:</strong> ${user.id}</p>
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Role:</strong> ${user.role}</p>
    </div>
  `).join('');
}

function renderLibrosEnDOM(libros) {
  const container = document.getElementById('libros-lista');
  container.innerHTML = libros.map(book => `
    <div class="book-item">
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>ID:</strong> ${book.id}</p>
      <p><strong>Year:</strong> ${book.year}</p>
      <p><strong>Stock:</strong> ${book.stock}</p>
    </div>
  `).join('');
}

// --- Usuarios ---
function openUserForm() {
  document.getElementById("user-form").style.display = "block";
}

async function fetchAllUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: { "Authorization": `Bearer ${authToken}` }
    });

    const users = await response.json();
    if (!response.ok) throw new Error('Failed to fetch users');

    renderUsuariosEnDOM(users);
    alert(`Found ${users.length} users`);
  } catch (error) {
    console.error("Error fetching users:", error);
    alert('Error fetching users');
  }
}

async function submitUserForm(event) {
  event.preventDefault();

  const username = document.getElementById("user-username").value;
  const password = document.getElementById("user-password").value;
  const role = document.getElementById("user-role").value;

  const userData = { username, password, role };
  const url = `${API_BASE_URL}/users/register`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify(userData)
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || `HTTP error! Status: ${response.status}`);

    alert("User created successfully!");
    closeForm("user-form");
    fetchAllUsers();
  } catch (error) {
    console.error("User registration error:", error);
    alert(`Error: ${error.message}`);
  }
}

// --- Libros ---
function openBookForm(action) {
  document.getElementById("book-action").value = action;
  document.getElementById("book-form").style.display = "block";
  document.getElementById("book-id").style.display = action !== "create" ? "block" : "none";
}

async function fetchAllBooks() {
  try {
    const response = await fetch(`${API_BASE_URL}/books`);
    const books = await response.json();
    if (!response.ok) throw new Error('Failed to fetch books');

    renderLibrosEnDOM(books);
    alert(`Found ${books.length} books`);
  } catch (error) {
    console.error("Error fetching books:", error);
    alert('Error fetching books');
  }
}

async function submitBookForm(event) {
  event.preventDefault();

  const action = document.getElementById("book-action").value;
  const id = document.getElementById("book-id").value;
  const title = document.getElementById("book-title").value;
  const author = document.getElementById("book-author").value;
  const year = document.getElementById("book-year").value;
  const stock = document.getElementById("book-stock").value;

  const bookData = { title, author, year, stock };

  let url = `${API_BASE_URL}/books`;
  let method = "POST";

  if (action !== "create") {
    url = `${API_BASE_URL}/books/${id}`;
    method = action === "modify" ? "PUT" : "DELETE";
  }

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: method === "DELETE" ? null : JSON.stringify(bookData)
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || `HTTP error! Status: ${response.status}`);

    alert(action === "create" ? "Book added successfully!" :
          action === "modify" ? "Book updated successfully!" :
          "Book deleted successfully!");
    closeForm("book-form");
    fetchAllBooks();
  } catch (error) {
    console.error("Book form error:", error);
    alert(`Error: ${error.message}`);
  }
}

// --- Inicialización ---
updateAuthStatus();