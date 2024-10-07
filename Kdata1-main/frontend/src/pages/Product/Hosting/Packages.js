import React, { useState } from 'react';
import '../../../css/Product.css';

const Packages = ({ packages, onSelectedPackage }) => { //lên đây mà kh có gì nên ní render lại

    console.log("Mảng packages:", packages);
    const [selectedPackageId, setSelectedPackageId] = useState(null);

    if (!Array.isArray(packages) || packages.length === 0) {
        return <p>Không có gói nào để hiển thị.</p>;
    }

    const handlePackageSelect = (pkg) => {
        setSelectedPackageId(pkg.id);
        onSelectedPackage(pkg); //do thằng nào nó chưa dùng tới, nó render lại giao diện nên mất thằng này nó truyền ngược lại lên
    };

    const productPackages = () => {
        return packages.map((pro) => (
            <div className="col-12 col-md-6 col-lg-3 m" key={pro.id}>
                <div
                    className="card"

                    onClick={() => handlePackageSelect(pro)}
                >
                    <div className="card-body" style={{ textAlign: 'center' }}>
                        <h5 className="card-title">{pro.name}</h5>
                        Website Space: {pro.ram} <br />
                        Domain: {pro.cpu} <br />
                        Storage: {pro.storage} <br />
                        Database: {pro.database} <br />
                        Subdomain: {pro.subdomain}
                    </div>
                    {selectedPackageId === pro.id && (
                        <div className="checkmark">
                            <span style={{ fontSize: '18px', color: '#28a745' }}>✔</span>
                        </div>
                    )}
                </div>
            </div>
        ));
    };

    return (
        <div className="container">
            <div className='row'>
                {productPackages()}
            </div>
        </div>
    );
};

export default Packages;
