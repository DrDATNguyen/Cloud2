package controllers

import (
	"encoding/json"
	"fmt"
	"go-api-project/handlers"
	"go-api-project/initializers"
	"go-api-project/models"
	"math/rand"
	"net/http"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
	"gopkg.in/gomail.v2"
	"gorm.io/gorm"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		// Đọc dữ liệu từ yêu cầu POST
		var requestData struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}

		// Giải mã dữ liệu JSON từ yêu cầu
		err := json.NewDecoder(r.Body).Decode(&requestData)
		if err != nil {
			http.Error(w, "Dữ liệu JSON không hợp lệ", http.StatusBadRequest)
			return
		}

		email := requestData.Email
		password := requestData.Password

		// Kiểm tra email và password có rỗng hay không
		if email == "" || password == "" {
			http.Error(w, "Email và Password là bắt buộc", http.StatusBadRequest)
			return
		}

		var user struct {
			ID             int
			UserName       string
			StoredPassword string
			Token          string
		}

		// Truy vấn cơ sở dữ liệu để lấy thông tin người dùng
		err = initializers.DB.Raw("SELECT ID, UserName, Pass AS StoredPassword, Token FROM Users WHERE Email = ?", email).
			Scan(&user).Error
		if err != nil {
			http.Error(w, "Email hoặc mật khẩu không hợp lệ", http.StatusUnauthorized)
			return
		}

		// So sánh mật khẩu nhập vào với mật khẩu đã băm trong cơ sở dữ liệu
		err = bcrypt.CompareHashAndPassword([]byte(user.StoredPassword), []byte(password))
		if err != nil {
			http.Error(w, "Email hoặc mật khẩu không hợp lệ", http.StatusUnauthorized)
			return
		}

		// Nếu token chưa tồn tại, tạo token mới
		if user.Token == "" {
			newToken, err := handlers.GenerateJWT(user.ID, email, "")
			if err != nil {
				http.Error(w, "Lỗi khi tạo token", http.StatusInternalServerError)
				return
			}

			// Cập nhật token trong cơ sở dữ liệu
			err = initializers.DB.Exec("UPDATE Users SET Token = ? WHERE ID = ?", newToken, user.ID).Error
			if err != nil {
				http.Error(w, "Lỗi khi cập nhật token trong cơ sở dữ liệu", http.StatusInternalServerError)
				return
			}

			user.Token = newToken
		}

		// Trả về thông tin người dùng dưới dạng JSON
		userInfo := map[string]interface{}{
			"ID":       user.ID,
			"UserName": user.UserName,
			"Email":    email,
			"Token":    user.Token,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(userInfo)
		return
	}

	// Trả về lỗi nếu phương thức không hợp lệ
	http.Error(w, "Phương thức không được hỗ trợ", http.StatusMethodNotAllowed)
}

