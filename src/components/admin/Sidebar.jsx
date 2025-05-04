import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    RiHome5Line,
    RiFileList3Line,
    RiFileList2Line,
    RiUser2Line,
    RiUserAddLine,
    RiUserSettingsLine,
    RiSettings3Line,
    RiLogoutBoxRLine
} from '@remixicon/react';
import useAuthStore from '../../store/authStore';

const Sidebar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const { logout } = useAuthStore()


    const navLinks = [
        { path: '/admin-panel', icon: <RiHome5Line className="h-5 w-5 mr-3" />, label: 'Dashboard' },
        { path: '/admin-panel/reports', icon: <RiFileList3Line className="h-5 w-5 mr-3" />, label: 'Reports' },
        { path: '/admin-panel/reports/CX-2025-83655', icon: <RiFileList2Line className="h-5 w-5 mr-3" />, label: 'Report Detail' },
        { path: '/admin-panel/admins', icon: <RiUser2Line className="h-5 w-5 mr-3" />, label: 'Admins' },
        { path: '/admin-panel/admins/ADM-001', icon: <RiUserSettingsLine className="h-5 w-5 mr-3" />, label: 'Admin Detail' },
        { path: '/admin-panel/admins/add', icon: <RiUserAddLine className="h-5 w-5 mr-3" />, label: 'Add New Admin' },
        { path: '/admin-panel/settings', icon: <RiSettings3Line className="h-5 w-5 mr-3" />, label: 'Settings' },
    ];

    return (
        <aside className="w-58 bg-white shadow-md hidden md:block">
            <div className="h-full flex flex-col">
                {/* Logo */}
                <div className="px-6 py-4 border-b">
                    <Link to="/">
                        <img src="/logo-primary.svg" alt="CityFix Logo" className="h-10" />
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto scrollbar-hide">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${currentPath === link.path
                                    ? 'text-primary bg-primary/5'
                                    : 'text-darkGray hover:bg-lightGray'
                                }`}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Logout Button */}
                <div className="border-t p-4">
                    <Link
                        to="/login"
                        onClick={logout}
                        className="flex items-center px-4 py-3 text-darkGray hover:bg-lightGray rounded-lg font-medium transition-colors"
                    >
                        <RiLogoutBoxRLine className="h-5 w-5 mr-3" />
                        Logout
                    </Link>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
