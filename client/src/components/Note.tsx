import React, { ChangeEvent, MouseEvent, useEffect } from "react";
import { NoteInterface } from "../data/interfaces";
import { BsFillTrashFill } from "react-icons/bs";
import { useUserState, useNoteState } from "../data/state";
import { UpdateNote } from "../modules/update";
type Props = {
    index: string;
    item: NoteInterface;
    refreshTags: () => void;
};

const Note = (props: Props) => {
    // Variables
    const index = props.index;
    const item = props.item;
    const refreshTags = props.refreshTags
    const notesList = useUserState((state) => state.user?.notes);
    const user = useUserState((state) => state.user);

    // Functions
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        const index = parseInt(event.currentTarget.parentElement?.id as string);
        notesList?.splice(index, 1);

        UpdateNote(user?.email as string, notesList as NoteInterface[])
            .then((response) => {
                useUserState.setState({ user: user });
            })
            .then((response) => {
                window.location.reload();
            });

        // get the tags again
        refreshTags();
    };

    return (
        <div
            id={index}
            className=" p-5 w-full md:w-1/3 lg:w-1/3 m-5 bg-color2light  rounded-lg"
        >
            <div>
                <div className="flex flex-row justify-between mb-3">
                    <h3 className="text-2xl">
                        <strong>{item.title}</strong>
                    </h3>
                    <button
                        onClick={handleClick}
                        className=" p-2 bg-red-800 text-white rounded-md "
                    >
                        <BsFillTrashFill />
                    </button>
                </div>

                <p>{item.note}</p>
                <h4 className="mt-4">
                    <strong>Tags:</strong>
                </h4>
                <div className="flex flex-row flex-wrap">
                    {item.tags.map((item, i) => (
                        <p
                            key={i}
                            className="ml-2 mt-2 py-2 px-3 bg-color1light rounded-xl"
                        >
                            {item}
                        </p>
                    ))}
                </div>
            </div>
            <div className=" flex justify-center"></div>
        </div>
    );
};

export default Note;
