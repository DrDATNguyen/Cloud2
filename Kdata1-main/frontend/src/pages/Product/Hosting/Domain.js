
function Domain() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-lg-6 mb-3">
                    <label htmlFor="inputField" className="form-label">Nhập tên miền sử dụng cho dịch vụ</label>
                </div>

                <div className="col-12 col-lg-6">
                    <input
                        type="text"
                        className="form-control"
                        id="inputField"
                        placeholder="Vui Lòng Nhập Tên Miền"
                    />
                </div>
            </div>
        </div>
    );

}

export default Domain;

