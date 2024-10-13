// package main

// import (
// 	"crypto/md5"
// 	"database/sql"
// 	"encoding/hex"
// 	"encoding/json"
// 	"fmt"
// 	"log"
// 	"math/rand"
// 	"net/http"
// 	"os"
// 	"regexp"
// 	"strings"
// 	"testing"
// 	"time"

// 	"github.com/golang-jwt/jwt/v5"
// 	"github.com/joho/godotenv"

// 	_ "github.com/go-sql-driver/mysql"
// 	"gopkg.in/gomail.v2"
// )

// var db *sql.DB
// var jwtKey = []byte("your_secret_key")

// // Middleware xử lý CORS
// func enableCORS(next http.Handler) http.Handler {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		// Thêm tiêu đề CORS
// 		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000") // Cho phép từ localhost:3000
// 		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
// 		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

// 		// Xử lý preflight request của CORS
// 		if r.Method == http.MethodOptions {
// 			return
// 		}

// 		// Chuyển tiếp đến handler tiếp theo
// 		next.ServeHTTP(w, r)
// 	})
// }

// // Structure to store user information in the token
// type Claims struct {
// 	ID    int    `json:"id"`
// 	Email string `json:"email"`
// 	SDT   string `json:"SDT"`
// 	jwt.RegisteredClaims
// }

// // Initialize the MySQL database connection
// func initDB() {
// 	var err error
// 	err = godotenv.Load(".env")
// 	if err != nil {
// 		log.Fatalf("Error loading .env file: %v", err)
// 	}

// 	dbHost := os.Getenv("DB_HOST")
// 	dbUser := os.Getenv("DB_USER")
// 	dbPass := os.Getenv("DB_PASS")
// 	dbName := os.Getenv("DB_NAME")

// 	dsn := fmt.Sprintf("%s:%s@tcp(%s:3306)/%s", dbUser, dbPass, dbHost, dbName)
// 	db, err = sql.Open("mysql", dsn)
// 	if err != nil {
// 		log.Fatalf("Could not connect to MySQL: %v", err)
// 	}
// 	if err = db.Ping(); err != nil {
// 		log.Fatalf("Could not connect to MySQL: %v", err)
// 	}
// 	fmt.Println("Connected to MySQL successfully!")
// }

// // Generate a JWT token with user information
// func generateJWT(id int, email string, SDT string) (string, error) {
// 	claims := &Claims{
// 		ID:    id,
// 		Email: email,
// 		SDT:   SDT,
// 	}

// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
// 	tokenString, err := token.SignedString(jwtKey)
// 	if err != nil {
// 		return "", err
// 	}
// 	return tokenString, nil
// }
// func getUserFromToken(tokenString string) (Claims, error) {
// 	claims := &Claims{}
// 	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
// 		return jwtKey, nil
// 	})
// 	if err != nil {
// 		return *claims, err
// 	}
// 	if !token.Valid {
// 		return *claims, fmt.Errorf("Token không hợp lệ")
// 	}
// 	return *claims, nil
// }

// func TestJWTFunctions(t *testing.T) {
// 	// Giả lập thông tin người dùng
// 	userID := 4
// 	userEmail := "example@example.com"
// 	userSDT := "1234567890"

// 	// Tạo token
// 	token, err := generateJWT(userID, userEmail, userSDT)
// 	if err != nil {
// 		t.Fatalf("Error generating JWT: %v", err)
// 	}
// 	fmt.Println("Generated Token:", token)

// 	// Lấy thông tin người dùng từ token
// 	claims, err := getUserFromToken(token)
// 	if err != nil {
// 		t.Fatalf("Error getting user from token: %v", err)
// 	}

// 	// So sánh thông tin người dùng
// 	if claims.ID != userID {
// 		t.Errorf("Expected user ID %d, but got %d", userID, claims.ID)
// 	}
// 	if claims.Email != userEmail {
// 		t.Errorf("Expected email %s, but got %s", userEmail, claims.Email)
// 	}
// 	if claims.SDT != userSDT {
// 		t.Errorf("Expected SDT %s, but got %s", userSDT, claims.SDT)
// 	}
// }

// // Hàm xử lý yêu cầu đăng nhập
// func loginHandler(w http.ResponseWriter, r *http.Request) {
// 	if r.Method == http.MethodPost {
// 		// Xử lý yêu cầu POST với email và password
// 		var requestData struct {
// 			Email    string `json:"email"`
// 			Password string `json:"password"` // Đổi tên thành "password" để đồng nhất với Frontend
// 		}