// RegisterHandler xử lý yêu cầu đăng ký người dùng mới
func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Chỉ cho phép phương thức POST", http.StatusMethodNotAllowed)
		return
	}

	var requestData struct {
		Email    string `json:"email"`
		UserName string `json:"username"`
		Phone    string `json:"phone"`
		Pass     string `json:"pass"`
	}

	// Phân tích dữ liệu JSON từ yêu cầu
	err := json.NewDecoder(r.Body).Decode(&requestData)
	if err != nil {
		http.Error(w, "Dữ liệu JSON không hợp lệ", http.StatusBadRequest)
		return
	}

	email := requestData.Email
	userName := requestData.UserName
	phone := requestData.Phone
	password := requestData.Pass

	if email == "" || userName == "" || phone == "" || password == "" {
		http.Error(w, "Email, SĐT và Password là bắt buộc", http.StatusBadRequest)
		return
	}

	// Kiểm tra tính mạnh mẽ của mật khẩu
	if !handlers.IsStrongPassword(password) {
		http.Error(w, "Mật khẩu phải dài ít nhất 12 ký tự và bao gồm chữ hoa, chữ thường, số và ký hiệu đặc biệt", http.StatusBadRequest)
		return
	}

	// Mã hóa mật khẩu
	hashedPassword, err := handlers.HashPassword(password)
	if err != nil {
		http.Error(w, "Lỗi khi mã hóa mật khẩu", http.StatusInternalServerError)
		return
	}

	// Kiểm tra tính duy nhất của email và số điện thoại
	var existingUser models.User
	err = initializers.DB.Where("Email = ? OR PhoneNumber = ?", email, phone).First(&existingUser).Error
	if err == nil {
		http.Error(w, "Email hoặc số điện thoại đã được sử dụng", http.StatusConflict)
		return
	}

	// Tạo token cho người dùng mới
	token, err := handlers.GenerateJWT(0, email, phone)
	if err != nil {
		http.Error(w, "Lỗi khi tạo token", http.StatusInternalServerError)
		return
	}

	// Tạo người dùng mới
	timestamp := time.Now() // Lấy thời gian hiện tại
	newUser := models.User{
		Email:       email,
		UserName:    userName,
		PhoneNumber: phone,
		Pass:        hashedPassword,
		Token:       token,
		Wallet:      0,          // Giá trị mặc định
		Credit:      0,          // Giá trị mặc định
		Address:     "",         // Giá trị mặc định
		VIPuser:     "",         // Giá trị mặc định
		Status:      false,      // Giá trị mặc định
		Timestamp:   &timestamp, // Giá trị hiện tại cho timestamp
	}

	if err := initializers.DB.Omit("CreatedAt", "UpdatedAt", "DeletedAt").Create(&newUser).Error; err != nil {
		fmt.Printf("err", err)
		http.Error(w, "Lỗi khi đăng ký người dùng", http.StatusInternalServerError)
		return
	}

	// Trả về thông tin người dùng và thông báo thành công
	userInfo := map[string]interface{}{
		"ID":       newUser.ID,
		"UserName": newUser.UserName,
		"Email":    newUser.Email,
		"Phone":    newUser.PhoneNumber,
		"Token":    newUser.Token,
		"Message":  "Đăng ký thành công",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(userInfo)
}

