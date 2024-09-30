// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import RegisterForm from './Login';
// import './css/Dashboard.css';
// import PropTypes from 'prop-types';

// const DashboardUser = () => {
//   return (
//     <div className="for-home-page dashboard-user">
//       <section className="content">
//         <header>
//           <section className="header-top" id="menuscroll">
//             <div className="container">
//               <div className="main-header-top">
//                 <div className="row">
//                   <div className="col-md-1">
//                     <div className="logo">
//                       <a href="https://kdata.vn">
//                         <img
//                           src="https://kdata.vn/kdata/images/icon/logo-KDATA-vector.svg"
//                           alt="KDATA"
//                           title="KDATA"
//                         />
//                       </a>
//                     </div>
//                   </div>
//                   <div className="col-md-3"></div>
//                   <div className="col-md-8">
//                     <div className="row" style={{ margin: 0 }}>
//                       <div className="col-md-3 dpnone">
//                         <div className="sale">
//                           <img
//                             src="https://kdata.vn/kdata/images/icon/icon-hot-khuyen-mai.png"
//                             alt="Khuyến mãi"
//                           />
//                           <a
//                             href="https://kdata.vn/promotions"
//                             target="_blank"
//                             rel="nofollow"
//                           >
//                             KHUYẾN MÃI
//                           </a>
//                         </div>
//                       </div>
//                       <div className="col-md-4 pdnone" style={{ display: 'flex' }}>
//                         <div className="signin menu-lv1">
//                           <img
//                             src="https://kdata.vn/kdata/images/icon/dashboar.svg"
//                             width="20px"
//                             alt="Dashboard"
//                           />
//                           <a
//                             itemProp="url"
//                             href="https://kdata.vn/user/dashboard"
//                             rel="nofollow"
//                           >
//                             Dashboard
//                           </a>
//                         </div>
//                         <div className="signin menu-lv1">
//                           <img
//                             src="https://kdata.vn/kdata/images/icon/logout.svg"
//                             width="20px"
//                             alt="Log out"
//                           />
//                           <Link to="/Login" rel="nofollow">Đăng xuất</Link>
//                         </div>
//                       </div>
//                       <div className="col-md-5">
//                         <div className="row" style={{ textAlign: 'center' }}>
//                           <div className="col-md-4">
//                             <div className="dropdown">
//                               <button
//                                 className="btn dropdown-toggle"
//                                 type="button"
//                                 data-toggle="dropdown"
//                                 style={{ width: '80px', color: '#040404' }}
//                               >
//                                 <img
//                                   src="https://kdata.vn/kdata/images/icon/icon-vietnam.png"
//                                   alt="Tiếng Việt"
//                                 />{' '}
//                                 vi
//                                 <span className="caret "></span>
//                               </button>
//                               <ul className="dropdown-menu">
//                                 <li>
//                                   <a href="https://kdata.vn">
//                                     <img
//                                       src="https://kdata.vn/kdata/images/icon/icon-vietnam.png "
//                                       alt="Tiếng Việt"
//                                     />{' '}
//                                     Vi
//                                   </a>
//                                 </li>
//                               </ul>
//                             </div>
//                           </div>
//                           <div
//                             className="col-md-4"
//                             style={{ borderRight: '2px solid #ff3900' }}
//                           >
//                             <div className="menu-lv1" style={{ color: '#0042a1' }}>
//                               SỐ DƯ <br />
//                               <strong>0 đ</strong>
//                             </div>
//                           </div>
//                           <div className="col-md-4">
//                             <div className="menu-lv1" style={{ color: '#f86c6b' }}>
//                               NỢ <br />
//                               <strong>0 đ</strong>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </header>
//       </section>
//     </div>
//   );
// };



// const Sidebar = ({ onProductSelect }) => {
//   console.log("Sidebar rendered");
//   const [productsType, setProductsType] = useState([]);

//   useEffect(() => {
//     const fetchProductsType = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/products');
//         const data = await response.json();
//         setProductsType(data);
//       } catch (error) {
//         console.error('Error fetching products types:', error);
//       }
//     };

