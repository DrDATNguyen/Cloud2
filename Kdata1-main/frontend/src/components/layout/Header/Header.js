import "../../../css/Header.css"
import React, { useState } from 'react';

const Header = () => {
    // State to handle language dropdown visibility
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);

    // Toggle language dropdown
    const toggleLangDropdown = () => {
        setLangDropdownOpen(!langDropdownOpen);
    };

    return (
        <header className="app-header navbar">
            <button
                className="navbar-toggler sidebar-toggler d-lg-none mr-auto"
                type="button"
                aria-label="Toggle sidebar"
                onClick={() => console.log('Sidebar toggled for small screens')}
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <a className="navbar-brand" href="https://cloud.kdata.vn/user">
                <img
                    className="navbar-brand-full logo-header"
                    src="https://cloud.kdata.vn/images/logo.png"
                    alt="KDATA CLOUD"
                />
            </a>

            <button
                className="navbar-toggler sidebar-toggler d-md-down-none"
                type="button"
                aria-label="Toggle large sidebar"
                onClick={() => console.log('Sidebar toggled for large screens')}
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* Language Dropdown */}
            <ul className="nav navbar-nav nav-lang">
                <li className="nav-item dropdown">
                    <div
                        className="dropdown-toggle"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded={langDropdownOpen}
                        onClick={toggleLangDropdown}
                    >
                        <img
                            src="data:image/png;base64,iVBOR..."
                            alt="VIE"
                        />
                        <span className="lang-title-current">VIE</span>
                        <span className="icon-down">
                            <i className="fa fa-caret-down" aria-hidden="true"></i>
                        </span>
                    </div>

                    {langDropdownOpen && (
                        <div className="dropdown-menu dropdown-menu-left">
                            <a className="dropdown-item" href="https://cloud.kdata.vn/lang/vi">
                                <img
                                    src="data:image/png;base64,iVBOR..."
                                    alt="VIE"
                                />
                                VIE
                            </a>
                            <a className="dropdown-item" href="https://cloud.kdata.vn/lang/en">
                                <img
                                    src="data:image/png;base64,iVBOR..."
                                    alt="ENG"
                                />
                                ENG
                            </a>
                            <a className="dropdown-item" href="https://cloud.kdata.vn/lang/ch">
                                <img src="https://cloud.kdata.vn/images/icon-head/logo-cn.png" alt="CHI" />
                                CHI
                            </a>
                        </div>
                    )}
                </li>
            </ul>

            {/* Right-side menu */}
            <ul className="nav navbar-nav nav-right ml-auto">
                <li className="nav-item dropdown nav-create">
                    <a
                        className="head-create"
                        href="https://cloud.kdata.vn/user/support/create"
                        style={{ textDecoration: 'none' }}
                    >
                        <span className="text-create">
                            <i className="fa fa-external-link"></i> Tạo ticket
                        </span>
                    </a>
                </li>

                <li className="nav-item dropdown nav-create">
                    <div
                        className="head-create"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                        onClick={() => console.log('Dropdown toggled')}
                    >
                        <span className="text-create">
                            Khởi tạo <i className="fa fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </div>
                </li>
            </ul>
        </header>
    );
};

export default Header;

