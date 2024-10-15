import React from "react";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";

import AdminNotification from "./AdminNotification";
import NormalNotification from "./NormalNotification";

const LoggedInNavbar = ({
    isToggledNotification,
    setIsToggledNotification,
    notiImage,
    isOpen,
    setIsOpen,
    role,
    notiList,
    notiPage,
    setNotiPage,
    notiUser,
    image,
    notiMaterial,
}) => {
    const navigate = useNavigate();

    const getNotification = () => {
        if (role === "manufacturer" || role === "contributor") {
            return <NormalNotification notiList={notiList || []} />;
        } else if (role === "admin") {
            return (
                <AdminNotification
                    notiPage={notiPage}
                    setNotiPage={setNotiPage}
                    notiUser={notiUser}
                    image={notiImage}
                    notiMaterial={notiMaterial}
                />
            );
        } else {
            return null;
        }
    };

    const toggleNotification = () => {
        setIsToggledNotification(!isToggledNotification);
    };

    const toggleOption = () => {
        setIsOpen(!isOpen);
    };

    const signOut = () => {
        const cookies = new Cookies();
        cookies.remove("token");
        navigate({ pathname: "/" });
    };

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
                <a
                    href="/"
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        width: "40px",
                        height: "29px",
                        marginRight: "24px",
                    }}
                >
                    <img alt="search" width={"20px"} height={"20px"} src="/icons/search.png" />
                </a>
            </Link>
            <div style={{ marginRight: "20px" }}>
                <div
                    onClick={toggleNotification}
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        width: "40px",
                        height: "29px",
                        cursor: "pointer",
                    }}
                >
                    <img alt="bell" width={"20px"} height={"20px"} src="/icons/bell.png" />
                </div>
                {isToggledNotification && (
                    <div>
                        <div
                            className="notificationBar"
                            style={{
                                position: "absolute",
                                marginLeft: "-230px",
                                color: "black",
                            }}
                        >
                            <div className="box arrow-top shadow-lg" style={{ color: "black" }}>
                                <p
                                    style={{
                                        fontFamily: "Open Sans",
                                        fontSize: "16px",
                                        textAlign: "left",
                                        width: "93%",
                                        fontWeight: 700,
                                        lineHeight: "40px",
                                        marginBottom: 0,
                                    }}
                                >
                                    Notifications
                                </p>
                                {getNotification()}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div
                style={{
                    width: "1px",
                    height: "20px",
                    backgroundColor: "white",
                }}
            />
            <div
                onClick={toggleOption}
                className="d-flex justify-content-center align-items-center"
                style={{
                    width: "78px",
                    height: "29px",
                    borderRadius: "8px",
                    textDecoration: "none",
                }}
            >
                <img
                    alt="main-image"
                    src={image}
                    style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        cursor: "pointer",
                    }}
                />
            </div>
            {isOpen ? (
                <div>
                    <div
                        className="shadow container-box arrow-top-profile"
                        style={{
                            position: "absolute",
                            width: "170px",
                            marginBottom: "-190px",
                            marginLeft: "-140px",
                            zIndex: 6,
                            paddingTop: "10px",
                            right: 0,
                            marginTop: "20px",
                        }}
                    >
                        <div className="option-box" style={{ padding: "16px" }}>
                            <Link
                                to={
                                    role === "admin"
                                        ? "/adminHome"
                                        : role === "contributor"
                                        ? "/contHome"
                                        : role === "manufacturer"
                                        ? "/manuHome"
                                        : "/"
                                }
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        cursor: "pointer",
                                        textDecoration: "none",
                                    }}
                                >
                                    <span
                                        className="d-flex align-items-center"
                                        style={{
                                            width: "100% ",
                                            textAlign: "center",
                                            marginBottom: "0",
                                            fontFamily: "Open Sans",
                                            fontSize: "14px",
                                            lineHeight: "19px",
                                            color: "black",
                                        }}
                                    >
                                        <span
                                            className="d-flex align-items-center justify-content-center"
                                            style={{
                                                marginRight: "5px",
                                                width: "100%",
                                            }}
                                        >
                                            <img
                                                alt="profile"
                                                src="/icons/profile.png"
                                                style={{
                                                    width: "16px",
                                                    height: "16px",
                                                    marginLeft: "20px",
                                                }}
                                            />
                                            <p
                                                style={{
                                                    margin: "0 auto",
                                                    textAlign: "center",
                                                }}
                                            >
                                                Profile
                                            </p>
                                        </span>
                                    </span>
                                </div>
                            </Link>
                            <hr />
                            <a
                                href="/about"
                                style={{
                                    width: "100%",
                                    cursor: "pointer",
                                    textDecoration: "none",
                                }}
                            >
                                <span
                                    className="d-flex align-items-center"
                                    style={{
                                        width: "100% ",
                                        textAlign: "center",
                                        marginBottom: "0",
                                        fontFamily: "Open Sans",
                                        fontSize: "14px",
                                        lineHeight: "19px",
                                        color: "black",
                                    }}
                                >
                                    <span
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            marginRight: "5px",
                                            width: "100%",
                                        }}
                                    >
                                        <img
                                            alt="book"
                                            src="/icons/book.png"
                                            style={{
                                                width: "16px",
                                                height: "16px",
                                                marginLeft: "20px",
                                            }}
                                        />
                                        <p
                                            style={{
                                                margin: "0 auto",
                                                textAlign: "center",
                                            }}
                                        >
                                            About
                                        </p>
                                    </span>
                                </span>
                            </a>
                            <hr />
                            <a
                                href="/contact"
                                style={{
                                    width: "100%",
                                    cursor: "pointer",
                                    textDecoration: "none",
                                }}
                            >
                                <span
                                    className="d-flex align-items-center"
                                    style={{
                                        width: "100% ",
                                        textAlign: "center",
                                        marginBottom: "0",
                                        fontFamily: "Open Sans",
                                        fontSize: "14px",
                                        lineHeight: "19px",
                                        color: "black",
                                    }}
                                >
                                    <span
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            marginRight: "5px",
                                            width: "100%",
                                        }}
                                    >
                                        <img
                                            alt="question"
                                            src="/icons/question.png"
                                            style={{
                                                width: "16px",
                                                height: "16px",
                                                marginLeft: "20px",
                                            }}
                                        />
                                        <p
                                            style={{
                                                margin: "0 auto",
                                                textAlign: "center",
                                            }}
                                        >
                                            Contact
                                        </p>
                                    </span>
                                </span>
                            </a>
                            <hr />
                            <Link to="/">
                                <div
                                    onClick={signOut}
                                    style={{
                                        width: "100%",
                                        cursor: "pointer",
                                        textDecoration: "none",
                                    }}
                                >
                                    <span
                                        className="d-flex align-items-center"
                                        style={{
                                            width: "100% ",
                                            textAlign: "center",
                                            marginBottom: "0",
                                            fontFamily: "Open Sans",
                                            fontSize: "14px",
                                            lineHeight: "19px",
                                            color: "black",
                                        }}
                                    >
                                        <span
                                            className="d-flex align-items-center justify-content-center"
                                            style={{
                                                marginRight: "5px",
                                                width: "100%",
                                            }}
                                        >
                                            <img
                                                alt="logout"
                                                src="/icons/logout.png"
                                                style={{
                                                    width: "16px",
                                                    height: "16px",
                                                    marginLeft: "20px",
                                                }}
                                            />
                                            <p
                                                style={{
                                                    margin: "0 auto",
                                                    textAlign: "center",
                                                }}
                                            >
                                                Log out
                                            </p>
                                        </span>
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div />
            )}
        </div>
    );
};

export default LoggedInNavbar;