// 		err := json.NewDecoder(r.Body).Decode(&requestData)
// 		fmt.Println("err", err)
// 		if err != nil {
// 			http.Error(w, "Invalid JSON input", http.StatusBadRequest)
// 			return
// 		}

// 		email := requestData.Email
// 		password := requestData.Password // Cập nhật lại để sử dụng tên "password"

// 		if email == "" || password == "" {
// 			http.Error(w, "Email và Password là bắt buộc", http.StatusBadRequest)
// 			return
// 		}

// 		var id int
// 		var storedPassword string
// 		var token, userName *string

// 		// Mã hóa mật khẩu nhập vào bằng MD5 ba lần
// 		hashedPassword := hashPassword(password)

// 		// Truy vấn cơ sở dữ liệu để kiểm tra thông tin người dùng
// 		err = db.QueryRow("SELECT ID, UserName, Pass, Token FROM Users WHERE Email = ?", email).Scan(&id, &userName, &storedPassword, &token)
// 		fmt.Println("err", err)
// 		if err != nil {
// 			http.Error(w, "Email hoặc mật khẩu không hợp lệ", http.StatusUnauthorized)
// 			return
// 		}
// 		fmt.Println("storedPassword", storedPassword)
// 		fmt.Println("hashedPassword", hashedPassword)

// 		if storedPassword != hashedPassword {
// 			http.Error(w, "Email hoặc mật khẩu không hợp lệ", http.StatusUnauthorized)
// 			return
// 		}

// 		if token == nil || *token == "" {
// 			newToken, err := generateJWT(id, email, "")
// 			if err != nil {
// 				http.Error(w, "Lỗi khi tạo token", http.StatusInternalServerError)
// 				return
// 			}

// 			_, err = db.Exec("UPDATE Users SET Token = ? WHERE ID = ?", newToken, id)
// 			if err != nil {
// 				http.Error(w, "Lỗi khi cập nhật token trong cơ sở dữ liệu", http.StatusInternalServerError)
// 				return
// 			}

// 			token = &newToken
// 		}

// 		// Trả về thông tin người dùng dưới dạng JSON
// 		userInfo := map[string]interface{}{
// 			"ID":       id,
// 			"UserName": userName,
// 			"Email":    email,
// 			"Token":    *token,
// 		}

// 		w.Header().Set("Content-Type", "application/json")
// 		json.NewEncoder(w).Encode(userInfo)
// 		return
// 	}

// 	// Trả về lỗi nếu phương thức không hợp lệ
// 	http.Error(w, "Phương thức không được hỗ trợ", http.StatusMethodNotAllowed)
// }

// // Hàm mã hóa mật khẩu bằng MD5 ba lần
// func hashPassword(password string) string {
// 	hasher := md5.New()
// 	hasher.Write([]byte(password))
// 	hash := hasher.Sum(nil)
// 	for i := 0; i < 2; i++ {
// 		hasher.Reset()
// 		hasher.Write(hash)
// 		hash = hasher.Sum(nil)
// 	}
// 	return hex.EncodeToString(hash)
// }

// // Hàm kiểm tra mật khẩu mạnh
// // Hàm kiểm tra mật khẩu mạnh
// func isStrongPassword(password string) bool {
// 	if len(password) < 12 {
// 		return false
// 	}

// 	hasUpper := regexp.MustCompile(`[A-Z]`).MatchString(password)
// 	hasLower := regexp.MustCompile(`[a-z]`).MatchString(password)
// 	hasDigit := regexp.MustCompile(`[0-9]`).MatchString(password)
// 	hasSpecial := regexp.MustCompile(`[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'",.<>/?\\|]`).MatchString(password)

// 	return hasUpper && hasLower && hasDigit && hasSpecial
// }

// // Hàm xử lý yêu cầu đăng ký
// func registerHandler(w http.ResponseWriter, r *http.Request) {
// 	if r.Method != http.MethodPost {
// 		http.Error(w, "Chỉ cho phép phương thức POST", http.StatusMethodNotAllowed)
// 		return
// 	}

// 	var requestData struct {
// 		Email    string `json:"email"`
// 		UserName string `json:"username"`
// 		Phone    string `json:"phone"`
// 		Pass     string `json:"pass"`
// 	}

// 	// Phân tích dữ liệu JSON từ yêu cầu
// 	err := json.NewDecoder(r.Body).Decode(&requestData)
// 	if err != nil {
// 		http.Error(w, "Dữ liệu JSON không hợp lệ", http.StatusBadRequest)
// 		return
// 	}

