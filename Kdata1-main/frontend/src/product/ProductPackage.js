import React from 'react';

const ProductPackage = ({ selectedPackages, onSinglePackageSelect }) => {
  console.log("Selected Packages in ProductPackage:", selectedPackages); // Check the value

  // Ensure there are packages to display
  if (!selectedPackages || selectedPackages.length === 0) {
    return <p>Không có gói nào để hiển thị.</p>;
  }

  // Handle package selection
  const handlePackageSelect = (pkg) => {
    onSinglePackageSelect(pkg); // Call callback to send the selected package to the parent component
  };

  return (
    <div className="product-packages">
      <h4>Packages:</h4>
      {selectedPackages.map((pkg) => (
        <div 
          key={pkg.id} 
          onClick={() => handlePackageSelect(pkg)} 
          style={{ cursor: 'pointer' }}
        >
          <h5>{pkg.name}</h5>
          <p>{pkg.descriptions}</p> {/* Or any other information you want to display */}
          <p>RAM: {pkg.ram} GB</p>
        <p>CPU: {pkg.cpu} Core</p>
        <p>Storage: {pkg.storage}</p>
          <p>Price: {pkg.price} VNĐ</p> {/* Displaying the price */}
        </div>
      ))}
    </div>
  );
};

export default ProductPackage;