// ChangePasswordHandler xử lý yêu cầu đổi mật khẩu người dùng
func ChangePasswordHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Chỉ cho phép phương thức POST", http.StatusMethodNotAllowed)
		return
	}

	var requestData struct {
		Email       string `json:"email"`
		OldPassword string `json:"old_pass"`
		NewPassword string `json:"new_pass"`
	}

	// Phân tích dữ liệu JSON từ yêu cầu
	err := json.NewDecoder(r.Body).Decode(&requestData)
	if err != nil {
		http.Error(w, "Dữ liệu JSON không hợp lệ", http.StatusBadRequest)
		return
	}

	email := requestData.Email
	oldPassword := requestData.OldPassword
	newPassword := requestData.NewPassword

	if email == "" || oldPassword == "" || newPassword == "" {
		http.Error(w, "Email, mật khẩu cũ và mật khẩu mới là bắt buộc", http.StatusBadRequest)
		return
	}

	// Kiểm tra tính mạnh mẽ của mật khẩu mới
	if !handlers.IsStrongPassword(newPassword) {
		http.Error(w, "Mật khẩu mới phải dài ít nhất 12 ký tự và bao gồm chữ hoa, chữ thường, số và ký hiệu đặc biệt", http.StatusBadRequest)
		return
	}

	// Mã hóa mật khẩu cũ và mới
	hashedOldPassword, err := handlers.HashPassword(oldPassword)
	if err != nil {
		http.Error(w, "Lỗi khi mã hóa mật khẩu cũ", http.StatusInternalServerError)
		return
	}
	hashedNewPassword, err := handlers.HashPassword(newPassword)
	if err != nil {
		http.Error(w, "Lỗi khi mã hóa mật khẩu mới", http.StatusInternalServerError)
		return
	}

	var user models.User

	// Truy vấn cơ sở dữ liệu để kiểm tra thông tin người dùng
	err = initializers.DB.Where("Email = ?", email).First(&user).Error
	if err != nil {
		http.Error(w, "Email không hợp lệ", http.StatusUnauthorized)
		return
	}

	// Kiểm tra mật khẩu cũ
	if user.Pass != hashedOldPassword {
		http.Error(w, "Mật khẩu cũ không đúng", http.StatusUnauthorized)
		return
	}

	// Cập nhật mật khẩu mới và tạo token mới
	newToken, err := handlers.GenerateJWT(int(user.ID), email, user.PhoneNumber)
	if err != nil {
		http.Error(w, "Lỗi khi tạo token mới", http.StatusInternalServerError)
		return
	}

	user.Pass = hashedNewPassword
	user.Token = newToken

	if err := initializers.DB.Save(&user).Error; err != nil {
		http.Error(w, "Lỗi khi cập nhật mật khẩu hoặc token trong cơ sở dữ liệu", http.StatusInternalServerError)
		return
	}

	// Trả về thông báo thành công
	response := map[string]interface{}{
		"Message": "Đổi mật khẩu thành công",
		"Token":   newToken,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// Handle profile request
func ProfileHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Chỉ cho phép phương thức GET", http.StatusMethodNotAllowed)
		return
	}

	// Lấy token từ header Authorization
	tokenString := r.Header.Get("Authorization")
	fmt.Println("tokenString:", tokenString)

	if tokenString == "" {
		http.Error(w, "Token không được cung cấp", http.StatusBadRequest)
		return
	}

	// Kiểm tra và loại bỏ tiền tố "Bearer "
	if strings.HasPrefix(tokenString, "Bearer ") {
		tokenString = strings.TrimPrefix(tokenString, "Bearer ")
	} else {
		http.Error(w, "Định dạng token không hợp lệ", http.StatusBadRequest)
		return
	}

	// Xác thực token và lấy thông tin người dùng
	claims, err := handlers.GetUserFromToken(tokenString)
	fmt.Println("err:", err)
	if err != nil {
		http.Error(w, "Token không hợp lệ hoặc đã hết hạn", http.StatusUnauthorized)
		return
	}

	// Truy vấn thông tin người dùng từ cơ sở dữ liệu
	var user models.User

	err = initializers.DB.First(&user, claims.ID).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			http.Error(w, "Không tìm thấy người dùng", http.StatusNotFound)
		} else {
			http.Error(w, "Lỗi truy vấn cơ sở dữ liệu", http.StatusInternalServerError)
		}
		return
	}

	// Tạo đối tượng chứa thông tin người dùng để trả về
	userInfo := struct {
		UserName    string  `json:"UserName"`
		Email       string  `json:"Email"`
		PhoneNumber string  `json:"PhoneNumber"`
		Wallet      float64 `json:"Wallet"`
		Credit      float64 `json:"Credit"`
		Address     string  `json:"Address"`
		VIPuser     string  `json:"VIPuser"`
	}{
		UserName:    user.UserName,
		Email:       user.Email,
		PhoneNumber: user.PhoneNumber,
		Wallet:      user.Wallet,
		Credit:      user.Credit,
		Address:     user.Address,
		VIPuser:     user.VIPuser,
	}

	// Trả về thông tin người dùng dưới dạng JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(userInfo)
}
func SendEmail(to string, subject string, body string) error {
	m := gomail.NewMessage()
	m.SetHeader("From", "nguyendatdeptrai21092003@gmail.com")
	m.SetHeader("To", to)
	m.SetHeader("Subject", subject)
	m.SetBody("text/plain", body)

	d := gomail.NewDialer("smtp.gmail.com", 587, "nguyendatdeptrai21092003@gmail.com", "Dat210903@")
	return d.DialAndSend(m)
}

func generateRandomCode() string {
	rand.Seed(time.Now().UnixNano())
	code := rand.Intn(900000) + 100000 // Generate a 6-digit random number
	return fmt.Sprintf("%06d", code)
}