//     fetchProductsType();
//   }, []);

//   // const handleProductClick = (product) => {
//   //   onProductSelect(product);  // Gọi hàm truyền vào từ MainPanel để truyền product đã chọn
//   // };

//   return (
//     <div className="sidebar">
//       <div className="sidebar-wrapper">
//         <ul className="nav scroll-container">
//           {productsType.length > 0 && productsType.map((type) => (
//             <li key={type.id} className="nav-item dropdown">
//               <a className="dropdown-btn">
//                 <span>
//                   <img 
//                     src="https://kdata.vn/kdata/images/icon/cloud.png" 
//                     alt={type.name} 
//                     title={type.name} 
//                   />
//                 </span>
//                 <p>{type.name}</p>
//                 <i className="fas fa-chevron-down down" aria-hidden="true"></i>
//               </a>
//               <div className="dropdown-container">
//               {type.products.map((product) => (
//                 <a 
//                   key={product.id} 
//                   className="nav-link" 
//                   onClick={(e) => {
//                     e.preventDefault(); // Ngăn chặn hành động mặc định
//                     debugger;
//                     console.log("Product clicked:"); // Kiểm tra sản phẩm được click
//                     // onProductSelect(product.products); // Gọi hàm với giá trị mảng products
//                   }}
                  
//                   >
//                     {product.name}
//                   </a>
//                 ))}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };




// const MainPanel = ({ selectedProducts, productsType }) => {
//   const filteredProducts = productsType.find((type) => type.id === 1)?.products || [];

