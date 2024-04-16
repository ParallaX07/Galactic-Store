import { Outlet } from "react-router-dom";
import AdminNav from "../components/Admin/AdminNav";
import axios from "axios";
import { useEffect } from "react";

const AdminPage = () => {
    
    // tests the connection to the backend
    useEffect(() => {
        axios
            .get("http://localhost:8801/users")
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className="text-white">
            <AdminNav />
            <Outlet />
        </div>
    );
};

export default AdminPage;
