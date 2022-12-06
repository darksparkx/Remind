import create from "zustand";
import { persist, devtools } from "zustand/middleware";
import { UserState, AddNoteState, State, NoteState } from "./interfaces";

// Initial States
export const useUserInitialState = {
    user: { id: "0", email: "None", notes: [] },
    logged: false,
};

export const useAddNoteInitialState = {
    title: "",
    note: "",
    tags: ["All"],
    tagInput: "",
    remind: false,
    date: new Date(),
    customDate: false,
};

export const useNoteInitialState = {
    tagList: [],
    removedTags: [],
    searchBy: "Title",
};

// States

export const useState = create<State>()(
    devtools((set) => ({
        profileDropdown: false,
        newNote: false,
    }))
);

export const useUserState = create<UserState>()(
    devtools(
        persist((set) => ({
            ...useUserInitialState,
        }))
    )
);

export const useAddNoteState = create<AddNoteState>()(
    devtools((set) => ({
        ...useAddNoteInitialState,
    }))
);

export const useNoteState = create<NoteState>()(
    devtools((set) => ({
        ...useNoteInitialState,
    }))
);
