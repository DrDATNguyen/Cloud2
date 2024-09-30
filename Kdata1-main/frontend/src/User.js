import React,{useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const DashboardHeader = () => {
    return (
      <div className="for-home-page dashboard-user">
        <section className="content">
          <header>
            <section className="header-top" id="menuscroll">
              <div className="container">
                <div className="main-header-top">
                  <div className="row">
                    <div className="col-md-1">
                      <div className="logo">
                        <a href="https://kdata.vn">
                          <img
                            src="https://kdata.vn/kdata/images/icon/logo-KDATA-vector.svg"
                            alt="KDATA"
                            title="KDATA"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-8">
                      <div className="row" style={{ margin: 0 }}>
                        <div className="col-md-3 dpnone">
                          <div className="sale">
                            <img src="https://kdata.vn/kdata/images/icon/icon-hot-khuyen-mai.png" alt="Sale" />
                            <a href="https://kdata.vn/promotions" target="_blank" rel="nofollow">
                              KHUYẾN MÃI
                            </a>
                          </div>
                        </div>
                        <div className="col-md-4 pdnone" style={{ display: 'flex' }}>
                          <div className="signin menu-lv1">
                            <img src="https://kdata.vn/kdata/images/icon/dashboar.svg" width="20px" alt="Dashboard" />
                            <a href="https://kdata.vn/user/dashboard" rel="nofollow">
                              Dashboard
                            </a>
                          </div>
                          <div className="signin menu-lv1">
                            <img src="https://kdata.vn/kdata/images/icon/logout.svg" width="20px" alt="Log out" />
                            <a href="https://kdata.vn/user/logout" rel="nofollow">
                              Đăng xuất
                            </a>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="row" style={{ textAlign: 'center' }}>
                            <div className="col-md-4">
                              <div className="dropdown">
                                <button
                                  className="btn dropdown-toggle"
                                  type="button"
                                  data-toggle="dropdown"
                                  style={{ width: '80px', color: '#040404' }}
                                >
                                  <img
                                    src="https://kdata.vn/kdata/images/icon/icon-vietnam.png"
                                    alt="Vietnamese Flag"
                                  />{' '}
                                  vi
                                  <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu">
                                  <li>
                                    <a href="https://kdata.vn">
                                      <img
                                        src="https://kdata.vn/kdata/images/icon/icon-vietnam.png"
                                        alt="Vietnam"
                                      />{' '}
                                      Vi
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-md-4" style={{ borderRight: '2px solid #ff3900' }}>
                              <div className="menu-lv1" style={{ color: '#0042a1' }}>
                                SỐ DƯ <br />
                                <strong>0 đ</strong>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="menu-lv1" style={{ color: '#f86c6b' }}>
                                NỢ <br />
                                <strong>0 đ</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </header>
        </section>
      </div>
    );
};

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isManageActive, setIsManageActive] = useState(false);
  const [isRegisterActive, setIsRegisterActive] = useState(false);
    return (
      <div className="sidebar">
        <div className="sidebar-wrapper">
          <ul className="nav scroll-container">
            <li>
              <a className="link" href="https://kdata.vn/user/dashboard">
                <span>
                  <img
                    src="https://kdata.vn/kdata/images/icon/main.png"
                    alt="KDATA"
                    title="KDATA"
                  />
                </span>
                <p>Tổng quan</p>
              </a>
            </li>
            <li className="nav-item dropdown active">
              <a className="dropdown-btn" role="button" onClick={() => setIsActive(!isActive)}>
                <span>
                  <img
                    src="https://kdata.vn/kdata/images/icon/cloud.png"
                    alt="KDATA"
                    title="KDATA"
                  />
                </span>
                <p>Cloud Hosting</p>
                <i className="fas fa-chevron-down down" aria-hidden="true"></i>
              </a>
              <div className={`dropdown-container ${isActive ? 'active' : ''}`}>
          <a className={`nav-link ${isManageActive ? 'active' : ''}`} href="/user/hosting">Quản lý Hosting</a>
          <a className={`nav-link ${isRegisterActive ? 'active' : ''}`} href="/user/create/hosting">Đăng ký Hosting</a>
        </div>
            </li>
            <li className="slider" style={{ left: '1920px' }}></li>
          </ul>
        </div>
  
        <div className="sidebar-wrapper-m sidebar-wrapper">
          <button id="left-button" className="btn--link disable">
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="" fill="#030D45"></path>
            </svg>
          </button>
          <ul className="nav scroll-container scroll-container-m" id="myTab">
            <li>
              <a className="link" href="https://kdata.vn/user/dashboard">
                <i className="fas fa-home" aria-hidden="true"></i>
                <p>Tổng quan</p>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="dropdown-btn-m" id="menu-item-1">Danh sách dịch vụ
                <i className="fas fa-list-ul" aria-hidden="true"></i>
                <i className="fa fa-sort-desc" aria-hidden="true"></i>
              </a>
            </li>
            <div aria-labelledby="menu-item-1" className="dropdown-container">
              <a className="nav-link" href="https://kdata.vn/user/domain">Tên miền</a>
              <a className="nav-link" href="https://kdata.vn/user/hosting">Hosting</a>
              <a className="nav-link" href="https://kdata.vn/user/vps">VPS</a>
              <a className="nav-link" href="https://kdata.vn/user/email-business">Email doanh nghiệp</a>
              <a className="nav-link" href="https://kdata.vn/user/ssl">SSL</a>
              <a className="nav-link" href="https://kdata.vn/user/dedicated-server">Máy chủ riêng</a>
            </div>
            <li className="nav-item dropdown">
              <a className="dropdown-btn-m" id="menu-item-2">Quản lý giao dịch
                <i className="fas fa-file-invoice-dollar" aria-hidden="true"></i>
                <i className="fa fa-sort-desc" aria-hidden="true"></i>
              </a>
            </li>
            <div aria-labelledby="menu-item-2" className="dropdown-container">
              <a className="nav-link" href="https://kdata.vn/user/billing">Nạp tiền</a>
              <a className="nav-link" href="https://kdata.vn/user/billing/statistic">Hóa đơn</a>
              <a className="nav-link" href="https://kdata.vn/user/billing/recharge-history">Lịch sử nạp tiền</a>
              <a className="nav-link" href="https://kdata.vn/user/billing/payment-history">Lịch sử thanh toán</a>
            </div>
            <li className="nav-item dropdown">
              <a className="dropdown-btn-m" id="menu-item-3">Quản lý ticket
                <i className="fas fa-ticket-alt" aria-hidden="true"></i>
                <i className="fa fa-sort-desc" aria-hidden="true"></i>
              </a>
            </li>
            <div aria-labelledby="menu-item-3" className="dropdown-container">
              <a className="nav-link" href="https://kdata.vn/user/tickets">Danh sách ticket</a>
              <a className="nav-link" href="https://kdata.vn/user/tickets/add">Tạo ticket</a>
            </div>
            <li className="nav-item dropdown">
              <a className="dropdown-btn-m" id="menu-item-4">Affiliate
                <i className="fas fa-wallet" aria-hidden="true"></i>
                <i className="fa fa-sort-desc" aria-hidden="true"></i>
              </a>
            </li>
            <div aria-labelledby="menu-item-4" className="dropdown-container">
              <a className="nav-link" href="https://kdata.vn/user/affiliates">Phương thức chia sẻ</a>
              <a className="nav-link" href="https://kdata.vn/user/affiliates/clicks">Thống kê lượt click</a>
              <a className="nav-link" href="https://kdata.vn/user/affiliates/revenue">Thống kê doanh thu</a>
              <a className="nav-link" href="https://kdata.vn/user/affiliates/withdrawal">Thống kê rút tiền</a>
            </div>
            <li className="nav-item dropdown">
              <a className="dropdown-btn-m" id="menu-item-5">Thông tin cá nhân
                <i className="fas fa-id-card" aria-hidden="true"></i>
                <i className="fa fa-sort-desc" aria-hidden="true"></i>
              </a>
            </li>
            <div aria-labelledby="menu-item-5" className="dropdown-container">
              <a className="nav-link" href="https://kdata.vn/user/info">Thông tin tài khoản</a>
              <a className="nav-link" href="https://kdata.vn/user/info/contact">Thông tin liên hệ</a>
              <a className="nav-link" href="https://kdata.vn/user/info/bank">Thông tin ngân hàng</a>
              <a className="nav-link" href="https://kdata.vn/user/info/points">Điểm tích luỹ</a>
            </div>
            <li className="slider" style={{ left: '1920px' }}></li>
          </ul>
          <button id="right-button" className="btn--link">
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M" fill="#030D45"></path>
            </svg>
          </button>
        </div>
      </div>
    );
  };

  
const User = () => {
    return (
        <div>
          <DashboardHeader />
            <Sidebar />
        </div>
    );
};

export { User,DashboardHeader};

