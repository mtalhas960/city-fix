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
    RiCloseLine,
    RiLogoutBoxRLine
} from '@remixicon/react';
import useAuthStore from '../../store/authStore';

const MobileSidebar = ({ onClose }) => {
    const { logout } = useAuthStore()
    const location = useLocation();
    const currentPath = location.pathname;

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
        <div className="fixed inset-0 z-50 bg-darkGray/50 md:hidden">
            <div className="bg-white w-64 h-full shadow-lg z-50 transform transition-transform">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <Link to="/">
                        <img src="/logo-primary.svg" alt="CityFix Logo" className="h-8" />
                    </Link>
                    <button onClick={onClose}>
                        <RiCloseLine className="h-6 w-6 text-darkGray" />
                    </button>
                </div>
                <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto scrollbar-hide">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={onClose}
                            className={`nav-link flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${currentPath === link.path
                                ? 'text-primary bg-primary/5'
                                : 'text-darkGray hover:bg-lightGray'
                                }`}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        to="/login"
                        onClick={logout}
                        className="flex items-center px-4 py-3 text-darkGray hover:bg-lightGray rounded-lg font-medium transition-colors"
                    >
                        <RiLogoutBoxRLine className="h-5 w-5 mr-3" />
                        Logout
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default MobileSidebar;