// 	email := requestData.Email
// 	userName := requestData.UserName
// 	phone := requestData.Phone
// 	password := requestData.Pass

// 	if email == "" || userName == "" || phone == "" || password == "" {
// 		http.Error(w, "Email, SĐT và Password là bắt buộc", http.StatusBadRequest)
// 		return
// 	}

// 	// Kiểm tra tính mạnh mẽ của mật khẩu
// 	if !isStrongPassword(password) {
// 		http.Error(w, "Mật khẩu phải dài ít nhất 12 ký tự và bao gồm chữ hoa, chữ thường, số và ký hiệu đặc biệt", http.StatusBadRequest)
// 		return
// 	}

// 	// Mã hóa mật khẩu
// 	hashedPassword := hashPassword(password)

// 	// Kiểm tra tính duy nhất của email và số điện thoại
// 	var existingID int
// 	err = db.QueryRow("SELECT ID FROM Users WHERE Email = ? OR PhoneNumber = ?", email, phone).Scan(&existingID)
// 	if err == nil {
// 		http.Error(w, "Email hoặc số điện thoại đã được sử dụng", http.StatusConflict)
// 		return
// 	}

// 	// Tạo token cho người dùng mới
// 	newID := 0
// 	token, err := generateJWT(newID, email, phone)
// 	if err != nil {
// 		http.Error(w, "Lỗi khi tạo token", http.StatusInternalServerError)
// 		return
// 	}

// 	// Thực hiện việc thêm người dùng vào cơ sở dữ liệu
// 	_, err = db.Exec("INSERT INTO Users (Email, UserName, PhoneNumber, Pass, Token) VALUES (?, ?, ?, ?,?)", email, userName, phone, hashedPassword, token)
// 	fmt.Printf("err", err)
// 	if err != nil {
// 		http.Error(w, "Lỗi khi đăng ký người dùng", http.StatusInternalServerError)
// 		return
// 	}

// 	// Trả về thông tin người dùng và thông báo thành công
// 	userInfo := map[string]interface{}{
// 		"ID":       newID,
// 		"UserName": userName,
// 		"Email":    email,
// 		"Phone":    phone,
// 		"Token":    token,
// 		"Message":  "Đăng ký thành công",
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(userInfo)
// }

// // Hàm xử lý yêu cầu đổi mật khẩu
// func changePasswordHandler(w http.ResponseWriter, r *http.Request) {
// 	if r.Method != http.MethodPost {
// 		http.Error(w, "Chỉ cho phép phương thức POST", http.StatusMethodNotAllowed)
// 		return
// 	}

// 	var requestData struct {
// 		Email       string `json:"email"`
// 		OldPassword string `json:"old_pass"`
// 		NewPassword string `json:"new_pass"`
// 	}

// 	// Phân tích dữ liệu JSON từ yêu cầu
// 	err := json.NewDecoder(r.Body).Decode(&requestData)
// 	if err != nil {
// 		http.Error(w, "Dữ liệu JSON không hợp lệ", http.StatusBadRequest)
// 		return
// 	}

// 	email := requestData.Email
// 	oldPassword := requestData.OldPassword
// 	newPassword := requestData.NewPassword

// 	if email == "" || oldPassword == "" || newPassword == "" {
// 		http.Error(w, "Email, mật khẩu cũ và mật khẩu mới là bắt buộc", http.StatusBadRequest)
// 		return
// 	}

// 	// Kiểm tra tính mạnh mẽ của mật khẩu mới
// 	if !isStrongPassword(newPassword) {
// 		http.Error(w, "Mật khẩu mới phải dài ít nhất 12 ký tự và bao gồm chữ hoa, chữ thường, số và ký hiệu đặc biệt", http.StatusBadRequest)
// 		return
// 	}

// 	// Mã hóa mật khẩu cũ và mới bằng MD5 ba lần
// 	hashedOldPassword := hashPassword(oldPassword)
// 	hashedNewPassword := hashPassword(newPassword)

// 	var id int
// 	var storedPassword, token, SDT string

// 	// Truy vấn cơ sở dữ liệu để kiểm tra thông tin người dùng
// 	err = db.QueryRow("SELECT ID, Pass, Token,PhoneNumber FROM Users WHERE Email = ?", email).Scan(&id, &storedPassword, &token, &SDT)
// 	fmt.Println("err", err)

// 	if err != nil {
// 		http.Error(w, "Email không hợp lệ", http.StatusUnauthorized)
// 		return
// 	}

