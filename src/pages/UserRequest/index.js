import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "components/Navbar";
import Layout from "components/Layout";
import Footer from "components/Footer";

import "bootstrap/dist/css/bootstrap.min.css";

const UserRequest = () => {
    const [unapprovedUser, setUnapprovedUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // axios.get('http://localhost:3003/user/unapproved')
            axios.get(`http://localhost:3003/user/unapproved`).then((res) => {
                const unapprovedUserRes = res.data;
                setUnapprovedUser(unapprovedUserRes);
            });
        };

        fetchData();
    }, []);

    const denyUser = (id, owner, role) => {
        // axios.post('http://localhost:3003/user/deny', {
        axios.post(`http://localhost:3003/user/deny`, {
            role: role,
            id: id,
            owner: owner,
        });
        const array = unapprovedUser;
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                array.splice(i, 1);
                break;
            }
        }
        setUnapprovedUser(array);
    };

    const acceptUser = (id, owner, role) => {
        // axios.post('http://localhost:3003/user/accept', {
        axios.post(`http://localhost:3003/user/accept`, {
            role: role,
            id: id,
            owner: owner,
        });
        const array = unapprovedUser;
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                array.splice(i, 1);
                break;
            }
        }
        setUnapprovedUser(array);
    };

    return (
        <Layout title="GreenCycle: A community-base forwarding system">
            <Navbar />
            <div
                style={{
                    minHeight: "100vh",
                    width: "100%",
                    backgroundColor: "rgb(248, 248, 248)",
                    padding: "130px 120px 120px 100px",
                }}
            >
                <p
                    style={{
                        font: "Open Sans",
                        fontWeight: "700",
                        fontSize: "16px",
                        lineHeight: "40px",
                        paddingLeft: "20px",
                    }}
                >
                    New User
                </p>
                <hr style={{ marginBottom: "30px" }} />
                {unapprovedUser.map((user) => {
                    return (
                        <div
                            key={user.id}
                            className="shadow-lg"
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "16px",
                                backgroundColor: "white",
                                marginBottom: "24px",
                                padding: "32px",
                            }}
                        >
                            <div style={{ display: "flex" }}>
                                <div
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        marginRight: "30px",
                                    }}
                                >
                                    <img
                                        alt="user-img"
                                        src={user.image}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            borderRadius: "50%",
                                        }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p
                                        style={{
                                            fontFamily: "Open Sans",
                                            fontSize: "14px",
                                            lineHeight: "25px",
                                            fontWeight: "700",
                                            color: "#081F32",
                                            marginBottom: "0",
                                        }}
                                    >
                                        {user.name}
                                    </p>
                                    <p
                                        style={{
                                            fontFamily: "Open Sans",
                                            fontSize: "14px",
                                            lineHeight: "20px",
                                            fontWeight: "600",
                                            color: "#007AE9",
                                            marginBottom: "15px",
                                            textTransform: "capitalize",
                                            marginTop: "10px",
                                        }}
                                    >
                                        {user.role}
                                    </p>
                                    <p
                                        style={{
                                            fontFamily: "Open Sans",
                                            fontSize: "12px",
                                            lineHeight: "17px",
                                            fontWeight: "400",
                                            color: "#6E798C",
                                        }}
                                    >
                                        {user.detail}
                                    </p>
                                    <hr />
                                    <div className="user-contact">
                                        <img
                                            alt="phone"
                                            width={12}
                                            height={12}
                                            src="/icons/phone.png"
                                        />
                                        <span className="user-contact-char">
                                            {user.contactNumber}
                                        </span>
                                    </div>
                                    <div className="user-contact">
                                        <img
                                            alt="mail"
                                            width={12}
                                            height={12}
                                            src="/icons/mail.png"
                                        />
                                        <span className="user-contact-char">{user.email}</span>
                                    </div>
                                    <div className="user-contact">
                                        <img
                                            alt="website"
                                            width={12}
                                            height={12}
                                            src="/icons/website.png"
                                        />
                                        <span className="user-contact-char">{user.website}</span>
                                    </div>
                                    <div className="user-contact">
                                        <img
                                            alt="address"
                                            width={12}
                                            height={12}
                                            src="/icons/address.png"
                                        />
                                        <span className="user-contact-char">{user.address}</span>
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    height: "20px",
                                    marginTop: "15px",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <div
                                    onClick={() => denyUser(user.id, user.owner, user.role)}
                                    className="button d-flex justify-content-center align-items-center"
                                    style={{
                                        backgroundColor: "#F2F3F7",
                                        color: "#6E798C",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    deny
                                </div>
                                <div
                                    onClick={() => acceptUser(user.id, user.owner, user.role)}
                                    className="button d-flex justify-content-center align-items-center"
                                    style={{
                                        backgroundColor: "#007AE9",
                                        color: "white",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    accept
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Footer />
            <style>{`
                    .user-contact {
                        font-family: Open Sans;
                        font-size: 12px;
                        line-height: 25px;
                        font-weight: 400;
                        color: #6e798c;
                        margin-bottom: 0;
                    }
                    .user-contact-char {
                        margin-left: 20px;
                    }
                    .button {
                        width: 76px;
                        border-radius: 8px;
                        margin-left: 10px;
                        font-family: roboto;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 17px;
                        height: 24px;
                    }
                `}</style>
        </Layout>
    );
};

export default UserRequest;
