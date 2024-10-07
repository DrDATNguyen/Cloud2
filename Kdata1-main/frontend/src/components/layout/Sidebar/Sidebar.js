// import "../../../css/sidebar.css";
import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './Sidebar.module.scss';
import { useNavigate } from 'react-router-dom';

import '../../../css/sidebar.css'

const cx = classNames.bind(styles);

const MenuItem = ({ title, to, children, isCollapsed }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        if (!children) {
            navigate(to);
        } else {
            setIsOpen(prevIsOpen => !prevIsOpen);
        }
    };

    return (
        <div className={cx('menuItem', { collapsed: isCollapsed })}>
            <div className={cx('navLink')} onClick={toggleMenu} style={{ cursor: 'pointer' }}>
                {isCollapsed ? <span>📄</span> : title}
                {children && !isCollapsed && <span>{isOpen ? '▲' : '▼'}</span>}
            </div>
            {isOpen && !isCollapsed && (
                <ul className={cx('dropdownMenu')} style={{ paddingLeft: '15px' }}>
                    {children}
                </ul>
            )}
        </div>
    );
};

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(prev => !prev);
    };

    return (
        <div className={cx('sidebar', { collapsed: isCollapsed })}>
            <button className={cx('toggleButton')} onClick={toggleSidebar}>
                {isCollapsed ? '➡️' : '⬅️'}
            </button>

            <MenuItem title="Tổng quan" to="/overview" isCollapsed={isCollapsed} />
            <MenuItem title="Cloud Hosting" isCollapsed={isCollapsed}>
                <MenuItem title="Quản lý Hosting" to="/quanlyhosting" isCollapsed={isCollapsed} />
                <MenuItem title="Đăng ký Hosting" to="/dangkyhosting" isCollapsed={isCollapsed} />
            </MenuItem>
            <MenuItem title="Tên miền" to="/tenmien" isCollapsed={isCollapsed} />
            <MenuItem title="Cloud VPS" to="/cloudvps" isCollapsed={isCollapsed} />
            <MenuItem title="Email" to="/email" isCollapsed={isCollapsed} />
            <MenuItem title="Máy chủ riêng" to="/maychurieng" isCollapsed={isCollapsed} />
            <MenuItem title="Chứng chỉ SSL" to="/chungchissl" isCollapsed={isCollapsed} />
            <MenuItem title="Chỗ đặt máy chủ" to="/chodatmachu" isCollapsed={isCollapsed} />
            <MenuItem title="Quản lý giao dịch" to="/quanlygiaodich" isCollapsed={isCollapsed} />
            <MenuItem title="Quản lý ticket" to="/quanlyticket" isCollapsed={isCollapsed} />
        </div>
    );
};

export default Sidebar;
