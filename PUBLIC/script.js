const API_URL_USERS = '/users';
const API_URL_BOOKS = '/books';

// User Management
async function fetchUsers() {
    const res = await fetch(API_URL_USERS);
    const users = await res.json();
    console.log("Users fetched:", users); /
}

async function submitUserForm(event) {
    event.preventDefault();

    const action = document.getElementById("user-action").value;
    const id = document.getElementById("user-id").value;
    const username = document.getElementById("user-username").value;
    const password = document.getElementById("user-password").value;
    const role = document.getElementById("user-role").value;

    const userData = {
        username: username,
        password: password,
        role: role,
    };

    let url = API_URL_USERS;
    let method = "POST"; 
    if (action !== "create") {
        url = `${API_URL_USERS}/${id}`;
        method = action === "modify" ? "PUT" : "DELETE";
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error(
                `HTTP error! Status: ${response.status}`
            );
        }

        const result = await response.json();
        console.log("Success:", result);
        closeForm("user-form");
        
    } catch (error) {
        console.error("Error:", error);
    }
}

// Book Management
async function fetchBooks() {
    const res = await fetch(API_URL_BOOKS);
    const books = await res.json();
    console.log("Books fetched:", books); 
}

async function submitBookForm(event) {
    event.preventDefault();

    const action = document.getElementById("book-action").value;
    const id = document.getElementById("book-id").value;
    const title = document.getElementById("book-title").value;
    const author = document.getElementById("book-author").value;
    const year = document.getElementById("book-year").value;
    const stock = document.getElementById("book-stock").value;

    const bookData = {
        title: title,
        author: author,
        year: year,
        stock: stock
    };

    let url = API_URL_BOOKS;
    let method = "POST"; // Default for create
    if (action !== "create") {
        url = `${API_URL_BOOKS}/${id}`;
        method = action === "modify" ? "PUT" : "DELETE";
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookData),
        });

        if (!response.ok) {
            throw new Error(
                `HTTP error! Status: ${response.status}`
            );
        }

        const result = await response.json();
        console.log("Success:", result);
        closeForm("book-form");
    
    } catch (error) {
        console.error("Error:", error);
    }
}

