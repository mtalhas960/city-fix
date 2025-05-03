import { Outlet } from 'react-router-dom';

const MainLayout = () => (
    <>
        {/* Sidebar and top header will be here */}
        <Outlet />
    </>
);

export default MainLayout;
