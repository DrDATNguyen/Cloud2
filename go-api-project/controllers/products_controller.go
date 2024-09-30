package controllers

import (
	"encoding/json"
	"fmt"
	"go-api-project/initializers" // Adjust the import path based on your project structure
	"go-api-project/models"       // Adjust the import path based on your project structure
	"net/http"
)

func GetProductsType(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Chỉ cho phép phương thức GET", http.StatusMethodNotAllowed)
		return
	}

	var productTypes []models.ProductType

	// Lấy danh sách các loại sản phẩm cùng với sản phẩm, gói sản phẩm và hình ảnh
	if err := initializers.DB.Preload("Products.Packages").Preload("Products.Images").Find(&productTypes).Error; err != nil {
		fmt.Printf("Lỗi khi lấy danh sách loại sản phẩm: %v\n", err)
		http.Error(w, "Lỗi khi lấy danh sách loại sản phẩm", http.StatusInternalServerError)
		return
	}

	// Kiểm tra và xử lý trường hợp không có sản phẩm nào trong productTypes
	for i := range productTypes {
		// Kiểm tra nếu không có sản phẩm thì khởi tạo slice rỗng
		if productTypes[i].Products == nil {
			productTypes[i].Products = []models.Product{}
		}
		for j := range productTypes[i].Products {
			// Kiểm tra nếu không có gói thì khởi tạo slice rỗng
			if productTypes[i].Products[j].Packages == nil {
				productTypes[i].Products[j].Packages = []models.ProductPackage{}
			}
			// Kiểm tra nếu không có hình ảnh thì khởi tạo slice rỗng
			if productTypes[i].Products[j].Images == nil {
				productTypes[i].Products[j].Images = []models.ProductImage{}
			}
		}
	}

	// Trả về danh sách loại sản phẩm
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(productTypes); err != nil {
		http.Error(w, "Lỗi khi mã hóa JSON", http.StatusInternalServerError)
	}
}
