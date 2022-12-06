interface NoteInterface {
    title: string;
    note: string;
    tags: string[];
    date?: Date;
}

interface UsersInterface {
    email: string;
    notes: NoteInterface[];
}

export { UsersInterface };