// 	// Kiểm tra mật khẩu cũ
// 	if storedPassword != hashedOldPassword {
// 		http.Error(w, "Mật khẩu cũ không đúng", http.StatusUnauthorized)
// 		return
// 	}

// 	// Cập nhật mật khẩu mới và tạo token mới
// 	newToken, err := generateJWT(id, email, SDT)
// 	if err != nil {
// 		http.Error(w, "Lỗi khi tạo token mới", http.StatusInternalServerError)
// 		return
// 	}

// 	_, err = db.Exec("UPDATE Users SET Pass = ?, Token = ? WHERE ID = ?", hashedNewPassword, newToken, id)
// 	if err != nil {
// 		http.Error(w, "Lỗi khi cập nhật mật khẩu hoặc token trong cơ sở dữ liệu", http.StatusInternalServerError)
// 		return
// 	}

// 	// Trả về thông báo thành công
// 	response := map[string]interface{}{
// 		"Message": "Đổi mật khẩu thành công",
// 		"Token":   newToken,
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(response)
// }

// // Handle profile request
// func profileHandler(w http.ResponseWriter, r *http.Request) {
// 	if r.Method != http.MethodGet {
// 		http.Error(w, "Chỉ cho phép phương thức GET", http.StatusMethodNotAllowed)
// 		return
// 	}

// 	// Lấy token từ header Authorization
// 	tokenString := r.Header.Get("Authorization")
// 	fmt.Println("tokenString:", tokenString)

// 	if tokenString == "" {
// 		http.Error(w, "Token không được cung cấp", http.StatusBadRequest)
// 		return
// 	}

// 	// Kiểm tra và loại bỏ tiền tố "Bearer "
// 	if strings.HasPrefix(tokenString, "Bearer ") {
// 		tokenString = strings.TrimPrefix(tokenString, "Bearer ")
// 	} else {
// 		http.Error(w, "Định dạng token không hợp lệ", http.StatusBadRequest)
// 		return
// 	}

// 	// Xác thực token và lấy thông tin người dùng
// 	claims, err := getUserFromToken(tokenString)
// 	fmt.Println("err:", err)
// 	if err != nil {
// 		http.Error(w, "Token không hợp lệ hoặc đã hết hạn", http.StatusUnauthorized)
// 		return
// 	}

// 	// Truy vấn thông tin người dùng từ cơ sở dữ liệu
// 	var userInfo struct {
// 		UserName    *string  `json:"UserName"`
// 		Email       *string  `json:"Email"`
// 		PhoneNumber *int     `json:"PhoneNumber"`
// 		Wallet      *float64 `json:"Wallet"`
// 		Credit      *float64 `json:"Credit"`
// 		Address     *string  `json:"Address"`
// 		VIPuser     *string  `json:"VIPuser"`
// 	}

// 	err = db.QueryRow("SELECT UserName, Email, PhoneNumber, Wallet, Credit, Address, VIPuser FROM Users WHERE ID = ?", claims.ID).
// 		Scan(&userInfo.UserName, &userInfo.Email, &userInfo.PhoneNumber, &userInfo.Wallet, &userInfo.Credit, &userInfo.Address, &userInfo.VIPuser)
// 	fmt.Println("err:", err)
// 	if err != nil {
// 		if err == sql.ErrNoRows {
// 			http.Error(w, "Không tìm thấy người dùng", http.StatusNotFound)
// 		} else {
// 			http.Error(w, "Lỗi truy vấn cơ sở dữ liệu", http.StatusInternalServerError)
// 		}
// 		return
// 	}

// 	// Trả về thông tin người dùng dưới dạng JSON
// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(userInfo)
// }
// func sendEmail(to string, subject string, body string) error {
// 	m := gomail.NewMessage()
// 	m.SetHeader("From", "nguyendatdeptrai21092003@gmail.com")
// 	m.SetHeader("To", to)
// 	m.SetHeader("Subject", subject)
// 	m.SetBody("text/plain", body)

// 	d := gomail.NewDialer("smtp.gmail.com", 587, "nguyendatdeptrai21092003@gmail.com", "Dat210903@")
// 	return d.DialAndSend(m)
// }

// func generateRandomCode() string {
// 	rand.Seed(time.Now().UnixNano())
// 	code := rand.Intn(900000) + 100000 // Generate a 6-digit random number
// 	return fmt.Sprintf("%06d", code)
// }

// func lostPassHandler(w http.ResponseWriter, r *http.Request) {
// 	if r.Method == http.MethodPost {
// 		var requestData struct {
// 			Email   string `json:"email"`
// 			Code    string `json:"code"`
// 			NewPass string `json:"new_pass"`
// 		}

