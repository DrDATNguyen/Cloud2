import React from 'react';

const Bill = ({ selectedPackage, selectedCycle, totalAmount }) => {
    // Convert subscription cycle to its corresponding name
    const getCycleLabel = (cycle) => {
        switch (cycle) {
            case 'monthly':
                return 'Monthly';
            case 'quarterly':
                return 'Quarterly';
            case 'biannually':
                return 'Biannually';
            case 'annually':
                return 'Annually';
            case 'biennially':
                return 'Biennially';
            case 'triennially':
                return 'Triennially';
            default:
                return 'Monthly (default)';
        }
    };

    const cycleLabel = getCycleLabel(selectedCycle);

    // Ensure price and tax are set properly
    const basePrice = selectedPackage ? selectedPackage.price : 0;
    const taxRate = selectedPackage ? selectedPackage.tax || 0 : 0;

    // Display breakdown of the price and VAT
    const priceWithoutTax = totalAmount / (1 + (taxRate / 100));
    const taxAmount = totalAmount - priceWithoutTax;

    return (
        <div className="bill-summary">
            <h4>Invoice Summary</h4>
            <p>Package: {selectedPackage ? selectedPackage.name : 'No Package Selected'}</p>
            <p>Subscription Cycle: {cycleLabel}</p>
            <p>Price (before tax): {priceWithoutTax.toFixed(2)} VNĐ</p>
            <p>VAT ({taxRate}%): {taxAmount.toFixed(2)} VNĐ</p>
            <p>Total Amount: {totalAmount.toFixed(2)} VNĐ</p>
        </div>
    );
};

export default Bill;
