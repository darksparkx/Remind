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
                "666014915197-uulth3qvthldg1cee0t9s1u9b2khgvni.apps.googleusercontent.com",
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
        <div className=" h-screen bg-color1">
            {" "}
            <div className=" lg:w-3/4 m-auto">
                <Header /> 
                <AddNote />
                <Notes />
            </div>
        </div>
    );
};

export default App;
