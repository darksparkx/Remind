import { MouseEvent, KeyboardEvent, ChangeEvent, FormEvent } from "react";
import {
    useAddNoteInitialState,
    useAddNoteState,
    useState,
    useUserState,
} from "../data/state";
import { NoteInterface } from "../data/interfaces";
import DatePicker from "./Date";
import { UpdateNote } from "../modules/update";
import { GrClose } from "react-icons/gr";
import { motion } from "framer-motion";

const AddNote = () => {
    // state variables
    const {
        title: title,
        note: note,
        tags: tags,
        tagInput: tagInput,
        remind: remind,
        date: date,
    } = useAddNoteState((state) => state);
    const { logged: logged, user: user } = useUserState((state) => state);
    const newNote = useState((state) => state.newNote);

    // animation variants
    const animationVariants = {
        open: {  opacity: 1, height: "50%" },
        closed: {  opacity: 0, height: 0 },
    };
    // handlers
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        switch (event.target.id) {
            case "Title":
                useAddNoteState.setState({ title: event.target.value });
                break;
            case "Note":
                useAddNoteState.setState({ note: event.target.value });
                break;
            case "Tags":
                useAddNoteState.setState({ tagInput: event.target.value });
                break;
            case "remindCheckbox":
                useAddNoteState.setState({ remind: !remind });
                break;
        }
    };

    const handleNote = (event: ChangeEvent<HTMLTextAreaElement>) => {
        useAddNoteState.setState({ note: event.target.value });
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        const key = event.key;

        const trimmedInput = tagInput.trim();

        // Unique Entry
        if (
            key === "Enter" &&
            trimmedInput.length &&
            !tags.includes(trimmedInput)
        ) {
            // event.preventDefault();
            useAddNoteState.setState({
                tags: [...tags, trimmedInput],
                tagInput: "",
            });
        }
        // Duplicate Entry
        else if (
            key === "Enter" &&
            trimmedInput.length &&
            tags.includes(trimmedInput)
        ) {
            console.log("Duplicate entry");
        }
    };

    const handleTagRemove = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        let value = `${event.currentTarget.parentElement?.innerHTML}`;

        value = value.substring(0, value.indexOf("<"));

        if (value !== "All") {
            useAddNoteState.setState({
                tags: tags.filter((item) => {
                    return item !== value;
                }),
            });
        } else if (value === "All") {
            console.log("all aaya");
        }
    };

    const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const newNote: NoteInterface = {
            title: title,
            note: note,
            tags: tags,
        };
        if (remind) {
            newNote.date = date;
        }

        if (logged) {
            if (title !== "" || note !== "") {
                user?.notes.push(newNote);

                UpdateNote(
                    user?.email as string,
                    user?.notes as NoteInterface[]
                )
                    .then((response) => {
                        useAddNoteState.setState(useAddNoteInitialState);
                        useUserState.setState({ user: user });
                    })
                    .then((response) => {
                        window.location.reload();
                    });
            } else {
                console.log("fields not filled");
            }
        } else {
            console.log("not logged");
        }
    };

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        useState.setState({ newNote: !newNote });
    };

    return (
        <div className="min-w-screen p-10 justify-center flex flex-col ">
            {logged && (
                <button
                    id="newNote"
                    onClick={handleClick}
                    className="m-auto w-fit bg-color2 p-2 rounded"
                >
                    New Note
                </button>
            )}

            {/* Add Note Form Start */}

            <motion.div
                initial="closed"
                variants={animationVariants}
                animate={newNote ? "open" : "closed"}
                transition={{ ease: "easeInOut", duration: 1 }}
                className=" flex flex-col justify-center m-auto bg-color2 p-10 space-y-5 rounded w-10/12 md:w-6/12 xl:w-5/12"
            >
                <button className="self-end" onClick={handleClick}>
                    <GrClose />
                </button>
                {/* Title*/}
                <div className="flex flex-col">
                    <label className="addNoteLabel">Title: </label>
                    <input
                        id="Title"
                        onChange={handleChange}
                        value={title}
                        type="text"
                        placeholder="Title"
                        className="addNoteInput"
                    />
                </div>

                {/* Note */}
                <div className="flex flex-col">
                    <label className="addNoteLabel">Note: </label>
                    <textarea
                        id="Note"
                        onChange={handleNote}
                        value={note}
                        placeholder="Add a Note..."
                        className="addNoteInput overflow-hidden resize-y "
                    />
                </div>

                {/* Tag Input*/}
                <div className="flex flex-col">
                    <label className="addNoteLabel">Tags: </label>
                    <input
                        id="Tags"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        value={tagInput}
                        type="text"
                        placeholder="Add tags..."
                        className="addNoteInput"
                    />
                </div>

                {/* Entered Tags */}
                <div className=" flex flex-row  flex-wrap bg-color2light p-2 rounded">
                    {tags.map((tag, i) => (
                        <div
                            key={i}
                            className=" flex flex-row  py-1 px-2 bg-color1light rounded-lg mr-3 mt-1.5 mb-1.5"
                        >
                            {tag}

                            <button
                                className=" font-semibold font-mono h-6 w-6  rounded-full  hover:bg-color1 ml-1"
                                onClick={(e) => handleTagRemove(e)}
                            >
                                x
                            </button>
                        </div>
                    ))}
                </div>

                {/* Calendar */}
                <div className="hidden">
                    <h3>
                        Do you want set a timed reminder?{" "}
                        <input
                            type="checkbox"
                            id="remindCheckbox"
                            onChange={handleChange}
                        />
                    </h3>

                    {remind && <DatePicker />}
                </div>

                {/* Submit Button */}
                <button
                    id="addNote"
                    onClick={handleSubmit}
                    className="bg-color1light p-2 rounded w-fit self-center hover:bg-color1 "
                >
                    Add Note
                </button>
            </motion.div>

            {/* Add Note Form End */}
        </div>
    );
};

export default AddNote;