// 		// Phân tích dữ liệu JSON từ yêu cầu
// 		err := json.NewDecoder(r.Body).Decode(&requestData)
// 		if err != nil {
// 			http.Error(w, "Dữ liệu JSON không hợp lệ", http.StatusBadRequest)
// 			return
// 		}

// 		email := requestData.Email
// 		code := requestData.Code
// 		newPass := requestData.NewPass

// 		if email != "" && code == "" && newPass == "" {
// 			// Xử lý yêu cầu gửi mã xác nhận
// 			var id int
// 			// var storedEmail string

// 			// Kiểm tra email có tồn tại không
// 			err = db.QueryRow("SELECT ID FROM Users WHERE Email = ?", email).Scan(&id)
// 			if err != nil {
// 				if err == sql.ErrNoRows {
// 					http.Error(w, "Email không tồn tại", http.StatusNotFound)
// 				} else {
// 					http.Error(w, "Lỗi truy vấn cơ sở dữ liệu", http.StatusInternalServerError)
// 				}
// 				return
// 			}

// 			// Tạo mã xác nhận và gửi email
// 			code := generateRandomCode()
// 			subject := "Mã xác nhận đổi mật khẩu"
// 			body := fmt.Sprintf("Mã xác nhận của bạn là: %s", code)
// 			err = sendEmail(email, subject, body)
// 			fmt.Println(err)
// 			if err != nil {
// 				http.Error(w, "Lỗi khi gửi email", http.StatusInternalServerError)
// 				return
// 			}

// 			// Lưu mã xác nhận vào cơ sở dữ liệu hoặc bộ nhớ tạm thời (ví dụ: Redis, bộ nhớ máy chủ, v.v.)
// 			// Đây chỉ là ví dụ, hãy thay đổi cách lưu mã xác nhận tùy theo yêu cầu của bạn

// 			// Trả về thông báo thành công
// 			w.Header().Set("Content-Type", "application/json")
// 			json.NewEncoder(w).Encode(map[string]string{"Message": "Mã xác nhận đã được gửi"})
// 			return
// 		}

// 		if email != "" && code != "" && newPass == "" {
// 			// Xử lý yêu cầu xác nhận mã và đổi mật khẩu
// 			var storedCode string
// 			// var id int
// 			// var storedPassword string

// 			// Kiểm tra mã xác nhận
// 			// Đây chỉ là ví dụ, hãy thay đổi cách lưu mã xác nhận tùy theo yêu cầu của bạn
// 			// so sánh mã xác nhận nhập vào với mã lưu trong cơ sở dữ liệu hoặc bộ nhớ tạm thời

// 			if code != storedCode {
// 				http.Error(w, "Mã xác nhận không hợp lệ", http.StatusUnauthorized)
// 				return
// 			}

// 			// Nếu mã xác nhận đúng, cho phép thay đổi mật khẩu
// 			if !isStrongPassword(newPass) {
// 				http.Error(w, "Mật khẩu mới phải dài ít nhất 12 ký tự và bao gồm chữ hoa, chữ thường, số và ký hiệu đặc biệt", http.StatusBadRequest)
// 				return
// 			}

// 			// Mã hóa mật khẩu mới
// 			hashedNewPassword := hashPassword(newPass)

// 			// Cập nhật mật khẩu mới vào cơ sở dữ liệu
// 			_, err = db.Exec("UPDATE Users SET Pass = ? WHERE Email = ?", hashedNewPassword, email)
// 			if err != nil {
// 				http.Error(w, "Lỗi khi cập nhật mật khẩu", http.StatusInternalServerError)
// 				return
// 			}

// 			// Trả về thông báo thành công
// 			w.Header().Set("Content-Type", "application/json")
// 			json.NewEncoder(w).Encode(map[string]string{"Message": "Mật khẩu đã được thay đổi thành công"})
// 			return
// 		}

// 		http.Error(w, "Dữ liệu không hợp lệ", http.StatusBadRequest)
// 		return
// 	}

// 	http.Error(w, "Phương thức không được hỗ trợ", http.StatusMethodNotAllowed)
// }
// func getTypeOfProductsHandler(w http.ResponseWriter, r *http.Request) {
// 	if r.Method != http.MethodGet {
// 		http.Error(w, "Chỉ cho phép phương thức GET", http.StatusMethodNotAllowed)
// 		return
// 	}

