import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../components/admin/Sidebar';
import TopBar from '../components/admin/TopBar';
import MobileSidebar from '../components/admin/MobileSidebar';

const AdminLayout = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <div className="flex overflow-hidden h-screen">
            <Sidebar />
            {mobileMenuOpen && (
                <MobileSidebar onClose={toggleMobileMenu} />
            )}
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar onMobileMenuClick={toggleMobileMenu} />
                <main className="flex-1 overflow-y-auto bg-lightGray p-4 sm:p-6 lg:p-8" id="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
