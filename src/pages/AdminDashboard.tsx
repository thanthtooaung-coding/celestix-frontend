import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Sidebar } from "@/components/navigation/Sidebar";

export const AdminDashboard = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState("dashboard"); // For highlighting active link

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    }

    const handlePageChange = (page: string) => {
        if (page === "logout") {
            handleLogout();
        } else {
            setCurrentPage(page);
            navigate(`/admin/${page}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-primary">
            <div className="flex">
                <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
                <div className="flex-1 flex flex-col">
                    <main className="flex-1 p-6 overflow-auto">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};
