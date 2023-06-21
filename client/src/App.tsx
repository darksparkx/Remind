import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import AddNote from "./components/AddNote";
import Header from "./components/Header";
import Notes from "./components/Notes";
import { Authenticate } from "./modules/auth";
import { useUserState } from "./data/state";

const App = () => {
    const user = useUserState((state) => state.user);
    const logged = useUserState((state) => state.logged);

    function handleCallbackResponse(response: any) {
        var _userObject = jwt_decode(response.credential) as any;

        Authenticate(_userObject.email, (error, _user) => {
            if (error) {
                console.log(error);
            } else {
                useUserState.setState({
                    user: _user,
                    logged: true,
                });
            }
        });
    }

    useEffect(() => {
        // global google
        google.accounts.id.initialize({
            client_id:
                "831138437821-bl1giqg7974q4fh20qr0kjt5b2vk5je8.apps.googleusercontent.com",
            callback: handleCallbackResponse,
        });

        const docGetId = document.getElementById("signInDiv") as HTMLElement;

        google.accounts.id.renderButton(docGetId, {
            theme: "outline",
            size: "medium",
            type: "standard",
        });

        {
            !logged && google.accounts.id.prompt();
        }
    }, []);

    return (
        <div className=" h-full bg-color1">
            {" "}
            <div className=" lg:w-3/4 m-auto">
                <Header />
                <div className={`${logged ? "block" : "hidden"}`}>
                    <AddNote />
                    <Notes />
                </div>
                <div
                    className={`${
                        logged ? "hidden" : "block"
                    } h-screen bg-color1`}
                >
                    <p className="text-center mt-36 font-semibold text-lg">
                        Please Sign in to continue
                    </p>
                </div>
            </div>
        </div>
    );
};

export default App;
