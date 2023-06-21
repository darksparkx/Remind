import axios from "axios";
import { UsersInterface } from "../data/interfaces";
import { useUserInitialState } from "../data/state";

export const Authenticate = async (
    _email: string,
    callback: (error: string | null, user: UsersInterface) => void
) => {
    const url: string = process.env.SERVER_URL as string;

    const auth = {
        method: "POST",
        url: `${url}/users/login`,
        data: {
            email: _email,
        },
        headers: { "Content-Type": "application/json" },
    };
    const create = {
        method: "POST",
        url: `${url}/users/create`,
        data: {
            email: _email,
        },
        headers: { "Content-Type": "application/json" },
    };

    // Creating a new user
    await axios(create)
        .then((response) => {
            if (response.status === 201) {
                console.log("User successfully created.");
            } else if (response.status === 200) {
                console.log("User already exists");
            } else {
                console.log(response);
            }

            // Logging In
            axios(auth).then((response) => {
                if (response.status === 200) {
                    console.log("Successfully authenticated.");
                    callback(null, response.data.user);
                } else {
                    callback("Authentication Denied", useUserInitialState.user);
                }
            });
        })
        .catch((error) => {
            console.log(error);
            callback("Server Error", useUserInitialState.user);
        });
};
