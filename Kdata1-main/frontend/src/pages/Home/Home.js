import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home({ onProductSelect }) {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productpackages, setproductpackages] = useState([]);
    const [selectedpackagest, setSelectedpackages] = useState(null);
    // connst[selectedCircle, setselectedCircle] = useState([]);
    useEffect(() => {
        axios.get('https://portal-dev.lemp.vn/products')
            .then((response) => {
                const serverData = response.data.find(item => item.slug === 'server');
                if (serverData) {
                    setProducts(serverData.products);
                }
            })
            .catch((error) => {
                console.error("Có lỗi khi tải dữ liệu: ", error);
            });
    }, []);

    const handleProductClick = (pro) => {
        setSelectedProduct(pro);
        setproductpackages(pro.Packages);
    };

    const handlepackagesClick = (pk) => {
        setSelectedpackages(pk);
        // setselectedCircle(pk);

    };

    const loaiDichVu = () => {
        if (products.length > 0) {
            return products.map((pro) => (
                // console.log("kkk", pro),// In ra nội dung của biến pro

                <div className="col-3 m-6" key={pro.id}>
                    <div
                        className="card"
                        style={{ width: '200px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
                        onClick={() => handleProductClick(pro)} // Gán sự kiện click cho card

                    >
                        <img
                            style={{ width: '100px', maxWidth: '100%' }}
                            src={`/logo192.png`}
                            alt={pro.name}
                            className="card-img-top"
                        />
                        <div className="card-body" style={{ textAlign: 'center' }}>
                            <h5 className="card-title">{pro.name}</h5>
                        </div>
                        {selectedProduct && selectedProduct.id === pro.id && (
                            <div className="checkmark" style={{ position: 'absolute', top: '10px', right: '10px', width: '24px', height: '24px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                <span style={{ fontSize: '18px', color: '#28a745' }}>✔</span>
                            </div>
                        )}
                    </div>
                </div>
            ));
        } else {
            return <p>Không có sản phẩm</p>;
        }
    };

    const productPackages = () => {
        if (productpackages.length > 0) {
            return productpackages.map((pro) => (
                // console.log("kkk", pro),// In ra nội dung của biến pro

                <div className="col-2 m-4" key={pro.id}>
                    <div
                        className="card"
                        style={{ width: '200px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
                        onClick={() => handlepackagesClick(pro)}

                    >

                        <div className="card-body" style={{ textAlign: 'center' }}>
                            <h5 color='red' alignItems='center' className="card-title">{pro.name}</h5>
                            Website Space:{pro.ram} <br></br>
                            Domain:{pro.cpu} <br></br>
                            storage:{pro.storage} <br></br>
                            Database
                            Subdomain
                        </div>
                        {selectedpackagest && selectedpackagest.id === pro.id && (
                            <div className="checkmark" style={{ position: 'absolute', top: '10px', right: '10px', width: '24px', height: '24px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                <span style={{ fontSize: '18px', color: '#28a745' }}>✔</span>
                            </div>
                        )}
                    </div>
                </div>
            ));
        } else {
            return <p>Không có sản phẩm</p>;
        }
    };

    return (
        <div>
            Khởi tạo HOSTING mới
            <div className="container">
                <h3>LOẠI DỊCH VỤ</h3>
                <div className="row">
                    {loaiDichVu()}
                </div>

                <h3>GÓI DỊCH VỤ                </h3>
                <div className="row">
                    {productPackages()}
                </div>
            </div>
        </div>
    );
}

export default Home;
