import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Productstype from './Productstype';
import Packages from './Packages';
import Circle from './Circle';
import Bill from './Bill';
import Domain from './Domain';
import Discount from './Discount';
import { fetchAllProducts } from '../../../components/Service/ProductService.js'
function Hosting() {
    const [productsType, setProductsType] = useState([]);
    const [packages, setPackages] = useState([]);
    const [selectedpackage, setselectedpackage] = useState(null);
    const [selectedCycle, setSelectedCycle] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchAllProducts(); // Chờ dữ liệu từ API
            const serverData = response.find(item => item.slug === 'server'); // Tìm phần tử có slug là 'server'
            console.log(">>>Check server", serverData);
            if (serverData) {
                setProductsType(serverData.products); // Cập nhật state với dữ liệu nhận được
            }
        };

        fetchData(); // Gọi hàm fetch
    }, []);

    const handlePackageSelect = (packages) => {
        setPackages(packages);
    };

    const handleSelectedPackge = (selectedpackage) => {
        setselectedpackage(selectedpackage);
        setSelectedCycle('');
    }

    const handleCycleChange = (cycle) => {
        console.log('chu kỳ', cycle);
        setSelectedCycle(cycle);
    };
    const calculateTotalAmount = () => {
        if (!selectedpackage) return 0;

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
        const basePrice = selectedpackage.price * cycleMultiplier;
        const taxAmount = (selectedpackage.tax / 100) * basePrice;

        // Total amount = base price + tax
        const totalAmount = basePrice + taxAmount;

        return totalAmount;
    };
    const totalAmount = calculateTotalAmount();


    return (
        <div className="container-fluid">
            <h3>Khởi tạo HOSTING mới</h3>
            <div className='row'>
                <div className='col-12 col-lg-8'>

                    <div className='tiltleframe'>
                        <h5>LOẠI DỊCH VỤ</h5>
                    </div>
                    <Productstype productsType={productsType} onPackageSelect={handlePackageSelect} />

                    <div className='tiltleframe'>
                        <h5>GÓI DỊCH VỤ</h5>
                    </div>
                    <Packages packages={packages} onSelectedPackage={handleSelectedPackge} />
                    <div className='tiltleframe'>
                        <h5>TÊN MIỀN</h5>
                    </div>
                    <Domain></Domain>

                    <div className='tiltleframe'>
                        <h5>CHU KỲ</h5>
                    </div>
                    <Circle selectedPackage={selectedpackage} onCycleChange={handleCycleChange} />

                    <div className='tiltleframe'>
                        <h5>KHUYẾN MÃI</h5>
                        <Discount />
                    </div>


                </div>

                {/* Phần Bill này sẽ xuống phía dưới trên điện thoại (col-12), và nằm bên phải trên màn hình lớn */}
                <div className='col-12 col-lg-4'>
                    <Bill
                        selectedPackage={selectedpackage}
                        selectedCycle={selectedCycle}
                        totalAmount={totalAmount}
                    />
                </div>
            </div>
        </div>
    );
}

export default Hosting;