// 	rows, err := db.Query("SELECT ID, TypeProduct, Descriptions, parentId FROM TypeOfproducts")
// 	fmt.Println(err)
// 	if err != nil {
// 		http.Error(w, "Lỗi khi truy vấn cơ sở dữ liệu", http.StatusInternalServerError)
// 		return
// 	}
// 	defer rows.Close()

// 	var types []map[string]interface{}
// 	for rows.Next() {
// 		var id, parentId int
// 		var typeProduct string
// 		var descriptions *string
// 		if err := rows.Scan(&id, &typeProduct, &descriptions, &parentId); err != nil {
// 			http.Error(w, "Lỗi khi đọc dữ liệu", http.StatusInternalServerError)
// 			return
// 		}
// 		types = append(types, map[string]interface{}{
// 			"ID":           id,
// 			"TypeProduct":  typeProduct,
// 			"Descriptions": descriptions,
// 			"parentId":     parentId,
// 		})
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(types)
// }
// func getProductsHandler(w http.ResponseWriter, r *http.Request) {
// 	if r.Method != http.MethodGet {
// 		http.Error(w, "Chỉ cho phép phương thức GET", http.StatusMethodNotAllowed)
// 		return
// 	}

// 	rows, err := db.Query("SELECT ID, NameProduct, Descriptions, parent FROM products")
// 	if err != nil {
// 		http.Error(w, "Lỗi khi truy vấn cơ sở dữ liệu", http.StatusInternalServerError)
// 		return
// 	}
// 	defer rows.Close()

// 	var products []map[string]interface{}
// 	for rows.Next() {
// 		var id, parent int
// 		var nameProduct, descriptions string
// 		if err := rows.Scan(&id, &nameProduct, &descriptions, &parent); err != nil {
// 			http.Error(w, "Lỗi khi đọc dữ liệu", http.StatusInternalServerError)
// 			return
// 		}
// 		products = append(products, map[string]interface{}{
// 			"ID":           id,
// 			"NameProduct":  nameProduct,
// 			"Descriptions": descriptions,
// 			"parent":       parent,
// 		})
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(products)
// }
// func getProductsPackageHandler(w http.ResponseWriter, r *http.Request) {
// 	if r.Method != http.MethodGet {
// 		http.Error(w, "Chỉ cho phép phương thức GET", http.StatusMethodNotAllowed)
// 		return
// 	}

// 	rows, err := db.Query("SELECT ID, NameProduct, RAM, CPU, Storage, Price, ProductID FROM productsPackage")
// 	if err != nil {
// 		http.Error(w, "Lỗi khi truy vấn cơ sở dữ liệu", http.StatusInternalServerError)
// 		return
// 	}
// 	defer rows.Close()

// 	var packages []map[string]interface{}
// 	for rows.Next() {
// 		var id int
// 		var nameProduct, ram, cpu, storage string
// 		var price float64
// 		var productID int
// 		if err := rows.Scan(&id, &nameProduct, &ram, &cpu, &storage, &price, &productID); err != nil {
// 			http.Error(w, "Lỗi khi đọc dữ liệu", http.StatusInternalServerError)
// 			return
// 		}
// 		packages = append(packages, map[string]interface{}{
// 			"ID":          id,
// 			"NameProduct": nameProduct,
// 			"RAM":         ram,
// 			"CPU":         cpu,
// 			"Storage":     storage,
// 			"Price":       price,
// 			"ProductID":   productID,
// 		})
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(packages)
// }

// type Image struct {
// 	ID           int    `json:"id"`
// 	NameImage    string `json:"name_image"`
// 	Descriptions string `json:"descriptions"`
// 	Thumb        string `json:"thumb"`
// 	Type         string `json:"type"`
// }

// func getImageHandler(w http.ResponseWriter, r *http.Request) {
// 	if r.Method != http.MethodGet {
// 		http.Error(w, "Chỉ cho phép phương thức GET", http.StatusMethodNotAllowed)
// 		return
// 	}

// 	rows, err := db.Query("SELECT ID, NameImage, Descriptions, Thump, Type FROM Image")
// 	if err != nil {
// 		http.Error(w, "Lỗi khi truy vấn cơ sở dữ liệu", http.StatusInternalServerError)
// 		return
// 	}
// 	defer rows.Close()

// 	var images []Image
// 	for rows.Next() {
// 		var img Image
// 		err := rows.Scan(&img.ID, &img.NameImage, &img.Descriptions, &img.Thumb, &img.Type)
// 		if err != nil {
// 			http.Error(w, "Lỗi khi quét dữ liệu từ cơ sở dữ liệu", http.StatusInternalServerError)
// 			return
// 		}
// 		images = append(images, img)
// 	}

