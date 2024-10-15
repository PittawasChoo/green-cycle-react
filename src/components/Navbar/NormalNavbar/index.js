import React from "react";
import { Link } from "react-router-dom";

const NormalNavbar = () => {
    return (
        <div
            className="col d-flex justify-content-end align-items-center px-0"
            style={{
                height: "80px",
                marginRight: "120px",
                position: "absolute",
                right: 0,
            }}
        >
            <Link to="/search">
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        width: "78px",
                        height: "29px",
                        textDecoration: "none",
                        marginRight: "24px",
                    }}
                >
                    <span
                        style={{
                            color: "white",
                            fontFamily: "Open Sans",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "15px",
                        }}
                    >
                        Search
                    </span>
                </div>
            </Link>
            <Link to="/location">
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        width: "78px",
                        height: "29px",
                        textDecoration: "none",
                        marginRight: "24px",
                    }}
                >
                    <span
                        style={{
                            color: "white",
                            fontFamily: "Open Sans",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "15px",
                        }}
                    >
                        Map
                    </span>
                </div>
            </Link>
            <Link to="/about">
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        width: "78px",
                        height: "29px",
                        textDecoration: "none",
                        marginRight: "24px",
                    }}
                >
                    <span
                        style={{
                            color: "white",
                            fontFamily: "Open Sans",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "15px",
                        }}
                    >
                        About
                    </span>
                </div>
            </Link>
            <Link to="/contact">
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        width: "78px",
                        height: "29px",
                        textDecoration: "none",
                        marginRight: "24px",
                    }}
                >
                    <span
                        style={{
                            color: "white",
                            fontFamily: "Open Sans",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "15px",
                        }}
                    >
                        Contact
                    </span>
                </div>
            </Link>
            <Link to="/signIn">
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        width: "78px",
                        height: "29px",
                        background: "white",
                        borderRadius: "8px",
                        textDecoration: "none",
                    }}
                >
                    <span
                        style={{
                            color: "black",
                            fontFamily: "Open Sans",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "15px",
                        }}
                    >
                        Sign In
                    </span>
                </div>
            </Link>
        </div>
    );
};

export default NormalNavbar;
