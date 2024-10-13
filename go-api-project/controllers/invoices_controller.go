package controllers

import (
	"encoding/json"
	"go-api-project/initializers" // Adjust the import path based on your project structure
	"go-api-project/models"
	"net/http"
	"time"
)

// Handler to create invoice and invoice items
func CreateInvoice(w http.ResponseWriter, r *http.Request) {
	// Ensure the request method is POST
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	// Decode JSON body
	var jsonData struct {
		Invoice struct {
			Name         string  `json:"name"`
			Descriptions string  `json:"descriptions"`
			IDAdmin      uint    `json:"id_admin"`
			IDUser       uint    `json:"id_user"`
			TotalPrice   float64 `json:"total_price"`
			InvoiceItems []struct {
				Name         string  `json:"name"`
				Descriptions string  `json:"descriptions"`
				Quantity     int     `json:"quantity"`
				NamePackages string  `json:"name_packages"`
				Price        float64 `json:"price"`
				Circle       string  `json:"circle"`
				NameImage    string  `json:"name_image"`
			} `json:"invoice_items"`
		} `json:"invoice"`
	}

	// Parse JSON request body
	if err := json.NewDecoder(r.Body).Decode(&jsonData); err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	// Create invoice
	invoice := models.Invoice{
		Name:         jsonData.Invoice.Name,
		Descriptions: jsonData.Invoice.Descriptions,
		IDAdmin:      jsonData.Invoice.IDAdmin,
		IDUser:       jsonData.Invoice.IDUser,
		TotalPrice:   jsonData.Invoice.TotalPrice,
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
	}

	// Add invoice items
	for _, item := range jsonData.Invoice.InvoiceItems {
		invoiceItem := models.InvoiceItem{
			Name:         item.Name,
			Descriptions: item.Descriptions,
			Quantity:     item.Quantity,
			NamePackages: item.NamePackages,
			Price:        item.Price,
			Circle:       item.Circle,
			NameImage:    item.NameImage,
			CreatedAt:    time.Now(),
			UpdatedAt:    time.Now(),
		}

		// Append invoice item to the invoice
		invoice.InvoiceItems = append(invoice.InvoiceItems, invoiceItem)
	}

	// Save invoice and items to the database
	if err := initializers.DB.Create(&invoice).Error; err != nil {
		http.Error(w, "Failed to create invoice", http.StatusInternalServerError)
		return
	}

	// Send success response
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Invoice and items created successfully"})
}
