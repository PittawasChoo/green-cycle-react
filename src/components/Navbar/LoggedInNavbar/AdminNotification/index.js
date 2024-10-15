import React from "react";
import { Link } from "react-router-dom";

const AdminNotification = ({ notiPage, setNotiPage, notiUser = [], image, notiMaterial = [] }) => {
    return (
        <div
            style={{
                overflow: "auto",
                maxHeight: "590px",
                scrollbarWidth: "thin",
            }}
        >
            <div className="container">
                <div className="row">
                    <div
                        className={
                            notiPage === 1
                                ? "selected-noti noti col d-flex justify-content-center"
                                : "noti col d-flex justify-content-center"
                        }
                        onClick={() => setNotiPage(1)}
                        style={{
                            textDecoration: "none",
                        }}
                    >
                        Users
                    </div>
                    <div
                        className={
                            notiPage === 2
                                ? "selected-noti noti col d-flex justify-content-center"
                                : "noti col d-flex justify-content-center"
                        }
                        onClick={() => setNotiPage(2)}
                        style={{
                            textDecoration: "none",
                        }}
                    >
                        Material
                    </div>
                </div>
            </div>
            {notiPage === 1 ? (
                <div>
                    {notiUser
                        .slice()
                        .reverse()
                        .map((noti, index) => {
                            return (
                                <div key={`${noti.name}${index}`}>
                                    <div
                                        style={{
                                            display: "flex",
                                            marginBottom: "20px",
                                            marginTop: "24px",
                                        }}
                                    >
                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            style={{
                                                marginRight: "24px",
                                                width: "50px",
                                                float: "left",
                                            }}
                                        >
                                            <img
                                                alt="user-image"
                                                src={image}
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "50%",
                                                }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                fontFamily: "Open Sans",
                                                width: "290px",
                                                float: "right",
                                            }}
                                        >
                                            <p
                                                style={{
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                    color: "#081F32",
                                                    marginBottom: "2px",
                                                }}
                                            >
                                                New Register
                                            </p>
                                            <p
                                                style={{
                                                    fontSize: "12px",
                                                    fontWeight: "400",
                                                    color: "#6E798C",
                                                    marginBottom: "0",
                                                }}
                                            >
                                                Account "{noti.name}" has registered for {noti.role}{" "}
                                                account.
                                            </p>
                                        </div>
                                    </div>
                                    <hr
                                        style={{
                                            marginBottom: 0,
                                        }}
                                    />
                                </div>
                            );
                        })}
                    <Link to="/userRequest">
                        <div
                            className="text-center"
                            style={{
                                width: "100%",
                                textAlign: "center",
                                margin: "16px auto auto auto",
                            }}
                        >
                            <a
                                href="/"
                                style={{
                                    textDecoration: "none",
                                    cursor: "pointer",
                                }}
                            >
                                view all
                            </a>
                        </div>
                    </Link>
                </div>
            ) : (
                <div>
                    {notiMaterial
                        .slice()
                        .reverse()
                        .map((noti, index) => {
                            return (
                                <div key={`${noti.name}${index}`}>
                                    <div
                                        style={{
                                            display: "flex",
                                            marginBottom: "20px",
                                            marginTop: "24px",
                                        }}
                                    >
                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            style={{
                                                marginRight: "24px",
                                                width: "50px",
                                                float: "left",
                                            }}
                                        >
                                            <img
                                                alt="user-image"
                                                src={noti.userImage}
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "50%",
                                                }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                fontFamily: "Open Sans",
                                                width: "290px",
                                                float: "right",
                                            }}
                                        >
                                            <p
                                                style={{
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                    color: "#081F32",
                                                    marginBottom: "2px",
                                                }}
                                            >
                                                New Material Request
                                            </p>
                                            <p
                                                style={{
                                                    fontSize: "12px",
                                                    fontWeight: "400",
                                                    color: "#6E798C",
                                                    marginBottom: "0",
                                                }}
                                            >
                                                Account "{noti.username}" has requested to add new
                                                material called {noti.name} account.
                                            </p>
                                        </div>
                                    </div>
                                    <hr
                                        style={{
                                            marginBottom: 0,
                                        }}
                                    />
                                </div>
                            );
                        })}
                    <Link to="/materialRequest">
                        <div
                            className="text-center"
                            style={{
                                width: "100%",
                                textAlign: "center",
                                margin: "16px auto 16px auto",
                            }}
                        >
                            <a
                                href="/"
                                style={{
                                    textDecoration: "none",
                                    cursor: "pointer",
                                }}
                            >
                                view all
                            </a>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default AdminNotification;
