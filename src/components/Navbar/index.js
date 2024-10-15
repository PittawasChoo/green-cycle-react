import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

import LoggedInNavbar from "./LoggedInNavbar";

import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [isToggledNotification, setIsToggledNotification] = useState(false);
    const [notiPage, setNotiPage] = useState(1);
    const [notiList, setNotiList] = useState(null);
    const [notiUser, setNotiUser] = useState(null);
    const [notiMaterial, setNotiMaterial] = useState(null);
    const [image, setImage] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const checkRole = async (token) => {
        if (token) {
            const res = await axios
                .get(`http://localhost:3003/user/role`, {
                    headers: {
                        Authorization: token,
                    },
                })
                .catch((error) => {});
            if (res) {
                return res.data.role;
            }
        } else {
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cookies = new Cookies();
                let token = cookies.get("token");
                let header = {
                    Authorization: token,
                };

                const role = await checkRole(token);
                setRole(role);
                setToken(token);

                setRole(role);

                if (role === "admin") {
                    axios.get(`http://localhost:3003/user/unapproved`).then((res) => {
                        const unapprovedUser = res.data;
                        setNotiUser(unapprovedUser);
                        setImage(
                            "https://storage.googleapis.com/greencycle-db.appspot.com/2021-03-30-23-58-01-73a0a0e241441defb4bfd858bd7ffc81.png"
                        );
                    });

                    axios.get(`http://localhost:3003/material/unapprove`).then((res) => {
                        const unapprovedMaterial = res.data;
                        setNotiMaterial(unapprovedMaterial);
                    });
                } else if (role === "manufacturer") {
                    axios
                        .get(`http://localhost:3003/manufacturer/getNoti`, {
                            headers: header,
                        })
                        .then((res) => {
                            const noti = res.data;
                            setNotiList(noti);
                        });
                    axios
                        .get(`http://localhost:3003/manufacturer/image`, {
                            headers: header,
                        })
                        .then((res) => {
                            setImage(res.data);
                        });
                } else if (role === "contributor") {
                    axios
                        .get(`http://localhost:3003/contributor/getNoti`, {
                            headers: header,
                        })
                        .then((res) => {
                            const noti = res.data;
                            setNotiList(noti);
                        });
                    axios
                        .get(`http://localhost:3003/contributor/image`, { headers: header })
                        .then((res) => {
                            setImage(res.data);
                        });
                }
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div
            className="shadow-sm"
            style={{
                background: "#2C2F30",
                width: "100vw",
                height: "80px",
                position: "fixed",
                backgroundColor: "#2C2F30",
                zIndex: "10",
            }}
        >
            <div className="container p-0">
                <div className="row">
                    <div
                        className="col d-flex justify-content-start align-items-center"
                        style={{
                            height: "80px",
                            marginLeft: "120px",
                            position: "absolute",
                            left: 0,
                            cursor: "pointer",
                        }}
                    >
                        <a
                            href="/"
                            style={{
                                zIndex: "1",
                            }}
                        >
                            <img alt="logo" src="/images/logo.png" width={185} height={33} />
                        </a>
                    </div>
                    {!token ? (
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
                    ) : (
                        <LoggedInNavbar
                            isToggledNotification={isToggledNotification}
                            setIsToggledNotification={setIsToggledNotification}
                            notiImage={image}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            role={role}
                            notiList={notiList}
                            notiPage={notiPage}
                            setNotiPage={setNotiPage}
                            notiUser={notiUser}
                            image={image}
                            notiMaterial={notiMaterial}
                        />
                    )}
                </div>
            </div>
            <style>{`
                .box {
                    width: 385px;
                    max-height: 655px;
                    background-color: white;
                    color: #fff;
                    padding: 20px;
                    position: relative;
                    float: left;
                    border-radius: 16px;
                }
                .arrow-top {
                    margin-top: 15px;
                }
                .arrow-top:after {
                    content: " ";
                    position: absolute;
                    right: 126px;
                    top: -15px;
                    border-top: none;
                    border-right: 9px solid transparent;
                    border-left: 9px solid transparent;
                    border-bottom: 15px solid white;
                }
                .selected-noti {
                    color: black !important;
                    border-bottom: 3px solid #007ae9 !important;
                }
                .noti {
                    color: rgba(0, 0, 0, 0.4);
                    cursor: pointer;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
                    font-family: Open Sans;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: 40px;
                }
                .container-box {
                    border-radius: 16px;
                }
                .option-box {
                    width: 100%;
                    height: 100%;
                    max-height: 655px;
                    background-color: white;
                    color: #fff;
                    padding: 20px;
                    position: relative;
                    float: left;
                    border-radius: 16px;
                }
                .arrow-top-profile {
                    margin-top: 15px;
                }
                .arrow-top-profile:after {
                    content: " ";
                    position: absolute;
                    right: 30px;
                    top: -5px;
                    border-top: none;
                    border-right: 9px solid transparent;
                    border-left: 9px solid transparent;
                    border-bottom: 15px solid white;
                }
            `}</style>
        </div>
    );
};

export default Navbar;
