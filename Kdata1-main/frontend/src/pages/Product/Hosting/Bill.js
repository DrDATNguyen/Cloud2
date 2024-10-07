import React from 'react';
import '../../../css/Product.css'
const Bill = ({ selectedPackage, selectedCycle, totalAmount }) => {
    const getCycleLabel = (cycle) => {
        switch (cycle) {
            case 'monthly':
                return 1;
            case 'quarterly':
                return 3;
            case 'biannually':
                return 6;
            case 'annually':
                return 12;
            case 'biennially':
                return 24;
            case 'triennially':
                return 36;
            default:
                return 'Monthly (default)';
        }
    };

    const cycleLabel = getCycleLabel(selectedCycle);

    // Ensure price and tax are set properly
    // const basePrice = selectedPackage ? selectedPackage.price : 0;
    // const taxRate = selectedPackage ? selectedPackage.tax || 0 : 0;
    const taxRate = 10;
    // Display breakdown of the price and VAT
    // const basePrice = selectedPackage.price * cycleLabel;
    const priceWithoutTax = totalAmount / (1 + (taxRate / 100));
    const taxAmount = totalAmount - priceWithoutTax;
    return (
        <div className="cardBill">
            <div className='tiltleframe'>
                <h5>Order Summary</h5>
            </div>

            <div className='card'>
                <table>
                    <tbody>
                        <tr>
                            <td>Package</td>
                            <td style={{ textAlign: 'right' }}>
                                {selectedPackage ? selectedPackage.name : 'No Package Selected'}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='card'>
                <table>
                    <tbody>
                        <tr>
                            <td>Price (before tax)</td>
                            <td style={{ textAlign: 'right' }}>
                                {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                }).format(priceWithoutTax)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='card'>
                <table>
                    <tbody>
                        <tr>
                            <td>VAT({taxRate}%)</td>
                            <td style={{ textAlign: 'right' }}>
                                {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                }).format(taxAmount)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='card'>
                <table>
                    <tbody>
                        <tr>
                            <td>Total Amount({taxRate}%)</td>
                            <td style={{ textAlign: 'right' }}>
                                {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                }).format(totalAmount)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Khung chứa nút KHỞI TẠO */}
            <div className="action-container">
                <div className="create-button-container">
                    <button className="create-button">KHỞI TẠO</button>
                </div>
            </div>
        </div>
    );

};

export default Bill;