type VerificationCode struct {
	ID        uint      `gorm:"primaryKey"`
	Email     string    `gorm:"not null"`
	Code      string    `gorm:"not null"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
}

// LostPassHandler xử lý yêu cầu khôi phục mật khẩu
func LostPassHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		var requestData struct {
			Email   string `json:"email"`
			Code    string `json:"code"`
			NewPass string `json:"new_pass"`
		}

		// Phân tích dữ liệu JSON từ yêu cầu
		err := json.NewDecoder(r.Body).Decode(&requestData)
		if err != nil {
			http.Error(w, "Dữ liệu JSON không hợp lệ", http.StatusBadRequest)
			return
		}

		email := requestData.Email
		code := requestData.Code
		newPass := requestData.NewPass

		if email != "" && code == "" && newPass == "" {
			// Xử lý yêu cầu gửi mã xác nhận
			var user models.User

			// Kiểm tra email có tồn tại không
			if err := initializers.DB.Where("email = ?", email).First(&user).Error; err != nil {
				if err == gorm.ErrRecordNotFound {
					http.Error(w, "Email không tồn tại", http.StatusNotFound)
				} else {
					http.Error(w, "Lỗi truy vấn cơ sở dữ liệu", http.StatusInternalServerError)
				}
				return
			}

			// Tạo mã xác nhận và gửi email
			code := generateRandomCode()
			subject := "Mã xác nhận đổi mật khẩu"
			body := fmt.Sprintf("Mã xác nhận của bạn là: %s", code)
			err = SendEmail(email, subject, body)
			if err != nil {
				http.Error(w, "Lỗi khi gửi email", http.StatusInternalServerError)
				return
			}

			// Lưu mã xác nhận vào cơ sở dữ liệu
			verification := VerificationCode{Email: email, Code: code}
			if err := initializers.DB.Create(&verification).Error; err != nil {
				http.Error(w, "Lỗi khi lưu mã xác nhận", http.StatusInternalServerError)
				return
			}

			// Trả về thông báo thành công
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]string{"Message": "Mã xác nhận đã được gửi"})
			return
		}

		if email != "" && code != "" && newPass != "" {
			// Xử lý yêu cầu xác nhận mã và đổi mật khẩu
			var verification VerificationCode

			// Kiểm tra mã xác nhận
			if err := initializers.DB.Where("email = ? AND code = ?", email, code).First(&verification).Error; err != nil {
				if err == gorm.ErrRecordNotFound {
					http.Error(w, "Mã xác nhận không hợp lệ", http.StatusUnauthorized)
				} else {
					http.Error(w, "Lỗi truy vấn cơ sở dữ liệu", http.StatusInternalServerError)
				}
				return
			}

			// Kiểm tra tính mạnh mẽ của mật khẩu mới
			if !handlers.IsStrongPassword(newPass) {
				http.Error(w, "Mật khẩu mới phải dài ít nhất 12 ký tự và bao gồm chữ hoa, chữ thường, số và ký hiệu đặc biệt", http.StatusBadRequest)
				return
			}

			// Mã hóa mật khẩu mới
			hashedNewPassword, err := handlers.HashPassword(newPass)
			if err != nil {
				http.Error(w, "Lỗi mã hóa mật khẩu", http.StatusInternalServerError)
				return
			}

			// Cập nhật mật khẩu mới vào cơ sở dữ liệu
			var user models.User
			if err := initializers.DB.Model(&user).Update("Pass", hashedNewPassword).Error; err != nil {
				http.Error(w, "Lỗi khi cập nhật mật khẩu", http.StatusInternalServerError)
				return
			}

			// Xóa mã xác nhận sau khi sử dụng (nếu cần)
			if err := initializers.DB.Delete(&verification).Error; err != nil {
				http.Error(w, "Lỗi khi xóa mã xác nhận", http.StatusInternalServerError)
				return
			}

			// Trả về thông báo thành công
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]string{"Message": "Mật khẩu đã được thay đổi thành công"})
			return
		}

		http.Error(w, "Dữ liệu không hợp lệ", http.StatusBadRequest)
		return
	}

	http.Error(w, "Phương thức không được hỗ trợ", http.StatusMethodNotAllowed)
}
