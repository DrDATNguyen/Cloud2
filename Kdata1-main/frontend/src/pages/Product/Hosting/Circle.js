import React, { useState } from 'react';
import '../../../css/circle.css'; // Assuming you have a CSS file for styles

const Circle = ({ selectedPackage, onCycleChange }) => {
    const [selectedCycle, setSelectedCycle] = useState('');

    const handleCycleChange = (event) => {
        const cycle = event.target.value; // Get the selected cycle
        setSelectedCycle(cycle); // Update the local state in Circle
        onCycleChange(cycle); // Notify parent component
    };

    if (!selectedPackage) {
        return <p>Không có gói nào được chọn.</p>;
    }

    return (
        <div className="circle">
            <h4>Chu Kỳ</h4>
            <div className="options-container">
                {/* Quarterly Option */}
                <label className="option-item">
                    <input
                        type="radio"
                        name="subscription-cycle"
                        value="quarterly"
                        checked={selectedCycle === 'quarterly'}
                        onChange={handleCycleChange}
                        disabled={!selectedPackage.quarterly}
                    />
                    <span>3 Tháng</span>
                </label>

                {/* Biannually Option */}
                <label className="option-item">
                    <input
                        type="radio"
                        name="subscription-cycle"
                        value="biannually"
                        checked={selectedCycle === 'biannually'}
                        onChange={handleCycleChange}
                        disabled={!selectedPackage.biannually}
                    />
                    <span>6 Tháng</span>
                </label>

                {/* Annually Option */}
                <label className="option-item">
                    <input
                        type="radio"
                        name="subscription-cycle"
                        value="annually"
                        checked={selectedCycle === 'annually'}
                        onChange={handleCycleChange}
                        disabled={!selectedPackage.annually}
                    />
                    <span>12 Tháng</span>
                    <span className="discount-badge">-10%</span>
                </label>

                {/* Biennially Option */}
                <label className="option-item">
                    <input
                        type="radio"
                        name="subscription-cycle"
                        value="biennially"
                        checked={selectedCycle === 'biennially'}
                        onChange={handleCycleChange}
                        disabled={!selectedPackage.biennially}
                    />
                    <span>24 Tháng</span>
                    <span className="discount-badge">-15%</span>
                </label>

                {/* Triennially Option */}
                <label className="option-item">
                    <input
                        type="radio"
                        name="subscription-cycle"
                        value="triennially"
                        checked={selectedCycle === 'triennially'}
                        onChange={handleCycleChange}
                        disabled={!selectedPackage.triennially}
                    />
                    <span>36 Tháng</span>
                    <span className="discount-badge">-30%</span>
                </label>
            </div>

            {/* Optionally show a message if no cycles are available */}
            {Object.keys(selectedPackage).every((key) => !selectedPackage[key]) && (
                <p className="no-options">Không có chu kỳ nào khả dụng cho gói này.</p>
            )}
        </div>
    );
};

export default Circle;
