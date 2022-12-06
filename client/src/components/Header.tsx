import { useRef } from "react";
import { useUserInitialState, useUserState, useState } from "../data/state";
import { motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";

const Header = () => {
    // state variables
    const { user: user, logged: logged } = useUserState((state) => state);
    const { profileDropdown: profileDropdown } = useState((state) => state);

    // animation variables
    const animationVariants = {
        open: { opacity: 1, hieght: "16rem", width: "16em" },
        closed: { opacity: 0, width: 0, hieght: 0 },
        hidden: { display: "none" },
        visible: { display: "block", y: 0 },
        sizeOpen: { fontSize: "100%" },
        sizeClose: { fontSize: ["75%", "25%", "0"] },
    };

    // handlers
    const handleSignOut = () => {
        useState.setState({ profileDropdown: false });
        setTimeout(
            () => useUserState.setState({ ...useUserInitialState }),
            200
        );
    };

    const handleProfileDropdown = () => {
        useState.setState({ profileDropdown: !profileDropdown });
        document.addEventListener("mousedown", handleClickOutside);
    };

    // close the profile dropdown
    const ref = useRef<any>(null);
    const buttonRef = useRef<any>(null);
    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && ref.current.contains(event.target)) {
        } else if (
            buttonRef.current &&
            buttonRef.current.contains(event.target)
        ) {
            document.removeEventListener("mousedown", handleClickOutside);
        } else {
            useState.setState({ profileDropdown: false });
        }
    };

    return (
        <header className="top-0 sticky flex flex-col h-14">
            {/* Main Navbar Start */}
            <div className=" z-20 h-auto flex flex-row  px-4 justify-between">
                {/* Name */}
                <h1 className=" text-4xl font-bold self-center text-color2light">
                    REMIND
                </h1>

                {/* Profile Button */}
                <motion.div
                    ref={buttonRef}
                    initial="hidden"
                    variants={animationVariants}
                    animate={logged ? "visible" : "hidden"}
                >
                    <button
                        onClick={handleProfileDropdown}
                        className="text-4xl text-center  cursor-pointer rounded bg-color2 p-2"
                    >
                        <CgProfile style={{ color: "rgb(255 250 215 )" }} />
                    </button>
                </motion.div>

                {/* Sign In Button */}
                <motion.div
                    initial="hidden"
                    variants={animationVariants}
                    animate={!logged ? "visible" : "hidden"}
                    id="signInDiv"
                    className=" my-4 "
                ></motion.div>
            </div>
            {/* Main Navbar End */}

            {/* Profile Dropdown Start */}
            <motion.div
                ref={ref}
                className="z-10 self-end p-3 pt-14  mr-4  -mt-14 bg-color2 rounded "
                initial="closed"
                variants={animationVariants}
                animate={profileDropdown ? "open" : "closed"}
                transition={{ ease: "easeInOut", duration: 0.3 }}
            >
                <motion.h2
                    initial="sizeClose"
                    variants={animationVariants}
                    animate={profileDropdown ? "sizeOpen" : "sizeClose"}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    Email:
                </motion.h2>
                <motion.h2
                    initial="sizeClose"
                    variants={animationVariants}
                    animate={profileDropdown ? "sizeOpen" : "sizeClose"}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="mb-2"
                >
                    {user.email}
                </motion.h2>
                <motion.button
                    initial="sizeClose"
                    variants={animationVariants}
                    animate={profileDropdown ? "sizeOpen" : "sizeClose"}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className=" bg-color1light rounded p-3 hover:bg-color1"
                    onClick={handleSignOut}
                >
                    Sign Out
                </motion.button>
            </motion.div>
            {/* Profile Dropdown End */}
        </header>
    );
};

export default Header;
