// Generate a JWT token with user information
package handlers

import (
	"fmt"
	"go-api-project/initializers"
	"regexp"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

// Structure to store user information in the token
type Claims struct {
	ID    int    `json:"id"`
	Email string `json:"email"`
	SDT   string `json:"SDT"`
	jwt.RegisteredClaims
}

func GenerateJWT(id int, email string, SDT string) (string, error) {
	claims := &Claims{
		ID:    id,
		Email: email,
		SDT:   SDT,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(initializers.JwtKey)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}
func IsStrongPassword(password string) bool {
	if len(password) < 12 {
		return false
	}

	hasUpper := regexp.MustCompile(`[A-Z]`).MatchString(password)
	hasLower := regexp.MustCompile(`[a-z]`).MatchString(password)
	hasDigit := regexp.MustCompile(`[0-9]`).MatchString(password)
	hasSpecial := regexp.MustCompile(`[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'",.<>/?\\|]`).MatchString(password)

	return hasUpper && hasLower && hasDigit && hasSpecial
}

// Hàm băm mật khẩu
func HashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hash), nil
}
func GetUserFromToken(tokenString string) (Claims, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return initializers.JwtKey, nil
	})
	if err != nil {
		return *claims, err
	}
	if !token.Valid {
		return *claims, fmt.Errorf("Token không hợp lệ")
	}
	return *claims, nil
}