// 	// Trả về kết quả dưới dạng JSON
// 	w.Header().Set("Content-Type", "application/json")
// 	err = json.NewEncoder(w).Encode(images)
// 	if err != nil {
// 		http.Error(w, "Lỗi khi mã hóa dữ liệu JSON", http.StatusInternalServerError)
// 		return
// 	}
// }

// type ProductImage struct {
// 	ID           int    `json:"id"`
// 	Name         string `json:"name"`
// 	Descriptions string `json:"descriptions"`
// 	Thump        string `json:"thump"`
// 	Type         string `json:"type"`
// 	Content      string `json:"content"`
// 	Slug         string `json:"slug"`
// 	ID_Product   int    `json:"id_product"`
// }

// type ProductPackage struct {
// 	ID             int      `json:"id"`
// 	Name           string   `json:"name"`
// 	RAM            string   `json:"ram"`
// 	CPU            string   `json:"cpu"`
// 	Storage        string   `json:"storage"`
// 	Price          float64  `json:"price"`
// 	ID_Product     int      `json:"id_product"`
// 	Hourly         *bool    `json:"hourly"`
// 	Monthly        *bool    `json:"monthly"`
// 	Quarterly      *bool    `json:"quarterly"`
// 	Biannually     *bool    `json:"biannually"`
// 	Annually       *bool    `json:"annually"`
// 	Biennially     *bool    `json:"biennially"`
// 	Triennially    *bool    `json:"triennially"`
// 	Quinquennially *bool    `json:"quinquennially"`
// 	Decennially    *bool    `json:"decennially"`
// 	Content        *string  `json:"content"`
// 	Thumb          *string  `json:"thumb"`
// 	Slug           *string  `json:"slug"`
// 	DataStranfer   *string  `json:"data_stranfer"`
// 	Bandwidth      *string  `json:"bandwidth"`
// 	Tax            *float64 `json:"tax"`
// }

// type Product struct {
// 	ID                int              `json:"id"`
// 	Name              string           `json:"name"`
// 	Descriptions      string           `json:"descriptions"`
// 	Content           string           `json:"content"`
// 	Thumb             *string          `json:"thumb"`
// 	Slug              string           `json:"slug"`
// 	ID_Products_Types int              `json:"id_products_types"`
// 	Packages          []ProductPackage `json:"packages"`
// 	Images            []ProductImage   `json:"images"`
// }

// type ProductType struct {
// 	ID           int       `json:"id"`
// 	Name         string    `json:"name"`
// 	Descriptions string    `json:"descriptions"`
// 	Content      string    `json:"content"`
// 	Thumb        *string   `json:"thumb"`
// 	Slug         string    `json:"slug"`
// 	Products     []Product `json:"products"`
// }

// func getProducts(w http.ResponseWriter, r *http.Request) {
// 	if r.Method != http.MethodGet {
// 		http.Error(w, "Chỉ cho phép phương thức GET", http.StatusMethodNotAllowed)
// 		return
// 	}

// 	// Lấy danh sách các loại sản phẩm
// 	rows, err := db.Query("SELECT ID, name, Descriptions, content, thumb, slug FROM products_type")
// 	if err != nil {
// 		http.Error(w, "Error fetching product types", http.StatusInternalServerError)
// 		return
// 	}
// 	defer rows.Close()

// 	var productTypes []ProductType

// 	for rows.Next() {
// 		var pt ProductType
// 		if err := rows.Scan(&pt.ID, &pt.Name, &pt.Descriptions, &pt.Content, &pt.Thumb, &pt.Slug); err != nil {
// 			http.Error(w, "Error scanning product types", http.StatusInternalServerError)
// 			return
// 		}

// 		// Lấy sản phẩm theo ID loại sản phẩm
// 		productsRows, err := db.Query("SELECT ID, name, Descriptions, content, thumb, slug, ID_products_types FROM products WHERE ID_products_types = ?", pt.ID)
// 		if err != nil {
// 			http.Error(w, "Error fetching products", http.StatusInternalServerError)
// 			return
// 		}
// 		defer productsRows.Close()

// 		for productsRows.Next() {
// 			var p Product
// 			if err := productsRows.Scan(&p.ID, &p.Name, &p.Descriptions, &p.Content, &p.Thumb, &p.Slug, &p.ID_Products_Types); err != nil {
// 				http.Error(w, "Error scanning products", http.StatusInternalServerError)
// 				return
// 			}

