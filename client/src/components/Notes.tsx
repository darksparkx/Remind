import React, { ChangeEvent, MouseEvent, useEffect } from "react";
import { NoteInterface } from "../data/interfaces";
import { UpdateNote } from "../modules/update";
import { useUserState, useNoteState, useState } from "../data/state";
import { BsFillTrashFill } from "react-icons/bs";
const Notes = () => {
    // state variables
    const notesList = useUserState((state) => state.user?.notes);
    const user = useUserState((state) => state.user);
    const tagList = useNoteState((state) => state.tagList);
    const removedTags = useNoteState((state) => state.tagList);
    const searchBy = useNoteState((state) => state.searchBy);
    const newNote = useState((state) => state.newNote);

    useEffect(() => {
        refreshTags();
    }, []);

    const refreshTags = () => {
        let newTagsList: string[] = [];

        notesList?.map((item) => {
            for (let i = 0; i < item.tags.length; i++) {
                if (
                    !newTagsList.includes(item.tags[i]) &&
                    item.tags[i] !== "All"
                ) {
                    newTagsList.push(item.tags[i]);
                }
            }
        });
        useNoteState.setState({ tagList: newTagsList });
    };

    // handlers
    const handleClick = (event: MouseEvent<HTMLElement>) => {
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

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        useNoteState.setState({ searchBy: event.target.value });
    };

    const handleTagRemove = (event: MouseEvent<HTMLElement>) => {
        let value = `${event.currentTarget.parentElement?.innerHTML}`;
        value = value.substring(0, value.indexOf("<"));

        useNoteState.setState({
            tagList: tagList.filter((item) => {
                return item !== value;
            }),
        });

        removedTags.push(value);
    };

    return (
        <div className={`${newNote ? "hidden" : "block"}`}>
            <div className=" flex flex-wrap flex-row justify-center">
                {/* Search Type  */}
                <select id="SearchBy" value={searchBy} onChange={handleChange}>
                    <option value="Title">Title</option>
                    <option value="Tags">Tags</option>
                </select>

                {/* Search by Title */}
                <div className={`${searchBy === "Title" ? "block" : "hidden"}`}>
                    <input placeholder="Search…" />
                </div>

                {/* Search by Tags */}
                {searchBy === "Tags" && (
                    <div>
                        <div>
                           
                            <input
                                placeholder="Search…"
                            />
                        </div>
                        {tagList.map((item, i) => {
                            return (
                                <div key={i}>
                                    {item}
                                    <button onClick={handleTagRemove}>
                                        x
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Main Notes */}
                {notesList?.map((item, i) => {
                    return (
                        <div
                            id={i.toString()}
                            key={i}
                            className=" p-5 w-full md:w-1/3 lg:w-1/5 m-5 bg-color2  rounded-lg"
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
                })}
            </div>
        </div>
    );
};

export default Notes;
