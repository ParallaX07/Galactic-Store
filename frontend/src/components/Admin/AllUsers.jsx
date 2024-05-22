import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        setLoading(true);
        axiosSecure
            .get("/allUsers")
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const openImage = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsImageOpen(true);
    };

    const closeImage = () => {
        setIsImageOpen(false);
    };

    return (
        <section className="px-3 pb-10 py-20 transition duration-300 glass min-h-dvh">
            {!loading && (
                <div className="overflow-x-auto  lg:mx-auto lg:max-w-6xl ">
                    <table className="table-auto glass w-full mt-8  rounded-lg border-2 border-gray-100 ">
                        <thead className="hidden lg:table-header-group  rounded-lg">
                            <tr className="text-base font-semibold text-left border-b-2 border-gray-100 text-gray-100">
                                <th className="p-2">Name</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Contact Cell</th>
                                <th className="p-2">Address</th>
                                <th className="p-2">User Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user?.Email_ID}
                                    className="block lg:table-row border-b-2 border-gray-100 text-gray-100 py-4"
                                >
                                    <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label=""
                                >
                                    <img
                                        src={user?.Profile_image || "https://i.ibb.co/hYbbGyR/6596121-modified.png"}
                                        alt={user?.Name}
                                        className="lg:w-20 lg:h-20 object-cover rounded-lg cursor-pointer"
                                        onClick={() =>
                                            openImage(user?.Profile_image || "https://i.ibb.co/hYbbGyR/6596121-modified.png")
                                        }
                                    />
                                </td>
                                    <td
                                        className="p-2 block lg:table-cell relative lg:static"
                                        data-label="Name"
                                    >
                                        {user?.F_Name + " " + user?.L_Name}
                                    </td>
                                    <td
                                        className="p-2 block lg:table-cell relative lg:static"
                                        data-label="Email"
                                    >
                                        {user?.Email_ID}
                                    </td>
                                    <td
                                        className="p-2 block lg:table-cell relative lg:static"
                                        data-label="Contact No."
                                    >
                                        {user?.Contact_Cell}
                                    </td>
                                    <td
                                        className="p-2 block lg:table-cell relative lg:static"
                                        data-label="Total Price"
                                    >
                                        {user?.Address}
                                    </td>
                                    <td
                                        className="p-2 block lg:table-cell relative lg:static"
                                        data-label="User Type"
                                    >
                                        {user?.User_Type}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {isImageOpen && (
                <div
                    className="fixed top-0 left-0 w-dvw h-dvh flex items-center justify-center z-50"
                    style={{
                        background: "rgba(0, 0, 0, 0.8)",
                    }}
                    onClick={closeImage}
                >
                    <img
                        src={selectedImage}
                        alt="Full screen"
                        className="max-h-full max-w-full"
                    />
                </div>
            )}
        </section>
    );
};

export default AllUsers;
