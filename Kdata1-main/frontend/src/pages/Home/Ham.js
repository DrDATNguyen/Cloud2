// components/ProductDisplay.js
import React from 'react';

export const LoaiDichVu = ({ products, handleProductClick, selectedProduct }) => {
    if (products.length > 0) {
        return products.map((pro) => (
            <div className="col-3 m-2" key={pro.id}>
                <div
                    className="card"
                    style={{
                        width: '200px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        padding: '10px',
                        margin: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                    onClick={() => handleProductClick(pro)}
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
                        <div
                            className="checkmark"
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                width: '24px',
                                height: '24px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
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

export const ProductPackages = ({ productPackages, handlePackagesClick, selectedPackage }) => {
    if (productPackages.length > 0) {
        return productPackages.map((pro) => (
            <div className="col-2 m-4" key={pro.id}>
                <div
                    className="card"
                    style={{
                        width: '200px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        padding: '10px',
                        margin: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                    onClick={() => handlePackagesClick(pro)}
                >
                    <div className="card-body" style={{ textAlign: 'center' }}>
                        <h5 className="card-title">{pro.name}</h5>
                        Website Space: {pro.ram} <br />
                        Domain: {pro.cpu} <br />
                        Storage: {pro.storage} <br />
                        Database: {pro.database} <br />
                        Subdomain: {pro.subdomain} <br />
                    </div>
                    {selectedPackage && selectedPackage.id === pro.id && (
                        <div
                            className="checkmark"
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                width: '24px',
                                height: '24px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
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
