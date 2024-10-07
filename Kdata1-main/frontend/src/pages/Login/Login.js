import React, { useState } from 'react';
import '../../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
// import RegistrationForm from './Register';
// import ForgetPassword from './ForgetPW';
// import DashboardWithSidebar from './Dashboard';
import Cookies from 'js-cookie';





const RegisterForm = () => {
    const navigate = useNavigate();
    const [slideIndex, setSlideIndex] = useState(1);
    const currentSlide = (n) => {
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) { setSlideIndex(1); }
        if (n < 1) { setSlideIndex(slides.length); }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();

        // In ra console để kiểm tra email và password
        console.log('Email:', email);
        console.log('Password:', password);

        try {
            const response = await fetch('https://portal-dev.lemp.vn/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setToken(data.Token);  // Lưu lại token nếu đăng nhập thành công
                console.log('Login successful:', data);
                Cookies.set('token', data.Token, { expires: 7 });
                navigate('/DashboardWithSidebar');
                // In ra dữ liệu phản hồi từ API

            } else {
                console.error('Login failed:', response.statusText);
                setError('Đăng nhập thất bại. Vui lòng thử lại.');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Đăng nhập thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <section className="ftco-section login">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-9">
                        <div className="d-md-flex box-login">
                            <div className="col-md-6">
                                <div className="login-left">
                                    <div className="row justify-content-center">
                                        <img src="https://kdata.vn/kdata/images/banner/backgroud.png" alt="" className="img-ab" />

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row justify-content-center">
                                    <div className="col-md-11">
                                        <div className="login-right">
                                            <div>
                                                <img src="https://kdata.vn/kdata/images/banner/Logo-Kdata-2000px 1.png" alt="" className="logo-login" width="140px" />
                                            </div>
                                            <h1 className="login-title">Đăng nhập tài khoản</h1>
                                            <form onSubmit={handleLogin}>
                                                <div className="form-group mb-3">
                                                    <label className="label-login" htmlFor="email">Email đăng nhập</label>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        className="form-control-login"
                                                        placeholder="Email"
                                                        name="email"
                                                        required
                                                        autoComplete="email"
                                                        autoFocus
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>

                                                <div className="form-group mb-3">
                                                    <label className="label-login" htmlFor="password">Mật khẩu</label>
                                                    <input
                                                        id="password"
                                                        type="password"
                                                        className="form-control-login"
                                                        placeholder="****************"
                                                        name="password"
                                                        required
                                                        autoComplete="current-password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>

                                                <div className="d-flex justify-content-between remember-forgot">
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            name="remember"
                                                            id="remember"
                                                        />
                                                        <label className="form-check-label" htmlFor="remember">Duy trì đăng nhập</label>
                                                    </div>
                                                    <div>
                                                        <Link to="/ForgetPassword">Quên mật khẩu</Link>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary submit px-4 py-2 w-100" onClick={handleLogin}
                                                    >Đăng nhập
                                                    </button>
                                                </div>

                                                <div className="login-bottom mt-3 text-center">
                                                    <div>
                                                        <span>
                                                            Chưa có tài khoản?{' '}

                                                            <Link to="/RegistrationForm" className="sign-up-now">Đăng ký ngay</Link>

                                                        </span>
                                                    </div>
                                                    <div className="div-account">
                                                        <p className="account">
                                                            <small>Liên kết tài khoản</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterForm; 