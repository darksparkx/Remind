import React, { MouseEvent, useEffect } from "react";
import { NoteInterface } from "../data/interfaces";
import { UpdateNote } from "../modules/update";
import { useUserState, useNoteState } from "../data/state";

import {
    NotesDiv,
    Search,
    SearchIconWrapper,
    StyledInputBase,
} from "../../../style/Notes";
const Notes = () => {
    const notesList = useUserState((state) => state.user?.notes);
    const user = useUserState((state) => state.user);
    const tagList = useNoteState((state) => state.tagList);
    const removedTags = useNoteState((state) => state.tagList);
    const searchBy = useNoteState((state) => state.searchBy);
    useEffect(() => {
        refreshTags();
    }, []);

    const refreshTags = () => {
        console.log("yp");

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

    // const handleChange = (event: SelectChangeEvent) => {
    //     useNoteState.setState({ searchBy: event.target.value });
    // };

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
        <NotesDiv>
            {/* <Typography>Search By: </Typography>
            <Select id="SearchBy" value={searchBy} onChange={handleChange}>
                <MenuItem value="Title">Title</MenuItem>
                <MenuItem value="Tags">Tags</MenuItem>
            </Select>
            {searchBy === "Title" && (
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ "aria-label": "search" }}
                    />{" "}
                </Search>
            )}
            {searchBy === "Tags" && (
                <Box>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />{" "}
                    </Search>
                    {tagList.map((item, i) => {
                        return (
                            <Paper key={i}>
                                {item}
                                <Button onClick={handleTagRemove}>
                                    <Clear />
                                </Button>
                            </Paper>
                        );
                    })}
                </Box>
            )}

            {notesList?.map((item, i) => {
                return (
                    <Card id={i.toString()} key={i}>
                        <CardContent>
                            <Typography variant="h4">{item.title}</Typography>
                            <Typography>{item.note}</Typography>
                            <Typography>
                                <strong>Tags:</strong>
                            </Typography>
                            <Box>
                                {item.tags.map((item, i) => (
                                    <Paper key={i} elevation={3}>
                                        {item}
                                    </Paper>
                                ))}
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Button onClick={handleClick}>remove</Button>
                        </CardActions>
                    </Card>
                );
            })} */}
        </NotesDiv>
    );
};

export default Notes;
