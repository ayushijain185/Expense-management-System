import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { LogoutOutlined , UserOutlined } from "@ant-design/icons";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
        <Link className="navbar-brand fs-2 text-white" to="/">Expense Management</Link>
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon " />
          </button>
          
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              <li className="nav-item">
                {" "}
                <button className="btn text-white m-1"><UserOutlined className="p-1"/>{loginUser && loginUser.name}</button>{" "}
              </li>

              <li className="nav-item">
                <button className="btn text-white m-1" onClick={logoutHandler}>
                  <LogoutOutlined  className="p-1"/>Logout
                </button>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;