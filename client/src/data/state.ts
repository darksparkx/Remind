import create from "zustand";
import { persist, devtools } from "zustand/middleware";
import { UserState, AddNoteState, CommonState, NoteState } from "./interfaces";

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
    tagsDropdown: false,
    removedTags: [],
    searchBy: "Title",
    searchInput: "",
};

// States

export const useCommonState = create<CommonState>()(
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