// 			// Lấy thông tin product package
// 			packagesRows, err := db.Query("SELECT ID, Name, RAM, CPU, Storage, Price, ID_Product, Hourly, Monthly, Quarterly, Biannually, Annually, Biennially, Triennially, Quinquennially, Decennially, content, thumb, slug, data_stranfer, bandwidth, tax FROM productsPackage WHERE ID_Product = ?", p.ID)
// 			if err != nil {
// 				http.Error(w, "Error fetching product packages", http.StatusInternalServerError)
// 				return
// 			}
// 			defer packagesRows.Close()

// 			for packagesRows.Next() {
// 				var pp ProductPackage
// 				if err := packagesRows.Scan(&pp.ID, &pp.Name, &pp.RAM, &pp.CPU, &pp.Storage, &pp.Price, &pp.ID_Product, &pp.Hourly, &pp.Monthly, &pp.Quarterly, &pp.Biannually, &pp.Annually, &pp.Biennially, &pp.Triennially, &pp.Quinquennially, &pp.Decennially, &pp.Content, &pp.Thumb, &pp.Slug, &pp.DataStranfer, &pp.Bandwidth, &pp.Tax); err != nil {
// 					http.Error(w, "Error scanning product packages", http.StatusInternalServerError)
// 					return
// 				}
// 				p.Packages = append(p.Packages, pp)
// 			}

// 			// Lấy thông tin product image
// 			imagesRows, err := db.Query("SELECT ID, Name, Descriptions, Thump, Type, content, slug, ID_product FROM product_image WHERE ID_product = ?", p.ID)
// 			if err != nil {
// 				http.Error(w, "Error fetching product images", http.StatusInternalServerError)
// 				return
// 			}
// 			defer imagesRows.Close()

// 			for imagesRows.Next() {
// 				var pi ProductImage
// 				if err := imagesRows.Scan(&pi.ID, &pi.Name, &pi.Descriptions, &pi.Thump, &pi.Type, &pi.Content, &pi.Slug, &pi.ID_Product); err != nil {
// 					http.Error(w, "Error scanning product images", http.StatusInternalServerError)
// 					return
// 				}
// 				p.Images = append(p.Images, pi)
// 			}

// 			pt.Products = append(pt.Products, p)
// 		}

// 		productTypes = append(productTypes, pt)
// 	}

//		w.Header().Set("Content-Type", "application/json")
//		json.NewEncoder(w).Encode(productTypes)
//	}
package main

import (
	"fmt"
	"go-api-project/controllers"  // Thêm dòng này
	"go-api-project/initializers" // Thêm dòng này
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

// // Middleware xử lý CORS
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Thêm tiêu đề CORS
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000") // Cho phép từ localhost:3000
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Xử lý preflight request của CORS
		if r.Method == http.MethodOptions {
			return
		}

		// Chuyển tiếp đến handler tiếp theo
		next.ServeHTTP(w, r)
	})
}

func init() {
	initializers.InitDB()
	initializers.SyncDatabase()
}

func main() {

	http.Handle("/register", enableCORS(http.HandlerFunc(controllers.RegisterHandler)))
	http.Handle("/login", enableCORS(http.HandlerFunc(controllers.LoginHandler)))
	http.HandleFunc("/change-password", controllers.ChangePasswordHandler)
	http.HandleFunc("/profile", controllers.ProfileHandler)
	http.HandleFunc("/lostPass", controllers.LostPassHandler)
	// http.HandleFunc("/type-of-products", controllers.GetProducts)
	// // http.HandleFunc("/products", getProductsHandler)
	// http.HandleFunc("/products-package", getProductsPackageHandler)
	// http.HandleFunc("/image", getImageHandler)
	http.Handle("/products", enableCORS(http.HandlerFunc(controllers.GetProductsType)))
	http.HandleFunc("/createInvoice", controllers.CreateInvoice)
	// TestJWTFunctions(nil)
	// r := gin.Default()
	// r.POST("/createInvoice", controllers.CreateInvoice)
	// r.POST("/login", controllers.LoginHandler)
	// r.GET("/change_password", controllers.ChangePasswordHandler)
	// r.GET("/profile", controllers.ProfileHandler)
	// r.POST("/lostpass", controllers.LostPassHandler)
	// r.GET("/products", controllers.GetProducts)
	// r.Run(":8081") // Chạy trên cổng 8080
	fmt.Println("Server is running on http://localhost:8080...")
	http.ListenAndServe(":8080", nil)
}
