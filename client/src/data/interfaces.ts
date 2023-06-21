export interface AddNoteState {
    title: string;
    note: string;
    tags: string[];
    tagInput: string;
    remind: boolean;
    date: Date;
    customDate: boolean;
}

export interface CommonState {
    profileDropdown: boolean;
    newNote: boolean;
}

export interface NoteState {
    tagList: string[];
    tagsDropdown: boolean;
    removedTags: string[];
    searchBy: string;
    searchInput: string;

}

export interface UserState {
    user: UsersInterface;
    logged: boolean;
}

export interface NoteInterface {
    title: string;
    note: string;
    tags: string[];
    date?: Date;
}
export interface UsersInterface {
    id: string;
    email: string;
    notes: NoteInterface[];
}
