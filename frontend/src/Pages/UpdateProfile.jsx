import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../Auth/AuthProvider";
import { MessageContext } from "./Root";
import Loader from "../components/shared/Loader";

const UpdateProfile = () => {
    const axiosSecure = useAxiosSecure();

    const { user } = useContext(AuthContext);
    const { notifySuccess, notifyError } = useContext(MessageContext);
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosSecure
            .get(`/user/${user?.email}`)
            .then((res) => {
                setUserDetails(res.data[0]);
            })
            .finally(() => setLoading(false));
        
    }, []);


    const handleUpdate = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData(e.target);
        const fname = data.get("fname") || userDetails?.F_name;
        const lname = data.get("lname") || userDetails?.L_name;
        const url = data.get("url") || userDetails?.Profile_image;
        const contact = data.get("contact") || userDetails?.Contact_Cell;
        const body = {
            F_name: fname,
            L_name: lname,
            Profile_image: url,
            Contact_cell: contact,
        };
        axiosSecure
            .put(`/user/${user?.email}`, body)
            .then(() => {
                notifySuccess("Profile updated successfully");
                setLoading(false);
                window.location.reload();
            })
            .catch(() => {
                notifyError("Error updating profile");
                setLoading(false);
            });
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="lg:h-[calc(100dvh-100px)] w-full flex items-center justify-center mt-20">
            <div className="glass animate__animated animate__fadeIn  rounded-lg">
                <div className="flex lg:flex-row-reverse h-fit gap-4 flex-col text-white items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
                    <div className=" flex flex-col m-2 text-lg">
                        <div className="lg:w-72 mb-6 object-contain">
                            <img
                                className="rounded-xl "
                                src={userDetails?.Profile_image}
                                alt=""
                            />
                        </div>
                        <p className=" font-bold">
                            <span className="text-accent">Name:</span>{" "}
                            {userDetails?.F_name + " " + userDetails?.L_name}
                        </p>
                        <p className="font-bold">
                            <span className="text-accent">Email:</span>{" "}
                            {userDetails?.Email_ID}
                        </p>
                        <p className="font-bold">
                            <span className="text-accent">Contact:</span>{" "}
                            {userDetails?.Contact_Cell}
                        </p>
                    </div>
                    <div className="xl:mx-auto xl:w-full custom-shadow p-4 xl:max-w-sm 2xl:max-w-md rounded-lg border border-gray-200">
                        <div className="mb-2 flex justify-center"></div>
                        <h2 className="text-center text-2xl font-bold leading-tight text-accent">
                            Update your profile
                        </h2>

                        <form
                            className="mt-2 rounded-lg"
                            onSubmit={handleUpdate}
                        >
                            <div className="space-y-5">
                                <div>
                                    <label className="text-base font-medium text-gray-300">
                                        Update First Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder={userDetails?.F_name}
                                            type="text"
                                            name="fname"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-base font-medium text-gray-300">
                                        Update Last Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder={userDetails?.L_name}
                                            type="text"
                                            name="lname"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-base font-medium text-gray-300">
                                        Update Contact Cell
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder={
                                                userDetails?.Contact_Cell
                                            }
                                            type="text"
                                            name="contact"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label className="text-base font-medium text-gray-300">
                                            Update Photo URL
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            placeholder="New Photo URL"
                                            type="text"
                                            name="url"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="submit text-white hover:bg-black hover:bg-opacity-40 w-full"
                                        type="submit"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
