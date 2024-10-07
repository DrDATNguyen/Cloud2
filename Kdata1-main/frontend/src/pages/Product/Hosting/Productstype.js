import React, { useState, useEffect } from 'react';
import '../../../css/Product.css'
function Productstype({ productsType, onPackageSelect }) {
    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleProductClick = (pro) => {
        onPackageSelect(pro.Packages);
        setSelectedProductId(pro.id);
    };

    const loaiDichVu = () => {
        if (Array.isArray(productsType) && productsType.length > 0) {
            return productsType.map((pro) => (
                <div className="col-12 col-md-6 col-lg-3 m" key={pro.id}>
                    <div
                        className="card"
                        onClick={() => handleProductClick(pro)}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} // Phóng to khi hover
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} // Trở về kích thước ban đầu khi rời chuột
                    >
                        <div style={{ textAlign: 'center' }}>
                            <img src={`/logo192.png`} alt={pro.name} style={{ width: '100px', maxWidth: '100%' }} />
                        </div>
                        <h5 style={{ margin: '0 auto', textAlign: 'center', color: '' }}>{pro.name}</h5>

                        {selectedProductId && selectedProductId === pro.id && (
                            <div
                                className="checkmark"
                            >
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
        <div className="container">
            <div className='row'>
                {loaiDichVu()}
            </div>
        </div>
    );
}

export default Productstype;