//   return (
//     <div className="main-panel">
//       <div className="content">
//         <div className="top-main-dashboard">
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="title-main-db">
//                 <h3>Khởi tạo HOSTING mới</h3>
//                 <nav aria-label="breadcrumb">
//                   <ol className="breadcrumb">
//                     <li className="breadcrumb-item">
//                       <a href="https://kdata.vn/user/dashboard">
//                         <img
//                           src="https://kdata.vn/kdata/images/icon-breadcrumb.png"
//                           alt="Star"
//                         />{" "}
//                         Dashboard
//                       </a>
//                     </li>
//                     <li className="breadcrumb-item active" aria-current="page">
//                       Khởi tạo HOSTING
//                     </li>
//                   </ol>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-12">
//             <div
//               className="card"
//               style={{ marginTop: '-15px', marginBottom: '0' }}
//             >
//               <div className="col-lg-12 mes_info"></div>
//               <div
//                 className="panel panel-default panel-accent-asbestos"
//                 style={{ marginBottom: '0', border: 'none' }}
//               >
//                 <div className="card-body" style={{ padding: '0 35px 0 15px' }}>
//                   <div className="main-content-service-dashboard">
//                     <div className="row">
//                       <div className="col-md-12">
//                         <div className="row">
//                           <div className="col-md-12">
//                             <div className="tab-content">
//                               <div className="row">
//                                 <div className="col-md-12">
//                                   <label
//                                     className="control-label title-label"
//                                     htmlFor="package"
//                                   >
//                                     LOẠI DỊCH VỤ
//                                   </label>
//                                   <div className="content-build">
//                                     <div className="box-carousel">
//                                       <section id="section-type-package">
//                                         <div className="container-type-package box-container-package">
//                                           <div className="show-some">
//                                             <div className="row">
//                                               <div className="col-style col-xxl-2 col-xl-3 col-lg-3 col-md-3 block-always-show-package spacing-between-items">
//                                                 <div className="item">
//                                                   <div
//                                                     className="box action-select-package box-item active"
//                                                     data-type-id="4"
//                                                     data-type-name="Selected Product"
//                                                   >
//                                                     <div className="arrow-left"></div>
//                                                     <i
//                                                       className="fa fa-check"
//                                                       aria-hidden="true"
//                                                     ></i>
//                                                     <div className="name-1">
//                                                       <img
//                                                         src="https://kdata.vn/kdata/images/img-service-5.png"
//                                                         alt="img-service"
//                                                         style={{
//                                                           height: '100px',
//                                                           width: 'auto',
//                                                           marginBottom: '5px',
//                                                         }}
//                                                       />
//                                                     </div>
//                                                     {filteredProducts.length > 0 ? (  
//                                                       <div>
//                                                         {filteredProducts.map((product) => (
//                                                           <div key={product.id}>
//                                                             <h4>{product.name}</h4>
//                                                             <p>{product.descriptions}</p>
//                                                           </div>
//                                                         ))}
//                                                       </div>
//                                                     ) : (
//                                                       <p>Không có sản phẩm nào thuộc loại này</p>  
//                                                     )}
//                                                   </div>
//                                                 </div>
//                                                 <br />
//                                               </div>
//                                             </div>
//                                           </div>
//                                         </div>
//                                       </section>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
                          

                              // <div className="get_package">
                              //   <div className="row">
                              //     <div className="col-md-12">
                              //       <label
                              //         className="control-label title-label"
                              //         htmlFor="package"
                              //       >
                              //         GÓI DỊCH VỤ
                              //       </label>
                              //       <div className="content-build">
                              //         <div className="box-carousel">
                              //           <section id="section-package">
                              //             <div className="container-package box-container-package">
                              //               <div className="show-some">
                              //                 <div className="row">
                              //                   <div className="col-style col-xxl-2 col-xl-4 col-lg-4 col-md-4 block-always-show-package">
                              //                     <div className="item">
                              //                       <div
                              //                         className="box action-select-package box-item active"
                              //                         data-month="1"
                              //                         data-id="17"
                              //                         data-description="Website Space: 1GB SSDDomain: 1Bandwidth: UnlimitedDatabase: UnlimitedSubdomain: Unlimited"
                              //                         data-price_backup="0"
                              //                         data-original_monthly="15000"
                              //                         data-name="WP 01"
                              //                       >
                              //                         <div className="arrow-left"></div>
                              //                         <i
                              //                           className="fa fa-check"
                              //                           aria-hidden="true"
                              //                         ></i>
                              //                         <div className="price-1">
                              //                           <b>WP 01</b>
                              //                           <br />
                              //                         </div>
                              //                         <div className="line"></div>
                              //                         <div style={{ paddingLeft: '10px' }}>
                              //                           Website Space: 1GB SSD
                              //                           <br />
                              //                           Domain: 1
                              //                           <br />
                              //                           Bandwidth: Unlimited
                              //                           <br />
                              //                           Database: Unlimited
                              //                           <br />
                              //                           Subdomain: Unlimited
                              //                         </div>
                              //                       </div>
                              //                     </div>
                              //                     <br />
                              //                   </div>
