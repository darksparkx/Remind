import React, { ChangeEvent, MouseEvent, useEffect } from "react";
import { useUserState, useNoteState, useCommonState } from "../data/state";
import Note from "./Note";

const Notes = () => {
    // state variables
    const notesList = useUserState((state) => state.user?.notes);
    const tagList = useNoteState((state) => state.tagList);
    const removedTags = useNoteState((state) => state.tagList);
    const searchBy = useNoteState((state) => state.searchBy);
    const newNote = useCommonState((state) => state.newNote);
    const searchInput = useNoteState((state) => state.searchInput);

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

    // Functions
    const noResults = () => {
        if (searchBy === "Title") {
            const filteredList = notesList.filter((item) =>
                item.title
                    .toLocaleLowerCase()
                    .includes(searchInput.toLocaleLowerCase())
            );

            if (filteredList.length > 0) {
                return false;
            } else {
                return true;
            }
        } else {
        }
    };

    // const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    //     useNoteState.setState({ tagsDropdown: !tagsDropdown });
    // };

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        useNoteState.setState({ searchBy: event.target.value });
    };

    const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        useNoteState.setState({ searchInput: event.target.value });
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
        <div
            className={`${
                newNote ? "hidden" : "flex"
            }  flex-col items-center min-h-screen h-full`}
        >
            {/* Search */}
            <div className=" flex flex-col items-center bg-color2light rounded  mx-4 mb-10 text-white">
                {/* Search Type  */}
                <div className="flex flex-row lg:px-32 px-4 pt-3">
                    <p className=" mr-2 text-center flex flex-row justify-center items-center w-fit px-2 mx-4 rounded">
                        Search By:
                    </p>
                    <select
                        id="SearchBy"
                        value={searchBy}
                        onChange={handleChange}
                        className=" bg-color2light outline-none  mr-2 py-2 px-6"
                    >
                        <option
                            value="Title"
                            className="bg-white outline-none p-3 w-8"
                        >
                            Title
                        </option>
                        <option
                            value="Tags"
                            className="bg-white outline-none p-3 w-8"
                            disabled
                        >
                            Tags
                        </option>
                    </select>
                </div>

                {/* Search by Title */}
                <div
                    className={`${
                        searchBy === "Title" ? "block" : "hidden"
                    } pb-3`}
                >
                    <input
                        value={searchInput}
                        onChange={handleSearchInput}
                        placeholder="Search…"
                        className="outline-none w-fit rounded text-black mx-5 mb-2"
                    />
                </div>

                {/* Search by Tags */}
                <div
                    className={`${
                        searchBy === "Tags" ? "flex" : "hidden"
                    }  bg-color1light p-3 flex-row flex-wrap w-72 lg:w-fit `}
                >
                    {tagList.map((item, i) => {
                        return (
                            <button
                                key={i}
                                className=" bg-color2light p-1 rounded my-1 mx-2"
                            >
                                {item}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Notes */}
            <div className=" flex flex-wrap flex-row justify-center w-full">
                {searchBy === "Title" ? (
                    noResults() ? (
                        <p>No Results Found</p>
                    ) : (
                        notesList
                            .filter((item) =>
                                item.title
                                    .toLocaleLowerCase()
                                    .includes(searchInput.toLocaleLowerCase())
                            )
                            .map((item, index) => {
                                return (
                                    <Note
                                        index={index.toString()}
                                        item={item}
                                        refreshTags={refreshTags}
                                        key={index}
                                    />
                                );
                            })
                    )
                ) : (
                    <p>tags</p>
                )}
            </div>
        </div>
    );
};

export default Notes;
