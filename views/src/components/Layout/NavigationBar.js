import { Link, useHistory } from "react-router-dom";

const NavigationBar = () => {
  const history = useHistory();

  const isLoggedIn = true; // Fetch authentication status from context

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Trang Chủ
            </Link>
          </li>
          {isLoggedIn && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/customers">
                  Danh Sách Khách Hàng
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Sản Phẩm Của Tôi
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">
                  Đơn Hàng Đã Bán
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
