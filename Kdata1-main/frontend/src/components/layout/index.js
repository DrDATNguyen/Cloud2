import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { useLocation } from 'react-router-dom';

function Layout({ children }) {
    const location = useLocation();

    const isLoginPage = location.pathname === '/login';

    return (
        <div className="container">
            {/* {!isLoginPage && ( */}
            <div className="row">
                <div className="row">
                    <div className="col-3">
                        <Sidebar />

                    </div>
                    <div className="col-9">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12"><Header /></div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div style={{ padding: '5%' }} className="content">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}

export default Layout;