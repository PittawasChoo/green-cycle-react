import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Navbar from "components/Navbar";
import Layout from "components/Layout";
import Footer from "components/Footer";

import "bootstrap/dist/css/bootstrap.min.css";

const MaterialRequest = () => {
    const [unapprovedMaterial, setUnapprovedMaterial] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // axios.get('http://localhost:3003/material/unapprove')
            axios.get(`http://localhost:3003/material/unapprove`).then((res) => {
                const unapprovedMaterialRes = res.data;
                setUnapprovedMaterial(unapprovedMaterialRes);
            });
        };

        fetchData();
    }, []);

    const denyMaterial = (id, requestBy, name) => {
        // axios.post('http://localhost:3003/material/deny', {
        axios.post(`http://localhost:3003/material/deny`, {
            id: id,
            requestBy: requestBy,
            name: name,
        });
        const array = unapprovedMaterial;
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                array.splice(i, 1);
                break;
            }
        }
        setUnapprovedMaterial(array);
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
                    Material Request
                </p>
                <hr style={{ marginBottom: "30px" }} />
                {unapprovedMaterial.map((material) => {
                    return (
                        <div
                            key={material.id}
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
                                <div className="d-flex align-items-center" style={{ width: "70%" }}>
                                    <img
                                        alt="user-img"
                                        className="rounded-circle"
                                        src={material.userImage}
                                        title="source: imgur.com"
                                        style={{ width: "70px", height: "70px" }}
                                    />
                                    <div style={{ marginLeft: "32px" }}>
                                        <p
                                            style={{
                                                fontFamily: "Open Sans",
                                                fontSize: "14px",
                                                lineHeight: "25px",
                                                fontWeight: "700",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            {material.name}
                                        </p>
                                        <p
                                            style={{
                                                fontFamily: "Open Sans",
                                                fontSize: "12px",
                                                lineHeight: "17px",
                                                fontWeight: "600",
                                                marginBottom: "0",
                                            }}
                                        >
                                            <img
                                                alt="name"
                                                src="/icons/name.png"
                                                width={14}
                                                height={14}
                                            />
                                            <span style={{ marginLeft: "8px" }}>
                                                {material.username}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center" style={{ width: "30%" }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            width: "100%",
                                            height: "20px",
                                            justifyContent: "flex-end",
                                        }}
                                    >
                                        <div
                                            onClick={() =>
                                                denyMaterial(
                                                    material.id,
                                                    material.requestBy,
                                                    material.name
                                                )
                                            }
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
                                        <Link
                                            to="/addMaterial"
                                            state={{
                                                name: material.name,
                                                requestBy: material.requestBy,
                                                id: material.id,
                                            }}
                                        >
                                            <div
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
                                        </Link>
                                    </div>
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

export default MaterialRequest;