//                                                 <div className="col-style col-xxl-2 col-xl-4 col-lg-4 col-md-4 block-always-show-package">
//                                                   <div className="item">
//                                                     <div
//                                                       className="box action-select-package box-item"
//                                                       data-month="1"
//                                                       data-id="18"
//                                                       data-description="Website Space: 3GB SSDDomain: 2Bandwidth: UnlimitedDatabase: UnlimitedSubdomain: Unlimited"
//                                                       data-price_backup="0"
//                                                       data-original_monthly="30000"
//                                                       data-name="WP 02"
//                                                     >
//                                                       <div className="arrow-left"></div>
//                                                       <i
//                                                         className="fa fa-check"
//                                                         aria-hidden="true"
//                                                       ></i>
//                                                       <div className="price-1">
//                                                         <b>WP 02</b>
//                                                         <br />
//                                                       </div>
//                                                       <div className="line"></div>
//                                                       <div style={{ paddingLeft: '10px' }}>
//                                                         Website Space: 3GB SSD
//                                                         <br />
//                                                         Domain: 2
//                                                         <br />
//                                                         Bandwidth: Unlimited
//                                                         <br />
//                                                         Database: Unlimited
//                                                         <br />
//                                                         Subdomain: Unlimited
//                                                       </div>
//                                                     </div>
//                                                   </div>
//                                                   <br />
//                                                 </div>
//                                                 <div className="col-style col-xxl-2 col-xl-4 col-lg-4 col-md-4 block-always-show-package">
//                                                   <div className="item">
//                                                     <div
//                                                       className="box action-select-package box-item"
//                                                       data-month="1"
//                                                       data-id="19"
//                                                       data-description="Website Space: 5GB SSDDomain: 4Bandwidth: UnlimitedDatabase: UnlimitedSubdomain: Unlimited"
//                                                       data-price_backup="0"
//                                                       data-original_monthly="59000"
//                                                       data-name="WP 03"
//                                                     >
//                                                       <div className="arrow-left"></div>
//                                                       <i
//                                                         className="fa fa-check"
//                                                         aria-hidden="true"
//                                                       ></i>
//                                                       <div className="price-1">
//                                                         <b>WP 03</b>
//                                                         <br />
//                                                       </div>
//                                                       <div className="line"></div>
//                                                       <div style={{ paddingLeft: '10px' }}>
//                                                         Website Space: 5GB SSD
//                                                         <br />
//                                                         Domain: 4
//                                                         <br />
//                                                         Bandwidth: Unlimited
//                                                         <br />
//                                                         Database: Unlimited
//                                                         <br />
//                                                         Subdomain: Unlimited
//                                                       </div>
//                                                     </div>
//                                                   </div>
//                                                   <br />
//                                                 </div>
//                                                 <div className="col-style col-xxl-2 col-xl-4 col-lg-4 col-md-4 block-always-show-package">
//                                                   <div className="item">
//                                                     <div
//                                                       className="box action-select-package box-item"
//                                                       data-month="1"
//                                                       data-id="20"
//                                                       data-description="Website Space: 7GB SSDDomain: 6Bandwidth: UnlimitedDatabase: UnlimitedSubdomain: Unlimited"
//                                                       data-price_backup="0"
//                                                       data-original_monthly="79000"
//                                                       data-name="WP 04"
//                                                     >
//                                                       <div className="arrow-left"></div>
//                                                       <i
//                                                         className="fa fa-check"
//                                                         aria-hidden="true"
//                                                       ></i>
//                                                       <div className="price-1">
//                                                         <b>WP 04</b>
//                                                         <br />
//                                                       </div>
//                                                       <div className="line"></div>
//                                                       <div style={{ paddingLeft: '10px' }}>
//                                                         Website Space: 7GB SSD
//                                                         <br />
//                                                         Domain: 6
//                                                         <br />
//                                                         Bandwidth: Unlimited
//                                                         <br />
//                                                         Database: Unlimited
//                                                         <br />
//                                                         Subdomain: Unlimited
//                                                       </div>
//                                                     </div>
//                                                   </div>
//                                                   <br />
//                                                 </div>
//                                                 <div className="col-style col-xxl-2 col-xl-4 col-lg-4 col-md-4 block-always-show-package">
//                                                   <div className="item">
//                                                     <div
//                                                       className="box action-select-package box-item"
//                                                       data-month="1"
//                                                       data-id="21"
//                                                       data-description="Website Space: 10GB SSDDomain: 8Bandwidth: UnlimitedDatabase: UnlimitedSubdomain: Unlimited"
//                                                       data-price_backup="0"
//                                                       data-original_monthly="109000"
//                                                       data-name="WP 05"
//                                                     >
//                                                       <div className="arrow-left"></div>
//                                                       <i
//                                                         className="fa fa-check"
//                                                         aria-hidden="true"
//                                                       ></i>
//                                                       <div className="price-1">
//                                                         <b>WP 05</b>
//                                                         <br />
//                                                       </div>
//                                                       <div className="line"></div>
//                                                       <div style={{ paddingLeft: '10px' }}>
//                                                         Website Space: 10GB SSD
//                                                         <br />
//                                                         Domain: 8
//                                                         <br />
//                                                         Bandwidth: Unlimited
//                                                         <br />
//                                                         Database: Unlimited
//                                                         <br />
//                                                         Subdomain: Unlimited
//                                                       </div>
//                                                     </div>
//                                                   </div>
//                                                   <br />
//                                                 </div>
//                                                 <div className="col-style col-xxl-2 col-xl-4 col-lg-4 col-md-4 block-always-show-package">
//                                                   <div className="item">
//                                                     <div
//                                                       className="box action-select-package box-item"
//                                                       data-month="1"
//                                                       data-id="22"
//                                                       data-description="Website Space: 15GB SSDDomain: 14Bandwidth: UnlimitedDatabase: UnlimitedSubdomain: Unlimited"
//                                                       data-price_backup="0"
//                                                       data-original_monthly="159000"
//                                                       data-name="WP 06"
//                                                     >
//                                                       <div className="arrow-left"></div>
//                                                       <i
//                                                         className="fa fa-check"
//                                                         aria-hidden="true"
//                                                       ></i>
//                                                       <div className="price-1">
//                                                         <b>WP 06</b>
//                                                         <br />
//                                                       </div>
//                                                       <div className="line"></div>
//                                                       <div style={{ paddingLeft: '10px' }}>
//                                                         Website Space: 15GB SSD
//                                                         <br />
//                                                         Domain: 14
//                                                         <br />
//                                                         Bandwidth: Unlimited
//                                                         <br />
//                                                         Database: Unlimited
//                                                         <br />
//                                                         Subdomain: Unlimited
//                                                       </div>
//                                                     </div>
//                                                   </div>
//                                                   <br />
//                                                 </div>
//                                               </div>
//                                             </div>
//                                           </div>
//                                           <br />
//                                         </section>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// const Dashboard = () => {
//   const [selectedProducts, setSelectedProducts] = useState([]); // Lưu trữ danh sách sản phẩm đã chọn

