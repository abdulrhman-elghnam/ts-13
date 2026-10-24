// Note Management System 

class User {
    private _userNoteBooks: Array<NoteBook> = [] //Aggregation.

    public set userNoteBook(book: (NoteBook | NoteBook[])) {
        if (Array.isArray(book)) {
            this._userNoteBooks.push(...book)
        } else {
            this._userNoteBooks.push(book)
        }
    }

    public set age(value: number) {
        if (!(value >= 18 && value <= 60)) throw new Error("age must be between 18 - 60")
    }

    get age(): number {
        return this._age;
    }

    constructor(
        public id: number,
        public name: string,
        public email: string,
        protected password: string,
        protected phone: string,
        public _age: number,
    ) {
    }

    public displayInfo() {
        console.log({
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            phone: this.phone,
            age: this.age
        });
    }
}


class Admin extends User {
    constructor(
        id: number,
        name: string,
        email: string,
        password: string,
        phone: string,
        age: number
    ) {
        super(id, name, email, password, phone, age,)
    }

    mangeNote() {
    }
}
class Note {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public user: User // association
    ) {

    }
    preview() {
        console.log({
            title: this.title,
            content: this.content
        });
    }
}

class NoteBook {

    public book: Array<Note> = [];

    constructor(
        book: Note[] // composition
    ) {
        this.book = book
    }

    public addNote(note: Note) {
        this.book.push(note)
    }

    public removeNote(note: Note) {
        const index = this.book.findIndex(ele => ele === note);

        if (index !== -1) {
            this.book.splice(index, 1);
        }
    }
}



class Storage<T> {

    public Items: Array<T> = []

    constructor(public item: T) { }

    public addItem(item: T) {
        this.Items.push(item)
    }

    public removeItem(item: T) {
        const index = this.Items.findIndex(ele => ele === item);

        if (index !== -1) {
            this.Items.splice(index, 1);
        }
    }

    public getAllItem() {
        return this.Items
    }
}

const user = new User(1, "ahmed", "ahmed@mail.com", "#Pass123", "010123456", 30)
const user2 = new User(2, "mohamed", "ahmed@mail.com", "#Pass123", "010123456", 30)

const note = new Note(5, "nodejs", "nodejs is better than dotnet ;)", user)
const note2 = new Note(7, "nodejs ", "nodejs is better than FastAPI ;)", user)

const U2note = new Note(6, "nodejs 2 ", "nodejs is better than SpringBoot ;)", user2)

const book = new NoteBook([note, note2])
const book2 = new NoteBook([U2note])

user.userNoteBook = book
user2.userNoteBook = [book, book2]

const storage = new Storage<User>(user)
storage.addItem(user)
storage.addItem(user2)
console.log(storage.getAllItem());
console.log(storage.removeItem(user));
console.log(storage.getAllItem());

//
