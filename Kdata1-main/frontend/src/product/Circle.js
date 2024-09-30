import React, { useState } from 'react';

const Circle = ({ selectedPackage, onCycleChange }) => {
  const [selectedCycle, setSelectedCycle] = useState('');

  // Handle selection of the subscription cycle
  const handleCycleChange = (event) => {
    const cycle = event.target.value; // Get the selected cycle
    console.log('Selected cycle:', cycle); // Log the selected cycle for debugging
    setSelectedCycle(cycle); // Update the local state in Circle
    onCycleChange(cycle); // Pass the selected cycle back to Dashboard via props
  };

  if (!selectedPackage) {
    return <p>Không có gói nào được chọn.</p>;
  }

  return (
    <div className="circle">
      {/* <h2>{selectedPackage.name}</h2>
      <p>RAM: {selectedPackage.ram} GB</p>
      <p>CPU: {selectedPackage.cpu} Core</p>
      <p>Storage: {selectedPackage.storage}</p>
      <p>Price: {selectedPackage.price} VNĐ</p> */}

      <h4>Subscription Options</h4>
      <div className="options-container">
        {/* Monthly Option */}
        <label>
          <input
            type="radio"
            name="subscription-cycle"
            value="monthly"
            checked={selectedCycle === 'monthly'}
            onChange={handleCycleChange}
            disabled={!selectedPackage.monthly} // Disabled if monthly is not available
          />
          1 Tháng
        </label>

        {/* Quarterly Option */}
        <label>
          <input
            type="radio"
            name="subscription-cycle"
            value="quarterly"
            checked={selectedCycle === 'quarterly'}
            onChange={handleCycleChange}
            disabled={!selectedPackage.quarterly} // Disabled if quarterly is not available
          />
          3 Tháng
        </label>

        {/* Biannually Option */}
        <label>
          <input
            type="radio"
            name="subscription-cycle"
            value="biannually"
            checked={selectedCycle === 'biannually'}
            onChange={handleCycleChange}
            disabled={!selectedPackage.biannually} // Disabled if biannually is not available
          />
          6 Tháng
        </label>

        {/* Annually Option */}
        <label>
          <input
            type="radio"
            name="subscription-cycle"
            value="annually"
            checked={selectedCycle === 'annually'}
            onChange={handleCycleChange}
            disabled={!selectedPackage.annually} // Disabled if annually is not available
          />
          12 Tháng
        </label>

        {/* Biennially Option */}
        <label>
          <input
            type="radio"
            name="subscription-cycle"
            value="biennially"
            checked={selectedCycle === 'biennially'}
            onChange={handleCycleChange}
            disabled={!selectedPackage.biennially} // Disabled if biennially is not available
          />
          24 Tháng
        </label>

        {/* Triennially Option */}
        <label>
          <input
            type="radio"
            name="subscription-cycle"
            value="triennially"
            checked={selectedCycle === 'triennially'}
            onChange={handleCycleChange}
            disabled={!selectedPackage.triennially} // Disabled if triennially is not available
          />
          36 Tháng
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
