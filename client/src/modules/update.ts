import axios from "axios";
import { NoteInterface, UsersInterface } from "../data/interfaces";

export const UpdateNote = async (_email: string, _notes: NoteInterface[]) => {
    const url: string = process.env.REACT_APP_SERVER_URL as string;


    const update = {
        method: "POST",
        url: `${url}/users/update`,
        data: {
            email: _email,
            notes: _notes,
        },
        headers: { "Content-Type": "application/json" },
    };

    await axios(update)
        .then((response) => {
            if (response.status === 200) {
                console.log("User Updated");
            } else {
                console.log(response);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};
