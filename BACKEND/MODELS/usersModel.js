const fs = require('fs');
const path = require('path');

const USER_DATA_FILE = path.join(__dirname, '../DATABASE/users.json');

class UserModel {
    constructor() {
        this.users = this.loadUsers();
    }

    loadUsers() {
        try {
            const data = fs.readFileSync(USER_DATA_FILE, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading users data:', error);
            return [];
        }
    }

    saveUsers() {
        try {
            fs.writeFileSync(USER_DATA_FILE, JSON.stringify(this.users, null, 2), 'utf8');
        } catch (error) {
            console.error('Error saving users data:', error);
        }
    }

    findByUsername(username) {
        return this.users.find(user => user.username.toLowerCase() === username.toLowerCase());
    }

    create(newUser) {
        newUser.id = Date.now().toString(); 
        this.users.push(newUser);
        this.saveUsers();
        return newUser;
    }
}

module.exports = new UserModel();