//   const handleProductSelect = (products) => {
//     setSelectedProducts(products); // Lưu trữ toàn bộ mảng products
//     console.log("Selected Products:", products); // Kiểm tra products được chọn
//   };

//   return (
//     <div className="dashboard-container">
//       <DashboardUser />
//       <div className="content">
//         <Sidebar onProductSelect={handleProductSelect} />
//         <MainPanel selectedProducts={selectedProducts} />
//       </div>
//     </div>
//   );
// };


// export default Dashboard;
// // import React, { useEffect, useState } from 'react';

// // const Sidebar = ({ onProductSelect }) => {
// //   const [productsType, setProductsType] = useState([]);

// //   useEffect(() => {
// //     const fetchProductsType = async () => {
// //       try {
// //         const response = await fetch('http://localhost:8080/products');
// //         const data = await response.json();
// //         setProductsType(data);
// //       } catch (error) {
// //         console.error('Error fetching products types:', error);
// //       }
// //     };

// //     fetchProductsType();
// //   }, []);

// //   return (
// //     <div className="sidebar">
// //       <div className="sidebar-wrapper">
// //         <ul className="nav scroll-container">
// //           {productsType.length > 0 && productsType.map((type) => (
// //             <li key={type.id} className="nav-item dropdown">
// //               <a className="dropdown-btn">
// //                 <span>
// //                   <img 
// //                     src="https://kdata.vn/kdata/images/icon/cloud.png" 
// //                     alt={type.name} 
// //                     title={type.name} 
// //                   />
// //                 </span>
// //                 <p>{type.name}</p>
// //                 <i className="fas fa-chevron-down down" aria-hidden="true"></i>
// //               </a>
// //               <div className="dropdown-container">
// //                 {type.products.map((product) => (
// //                   <a 
// //                     key={product.id} 
// //                     className="nav-link" 
// //                     onClick={(e) => {
// //                       e.preventDefault(); // Ngăn chặn hành động mặc định
// //                       console.log("Product clicked:", product.name); // Kiểm tra sản phẩm được click
// //                       onProductSelect(product.products); // Gọi hàm với giá trị mảng products
// //                     }}
// //                   >
// //                     {product.name}
// //                   </a>
// //                 ))}
// //               </div>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // const MainPanel = ({ selectedProducts }) => {
// //   return (
// //     <div className="main-panel">
// //       <h1>Products</h1>
// //       <ul>
// //         {selectedProducts.length > 0 ? (
// //           selectedProducts.map((product) => (
// //             <li key={product.id}>
// //               <h2>{product.name}</h2>
// //               <p>{product.descriptions}</p> {/* Hiển thị mô tả sản phẩm nếu có */}
// //             </li>
// //           ))
// //         ) : (
// //           <p>No products selected.</p>
// //         )}
// //       </ul>
// //     </div>
// //   );
// // };

