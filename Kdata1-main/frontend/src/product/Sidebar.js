import React, { useState, useEffect } from 'react';

const Sidebar = ({ onProductSelect }) => {
    const [productsType, setProductsType] = useState([]);
  
    useEffect(() => {
      const fetchProductsType = async () => {
        try {
          const response = await fetch('http://localhost:8080/products');
          const data = await response.json();
          setProductsType(data);
        } catch (error) {
          console.error('Error fetching products types:', error);
        }
      };
  
      fetchProductsType();
    }, []);
  
    const handleProductClick = (products) => {
        console.log("Products in handleProductClick:", products); // In ra để kiểm tra giá trị

      onProductSelect(products); // Gọi hàm với toàn bộ mảng products
    };
  
    return (
      <div className="sidebar">
        <div className="sidebar-wrapper">
          <ul className="nav scroll-container">
            {productsType.length > 0 && productsType.map((type) => (
              <li key={type.id} className="nav-item dropdown">
                <div className="dropdown-btn" onClick={() => handleProductClick(type.products)}>
                  <span>
                    <img 
                      src="https://kdata.vn/kdata/images/icon/cloud.png" 
                      alt={type.name} 
                      title={type.name} 
                    />
                  </span>
                  <p>{type.name}</p>
                  <i className="fas fa-chevron-down down" aria-hidden="true"></i>
                </div>
                <div className="dropdown-container">
                  {type.products.map((product) => (
                    <a
                      key={product.id}
                      className="nav-link"
                      onClick={(e) => {
                        e.preventDefault(); // Ngăn hành động mặc định
                        console.log("Product clicked:", product);
                        handleProductClick(type.products); // Truyền toàn bộ mảng products của type
                      }}
                    >
                      {product.name}
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  
  