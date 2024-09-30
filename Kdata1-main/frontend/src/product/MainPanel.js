import React from 'react';
// import ProductPackage from './ProductPackage';

const MainPanel = ({ selectedProducts, onPackageSelect }) => {
  const handleProductClick = (packages) => {
    console.log("Packages in handleProductClick:", packages); // In ra để kiểm tra giá trị
    onPackageSelect(packages); // Gọi hàm với toàn bộ mảng packages của sản phẩm
  };

  return (
    <div className="main-panel">
      <h1>Thông tin sản phẩm đã chọn</h1>
      {selectedProducts.length > 0 ? (
        selectedProducts.map(product => (
          <div key={product.id}>
            <h2
              onClick={() => handleProductClick(product.Packages)} // Gọi hàm khi nhấp vào tên sản phẩm
              style={{ cursor: 'pointer', color: 'blue' }} // Thêm kiểu để cho biết đây là một liên kết
            >
              {product.name}
            </h2>
            <p>{product.content}</p>
            {/* Hiển thị thông tin khác của sản phẩm nếu cần */}
          </div>
        ))
      ) : (
        <p>Chưa chọn sản phẩm nào.</p>
      )}
    </div>
  );
};

export default MainPanel;
