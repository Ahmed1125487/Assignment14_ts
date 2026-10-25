class User {
  private notebooks: NoteBook[] = [];

  constructor(
    public id: number,
    public name: string,
    public email: string,
    private password: string,
    protected phone: string,
    private _age: number
  ) {
    this.age = _age;
  }

  public get age(): number {
    return this._age;
  }

  public set age(value: number) {
    if (value < 18 || value > 60) {
      throw new Error("Age must be between 18 and 60");
    }
    this._age = value;
  }

  public displayInfo(): void {
    console.log(`USER DETAILS :
    ID    : ${this.id}
    NAME  : ${this.name}
    EMAIL : ${this.email}
    PHONE : ${this.phone}
    AGE   : ${this.age}
    `);
  }

  // Aggregation: the notebook is created outside and only linked to the user
  public addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
  }

  public getNotebooks(): NoteBook[] {
    return [...this.notebooks];
  }
}

// Inheritance
class Admin extends User {
  public manageNotes(notebook: NoteBook): void {
    console.log(`Admin ${this.name} is checking the notes...`);
    console.log(`Number of notes: ${notebook.count()}`);
    for (const note of notebook.getNotes()) {
      console.log(`  * ${note.title}`);
    }
  }
}

// Association: every note has an author
class Note {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public author: User
  ) {}

  public get userId(): number {
    return this.author.id;
  }

  public preview(length: number = 40): string {
    if (this.content.length <= length) {
      return this.content;
    }
    return this.content.slice(0, length) + "...";
  }
}

// Composition: the notes live inside the notebook
class NoteBook {
  private notes: Note[] = [];

  public addNote(note: Note): void {
    this.notes.push(note);
    console.log(`Note "${note.title}" has been added.`);
  }

  public removeNote(id: number): void {
    const note = this.notes.find((n) => n.id === id);
    if (!note) {
      console.log(`No note found with ID ${id}.`);
      return;
    }
    this.notes = this.notes.filter((n) => n.id !== id);
    console.log(`Note "${note.title}" has been removed.`);
  }

  public getNotes(): Note[] {
    return [...this.notes];
  }

  public count(): number {
    return this.notes.length;
  }
}

// Generics
class Storage<T> {
  private items: T[] = [];

  public addItem(item: T): void {
    this.items.push(item);
  }

  public removeItem(item: T): void {
    this.items = this.items.filter((i) => i !== item);
  }

  public getAllItems(): T[] {
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

const noteStorage = new Storage<Note>();
noteStorage.addItem(n1);
noteStorage.addItem(n2);
console.log("\nStored notes:", noteStorage.getAllItems().length);

const numberStorage = new Storage<number>();
numberStorage.addItem(7);
console.log("Stored numbers:", numberStorage.getAllItems());