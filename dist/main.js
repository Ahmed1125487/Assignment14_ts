"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    id;
    name;
    email;
    password;
    phone;
    _age;
    notebooks = [];
    constructor(id, name, email, password, phone, _age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this._age = _age;
        this.age = _age;
    }
    get age() {
        return this._age;
    }
    set age(value) {
        if (value < 18 || value > 60) {
            throw new Error("Age must be between 18 and 60");
        }
        this._age = value;
    }
    displayInfo() {
        console.log(`USER DETAILS :
    ID    : ${this.id}
    NAME  : ${this.name}
    EMAIL : ${this.email}
    PHONE : ${this.phone}
    AGE   : ${this.age}
    `);
    }
    // Aggregation: the notebook is created outside and only linked to the user
    addNotebook(notebook) {
        this.notebooks.push(notebook);
    }
    getNotebooks() {
        return [...this.notebooks];
    }
}
// Inheritance
class Admin extends User {
    manageNotes(notebook) {
        console.log(`Admin ${this.name} is checking the notes...`);
        console.log(`Number of notes: ${notebook.count()}`);
        for (const note of notebook.getNotes()) {
            console.log(`  * ${note.title}`);
        }
    }
}
// Association: every note has an author
class Note {
    id;
    title;
    content;
    author;
    constructor(id, title, content, author) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
    }
    get userId() {
        return this.author.id;
    }
    preview(length = 40) {
        if (this.content.length <= length) {
            return this.content;
        }
        return this.content.slice(0, length) + "...";
    }
}
// Composition: the notes live inside the notebook
class NoteBook {
    notes = [];
    addNote(note) {
        this.notes.push(note);
        console.log(`Note "${note.title}" has been added.`);
    }
    removeNote(id) {
        const note = this.notes.find((n) => n.id === id);
        if (!note) {
            console.log(`No note found with ID ${id}.`);
            return;
        }
        this.notes = this.notes.filter((n) => n.id !== id);
        console.log(`Note "${note.title}" has been removed.`);
    }
    getNotes() {
        return [...this.notes];
    }
    count() {
        return this.notes.length;
    }
}
// Generics
class Storage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        this.items = this.items.filter((i) => i !== item);
    }
    getAllItems() {
        return [...this.items];
    }
}
// ---------- Test ----------
const user = new User(10, "Ahmed", "ahmed@example.com", "ahmed123", "01116902048", 23);
user.displayInfo();
const admin = new Admin(5, "Admin", "admin@example.com", "admin123", "01221105407", 25);
admin.displayInfo();
const myNotebook = new NoteBook();
user.addNotebook(myNotebook);
const n1 = new Note(1, "TypeScript", "Classes, inheritance and generics are the main OOP topics in this assignment.", user);
const n2 = new Note(2, "Todo", "Finish the assignment, draw the UML diagram and review the code before the deadline.", user);
myNotebook.addNote(n1);
myNotebook.addNote(n2);
console.log("\n--- Previews ---");
console.log("Note 1:", n1.preview());
console.log("Note 2:", n2.preview(30));
console.log(`Author of "${n1.title}": ${n1.author.name} (userId ${n1.userId})`);
console.log(`\n${user.name} has ${user.getNotebooks().length} notebook(s)`);
console.log("\n--- Admin check ---");
admin.manageNotes(myNotebook);
console.log("\n--- Removing a note ---");
myNotebook.removeNote(1);
const noteStorage = new Storage();
noteStorage.addItem(n1);
noteStorage.addItem(n2);
console.log("\nStored notes:", noteStorage.getAllItems().length);
const numberStorage = new Storage();
numberStorage.addItem(7);
console.log("Stored numbers:", numberStorage.getAllItems());
//# sourceMappingURL=main.js.map