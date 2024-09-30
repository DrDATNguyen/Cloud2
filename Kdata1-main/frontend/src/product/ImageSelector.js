import React, { useState } from 'react';

// Mock data for Images API
const mockImages = [
    {
        id: 1,
        name: 'Ubuntu',
        descriptions: 'Ubuntu OS',
        thumb: 'link-to-ubuntu-image',
        type: 1,
        content: 'Linux',
        slug: 'ubuntu',
        ID_product: 1,
    },
    {
        id: 2,
        name: 'Windows 2022',
        descriptions: 'Windows Server 2022',
        thumb: 'link-to-windows-image',
        type: 2,
        content: 'Windows',
        slug: 'windows-2022',
        ID_product: 1,
    },
    {
        id: 3,
        name: 'Almalinux',
        descriptions: 'Almalinux OS',
        thumb: 'link-to-almalinux-image',
        type: 1,
        content: 'Linux',
        slug: 'almalinux',
        ID_product: 1,
    },
    {
        id: 4,
        name: 'Application 1',
        descriptions: 'Application Image',
        thumb: 'link-to-application-image',
        type: 3,
        content: 'Application',
        slug: 'application-1',
        ID_product: 1,
    },
    // Add more mock data as needed
];

const ImageSelector = ({ onImageSelect }) => {
    const [selectedTab, setSelectedTab] = useState(1); // Default to 'Linux'
    const [selectedImage, setSelectedImage] = useState(null); // To store selected image

    const handleTabClick = (tabType) => {
        setSelectedTab(tabType);
    };

    // Filter images based on the selected tab type (1: Linux, 2: Windows, 3: Application)
    const filteredImages = mockImages.filter(image => image.type === selectedTab);

    // Handle image selection
    const handleImageSelect = (image) => {
        setSelectedImage(image); // Update selected image
    };

    // Handle submit button click
    const handleSubmit = () => {
        if (selectedImage) {
            onImageSelect(selectedImage); // Pass selected image to the parent component
        } else {
            alert("Please select an image before submitting.");
        }
    };

    return (
        <div className="image-selector-container">
            {/* Tabs for selecting OS type */}
            <div className="tabs">
                <button 
                    className={selectedTab === 1 ? 'tab active' : 'tab'} 
                    onClick={() => handleTabClick(1)}
                >
                    Linux
                </button>
                <button 
                    className={selectedTab === 2 ? 'tab active' : 'tab'} 
                    onClick={() => handleTabClick(2)}
                >
                    Windows
                </button>
                <button 
                    className={selectedTab === 3 ? 'tab active' : 'tab'} 
                    onClick={() => handleTabClick(3)}
                >
                    Application
                </button>
            </div>

            {/* Image cards */}
            <div className="image-list">
                {filteredImages.map(image => (
                    <div 
                        key={image.id} 
                        className="image-card" 
                        onClick={() => handleImageSelect(image)} // Set selected image on click
                        style={{ cursor: 'pointer', border: selectedImage?.id === image.id ? '2px solid blue' : 'none' }} // Highlight selected image
                    >
                        <img src={image.thumb} alt={image.name} />
                        <h5>{image.name}</h5>
                    </div>
                ))}
            </div>

            {/* Submit button */}
            <button onClick={handleSubmit}>Select Image</button>

            {/* Dropdown selection for image */}
            <div className="image-dropdown">
                <label htmlFor="image-select">Image</label>
                <select id="image-select">
                    {filteredImages.map(image => (
                        <option key={image.id} value={image.slug}>
                            {image.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ImageSelector;
