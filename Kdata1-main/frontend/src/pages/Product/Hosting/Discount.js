function Discount() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-lg-4 mb-3">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control col-9"
                            id="promoCodeInput"
                            placeholder="Nhập mã khuyến mãi"
                        />
                        <button className="btn btn-info col-3">Sử Dụng</button>
                    </div>
                </div>
                <div className="col-12 col-lg-4 mb-3">
                    <h5>Điểm tích luỹ hiện có: 0 điểm</h5>
                    <h6>Sử dụng điểm tích luỹ (1 điểm = 10 vnđ)</h6>
                </div>
                <div className="col-12 col-lg-4 mb-3">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control col-9"
                            id="pointsInput"
                            placeholder="Nhập Số Điểm"
                        />
                        <button className="btn btn-info col-3">Sử Dụng</button>
                    </div>
                </div>
            </div>
        </div>
    );



}

export default Discount;