// // const Dashboard = () => {
// //   const [selectedProducts, setSelectedProducts] = useState([]); // Lưu trữ danh sách sản phẩm đã chọn

// //   const handleProductSelect = (products) => {
// //     setSelectedProducts(products); // Cập nhật sản phẩm đã chọn
// //   };

// //   return (
// //     <div className="dashboard-container">
// //       <Sidebar onProductSelect={handleProductSelect} />
// //       <MainPanel selectedProducts={selectedProducts} />
// //     </div>
// //   );
// // };

// // export default Dashboard;
import React, { useState } from 'react';
import Sidebar from './Sidebar'; 
import MainPanel from './MainPanel'; 
import ProductPackage from './ProductPackage'; 
import ImageSelector from './ImageSelector'; 
import Circle from './Circle'; 
import Bill from './Bill'; // Import the Bill component

const Dashboard = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedPackages, setSelectedPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [selectedCycle, setSelectedCycle] = useState('');
    
    const handleImageSelect = (image) => {
        setSelectedImages(prevImages => [...prevImages, image]);
    };

    const handleProductSelect = (products) => {
        setSelectedProducts(products);
    };

    const handlePackageSelect = (packages) => {
        setSelectedPackages(packages);
    };

    const handleSinglePackageSelect = (pkg) => {
        console.log('SinglePackage',pkg)
        setSelectedPackage(pkg);
        setSelectedCycle('');
    };

    const handleCycleChange = (cycle) => {
        console.log('chu ky',cycle)
        setSelectedCycle(cycle);
    };

    const calculateTotalAmount = () => {
        if (!selectedPackage) return 0;
    
        // Convert subscription cycle to its corresponding multiplier
        let cycleMultiplier;
        switch (selectedCycle) {
            case 'monthly':
                cycleMultiplier = 1; // 1 month
                break;
            case 'quarterly':
                cycleMultiplier = 3; // 3 months
                break;
            case 'biannually':
                cycleMultiplier = 6; // 6 months
                break;
            case 'annually':
                cycleMultiplier = 12; // 12 months
                break;
            case 'biennially':
                cycleMultiplier = 24; // 24 months (2 years)
                break;
            case 'triennially':
                cycleMultiplier = 36; // 36 months (3 years)
                break;
            default:
                cycleMultiplier = 1; // Default to 1 month if no cycle selected
        }
    
        // Calculate the total amount based on product price and selected cycle
        const basePrice = selectedPackage.price * cycleMultiplier;
        const taxAmount = (selectedPackage.tax / 100) * basePrice;
    
        // Total amount = base price + tax
        const totalAmount = basePrice + taxAmount;
    
        return totalAmount;
    };
    

    const totalAmount = calculateTotalAmount();

    return (
        <div className="dashboard-container">
            <div className="content">
                <Sidebar onProductSelect={handleProductSelect} />
                <MainPanel selectedProducts={selectedProducts} onPackageSelect={handlePackageSelect} />
                <ProductPackage selectedPackages={selectedPackages} onSinglePackageSelect={handleSinglePackageSelect} />
                {selectedPackage && (
                    <Circle selectedPackage={selectedPackage} onCycleChange={handleCycleChange} />
                )}
                {/* Pass necessary props to the Bill component */}
                <Bill 
                    selectedPackage={selectedPackage} 
                    selectedCycle={selectedCycle} 
                    totalAmount={totalAmount} 
                />
                <ImageSelector onImageSelect={handleImageSelect} /> {/* Pass handler to ImageSelector */}
            </div>
        </div>
    );
};

export default Dashboard;






