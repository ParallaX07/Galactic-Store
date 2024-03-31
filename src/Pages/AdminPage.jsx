import { Outlet } from "react-router-dom";
import AdminNav from "../components/Admin/AdminNav";


const AdminPage = () => {
    return (
        <div className="text-white">
            <AdminNav />
            <Outlet />
        </div>
    );
};

export default AdminPage;