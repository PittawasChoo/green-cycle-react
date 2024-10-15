import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import LinesEllipsis from "react-lines-ellipsis";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

import Navbar from "components/Navbar";
import Layout from "components/Layout";
import Footer from "components/Footer";

import "bootstrap/dist/css/bootstrap.min.css";

import { capitalize } from "modules/capitalize";

const ManuHome = () => {
    const [data, setData] = useState(null);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const cookies = new Cookies();

            await axios
                .get(`http://localhost:3003/manufacturer/data`, {
                    headers: {
                        Authorization: cookies.get("token"),
                    },
                })
                .then((res) => {
                    setData(res.data);
                });

            await axios
                .get(`http://localhost:3003/manufacturer/product`, {
                    headers: {
                        Authorization: cookies.get("token"),
                    },
                })
                .then((res) => {
                    setProduct(res.data);
                });
        };

        fetchData();
    }, []);

    return (
        <div style={{ maxWidth: "100vw" }}>
            {data && product ? (
                <div>
                    <Layout title="GreenCycle: A community-base forwarding system">
                        <Navbar />
                        <div
                            className="d-flex align-items-start"
                            style={{
                                minHeight: "100vh",
                                width: "100%",
                                background: "#F8F8F8",
                                padding: "130px 118px 0 118px",
                                paddingBottom: "100px",
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                }}
                            >
                                {/* profile */}
                                <div
                                    style={{
                                        width: "100%",
                                        borderRadius: "16px",
                                        margin: "0 auto",
                                        boxShadow: "0px 0px 23px -2px rgba(0,0,0,0.08)",
                                        padding: "35px 40px 35px 40px",
                                        background: "white",
                                    }}
                                >
                                    {data === undefined ? (
                                        <div />
                                    ) : (
                                        <div style={{ margin: "0 auto", display: "flex" }}>
                                            <div style={{ marginRight: "64px" }}>
                                                <img
                                                    alt="circle"
                                                    className="rounded-circle"
                                                    src={data.image}
                                                    title="source: imgur.com"
                                                    style={{ width: "180px", height: "180px" }}
                                                />
                                            </div>
                                            <div>
                                                <div
                                                    style={{
                                                        fontFamily: "Poppins",
                                                        fontWeight: "600",
                                                        fontSize: "20px",
                                                        lineHeight: "25px",
                                                        marginBottom: "16px",
                                                    }}
                                                >
                                                    {data.name}
                                                </div>
                                                <div style={{ display: "flex" }}>
                                                    <div
                                                        style={{
                                                            width: "50%",
                                                            marginRight: "54px",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                fontFamily: "Open Sans",
                                                                fontWeight: "400",
                                                                fontSize: "14px",
                                                                lineHeight: "25px",
                                                                color: "#6E798C",
                                                                textAlign: "justify",
                                                            }}
                                                        >
                                                            {data.detail}
                                                        </div>
                                                    </div>

                                                    {/* contact */}
                                                    <div style={{ width: "50%" }}>
                                                        <p
                                                            style={{
                                                                width: "25%",
                                                                float: "left",
                                                                fontFamily: "Poppins",
                                                                fontWeight: "600",
                                                                fontSize: "14px",
                                                                marginBottom: "0",
                                                                lineHeight: "25px",
                                                            }}
                                                        >
                                                            {" "}
                                                            Contact:{" "}
                                                        </p>
                                                        <p
                                                            style={{
                                                                width: "75%",
                                                                float: "right",
                                                                fontFamily: "Open Sans",
                                                                fontWeight: "400",
                                                                fontSize: "14px",
                                                                marginBottom: "0",
                                                                lineHeight: "25px",
                                                                color: "#6E798C",
                                                                textAlign: "justify",
                                                            }}
                                                        >
                                                            {data.contactNumber}
                                                        </p>
                                                        <p
                                                            style={{
                                                                width: "25%",
                                                                float: "left",
                                                                fontFamily: "Poppins",
                                                                fontWeight: "600",
                                                                fontSize: "14px",
                                                                marginBottom: "0",
                                                                lineHeight: "25px",
                                                            }}
                                                        >
                                                            Email:{" "}
                                                        </p>
                                                        <p
                                                            style={{
                                                                width: "75%",
                                                                float: "right",
                                                                fontFamily: "Open Sans",
                                                                fontWeight: "400",
                                                                fontSize: "14px",
                                                                marginBottom: "0",
                                                                lineHeight: "25px",
                                                                color: "#6E798C",
                                                                textAlign: "justify",
                                                            }}
                                                        >
                                                            {data.email}
                                                        </p>
                                                        <p
                                                            style={{
                                                                width: "25%",
                                                                float: "left",
                                                                fontFamily: "Poppins",
                                                                fontWeight: "600",
                                                                fontSize: "14px",
                                                                marginBottom: "0",
                                                                lineHeight: "25px",
                                                            }}
                                                        >
                                                            Website:{" "}
                                                        </p>
                                                        <p
                                                            style={{
                                                                width: "75%",
                                                                float: "right",
                                                                fontFamily: "Open Sans",
                                                                fontWeight: "400",
                                                                fontSize: "14px",
                                                                marginBottom: "0",
                                                                lineHeight: "25px",
                                                                color: "#6E798C",
                                                                textAlign: "justify",
                                                            }}
                                                        >
                                                            {data.website}
                                                        </p>
                                                        <p
                                                            style={{
                                                                width: "25%",
                                                                float: "left",
                                                                fontFamily: "Poppins",
                                                                fontWeight: "600",
                                                                fontSize: "14px",
                                                                marginBottom: "0",
                                                                lineHeight: "25px",
                                                            }}
                                                        >
                                                            Address:{" "}
                                                        </p>
                                                        <p
                                                            style={{
                                                                width: "75%",
                                                                float: "right",
                                                                fontFamily: "Open Sans",
                                                                fontWeight: "400",
                                                                fontSize: "14px",
                                                                marginBottom: "0",
                                                                lineHeight: "25px",
                                                                color: "#6E798C",
                                                                textAlign: "justify",
                                                            }}
                                                        >
                                                            {data.address}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Menu */}
                                <p
                                    style={{
                                        fontFamily: "Open Sans",
                                        fontSize: "15px",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        lineHeight: "40px",
                                        marginTop: "36px",
                                        marginBottom: "0",
                                    }}
                                >
                                    Greeting, {data.name}
                                </p>
                                <hr style={{ marginTop: "2px", marginBottom: "30px" }} />

                                {/* add product */}
                                <div style={{ display: "flex", width: "100%" }}>
                                    <Link to="/addProduct">
                                        <div
                                            style={{
                                                width: "580px",
                                                marginBottom: "16px",
                                                height: "120px",
                                                float: "left",
                                                borderRadius: "16px",
                                                boxShadow: "0px 0px 23px -2px rgba(0,0,0,0.08)",
                                                padding: "20px 40px",
                                                display: "flex",
                                                background: "white",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <div
                                                className="d-flex justify-content-center align-items-center"
                                                style={{
                                                    width: "80px",
                                                    height: "80px",
                                                    background:
                                                        "linear-gradient(321.69deg, #4481EB 0%, #04BEFE 100%)",
                                                    borderRadius: "8px",
                                                    textDecoration: "none",
                                                    marginRight: "24px",
                                                }}
                                            >
                                                <img
                                                    alt="add"
                                                    src="/icons/add.png"
                                                    width={60}
                                                    height={60}
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    float: "right",
                                                    width: "360px",
                                                    height: "80px",
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        verticalAlign: "middle",
                                                        display: "inline-block",
                                                        fontFamily: "Poppins",
                                                        fontSize: "17px",
                                                        color: "#081F32",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    Add new product
                                                </p>
                                                <p
                                                    style={{
                                                        verticalAlign: "middle",
                                                        display: "inline-block",
                                                        marginTop: "-1%",
                                                        fontFamily: "Open Sans",
                                                        fontSize: "14px",
                                                        color: "#6E798C",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    Get QR Code. User will be able to search for
                                                    your product faster.
                                                </p>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* edit profile */}
                                    <Link to="/editProfile">
                                        <div
                                            style={{
                                                width: "580px",
                                                marginBottom: "16px",
                                                height: "120px",
                                                float: "right",
                                                borderRadius: "16px",
                                                boxShadow: "0px 0px 23px -2px rgba(0,0,0,0.08)",
                                                padding: "20px 40px",
                                                display: "flex",
                                                background: "white",
                                                marginLeft: "32px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <div
                                                className="d-flex justify-content-center align-items-center"
                                                style={{
                                                    width: "80px",
                                                    height: "80px",
                                                    background:
                                                        "linear-gradient(321.69deg, #4481EB 0%, #04BEFE 100%)",
                                                    borderRadius: "8px",
                                                    textDecoration: "none",
                                                    marginRight: "24px",
                                                }}
                                            >
                                                <img
                                                    alt="edit"
                                                    src="/icons/edit.png"
                                                    width={50}
                                                    height={50}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    float: "right",
                                                    width: "360px",
                                                    height: "80px",
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        verticalAlign: "middle",
                                                        display: "inline-block",
                                                        fontFamily: "Poppins",
                                                        fontSize: "17px",
                                                        color: "#081F32",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    Edit profile
                                                </p>
                                                <p
                                                    style={{
                                                        verticalAlign: "middle",
                                                        display: "inline-block",
                                                        marginTop: "-1%",
                                                        fontFamily: "Open Sans",
                                                        fontSize: "14px",
                                                        color: "#6E798C",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    You will be able to change your name,
                                                    description, contact, website, and address.
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                {/* Your Product */}
                                <div
                                    className="d-flex align-items-center"
                                    style={{
                                        fontFamily: "Open Sans",
                                        fontSize: "15px",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        lineHeight: "40px",
                                        marginBottom: "0",
                                        marginTop: "24px",
                                        display: "flex",
                                    }}
                                >
                                    Your Product(s)
                                    <div
                                        className="d-flex justify-content-center align-items-center"
                                        style={{
                                            width: "40px",
                                            height: "24px",
                                            background: "#007AE9",
                                            borderRadius: "8px",
                                            textDecoration: "none",
                                            marginLeft: "8px",
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: "white",
                                                fontFamily: "Open Sans",
                                                fontStyle: "normal",
                                                fontWeight: "600",
                                                fontSize: "16px",
                                                lineHeight: "40px",
                                            }}
                                        >
                                            {product !== undefined ? product.length : "-"}
                                        </span>
                                    </div>
                                </div>
                                <hr style={{ marginTop: "2px", marginBottom: "30px" }} />

                                <div
                                    className="row d-flex justify-content-center"
                                    style={{ width: "105%" }}
                                >
                                    {/* <div style={{width: '100%', display: 'grid', gridTemplateColumns: '25% 25% 25% 25%'}}> */}
                                    {product === undefined ? (
                                        <div />
                                    ) : (
                                        product.map((item) => {
                                            return (
                                                <div
                                                    key={item.id}
                                                    style={{
                                                        float: "",
                                                        marginBottom: "32px",
                                                        marginTop: "0px",
                                                        marginRight: "32px",
                                                        width: "280px",
                                                    }}
                                                >
                                                    <div
                                                        className="card"
                                                        style={{
                                                            border: 0,
                                                            filter: "drop-shadow(0px 24px 64px rgba(0, 0, 0, 0.06))",
                                                            paddingBottom: "16px",
                                                            width: "280px",
                                                            height: "380px",
                                                            cursor: "pointer",
                                                            borderRadius: "16px",
                                                        }}
                                                    >
                                                        <Link
                                                            to="/productDetail"
                                                            state={{ id: item.id }}
                                                        >
                                                            <div>
                                                                <img
                                                                    alt="card-img"
                                                                    className="card-img-top"
                                                                    src={item.image1}
                                                                    title="card image"
                                                                    style={{
                                                                        width: "280px",
                                                                        height: "200px",
                                                                    }}
                                                                />
                                                                <div
                                                                    className="card-body d-flex"
                                                                    style={{
                                                                        flexFlow: "column",
                                                                        padding: 0,
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            display: "flex",
                                                                            position: "",
                                                                            padding:
                                                                                "4px 24px 8px 24px",
                                                                            width: "auto",
                                                                            height: "auto",
                                                                            whiteSpace: "nowrap",
                                                                            overflow: "hidden",
                                                                            textOverflow:
                                                                                "ellipsis",
                                                                        }}
                                                                    >
                                                                        {item.categories.map(
                                                                            (category, index) => {
                                                                                return (
                                                                                    <div
                                                                                        key={`${category}${index}`}
                                                                                        className="d-flex justify-content-center align-items-center"
                                                                                        style={{
                                                                                            border: "1px solid #007AE9",
                                                                                            borderRadius:
                                                                                                "8px",
                                                                                            width: "auto",
                                                                                            height: "20px",
                                                                                            fontFamily:
                                                                                                "Open Sans",
                                                                                            fontSize:
                                                                                                "11px",
                                                                                            fontWeight:
                                                                                                "600",
                                                                                            lineHeight:
                                                                                                "15px",
                                                                                            color: "#007AE9",
                                                                                            margin: "12px 8px 0px 0px",
                                                                                            padding:
                                                                                                "8px 8px 8px 8px",
                                                                                        }}
                                                                                    >
                                                                                        {capitalize(
                                                                                            category
                                                                                        )}
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </div>
                                                                    <p
                                                                        className="card-title"
                                                                        width={350}
                                                                        style={{
                                                                            fontFamily: "Poppins",
                                                                            fontWeight: "600",
                                                                            fontSize: "14px",
                                                                            lineHeight: "25px",
                                                                            color: "081F32",
                                                                            padding:
                                                                                "12px 24px 4px 24px",
                                                                            marginBottom: 0,
                                                                            whiteSpace: "nowrap",
                                                                            overflow: "hidden",
                                                                            textOverflow:
                                                                                "ellipsis",
                                                                        }}
                                                                    >
                                                                        {item.name}
                                                                    </p>
                                                                    <div
                                                                        className="card-text"
                                                                        style={{
                                                                            display: "inline-block",
                                                                            color: "#374A59",
                                                                            fontWeight: 400,
                                                                            fontFamily: "Open Sans",
                                                                            fontSize: "13px",
                                                                            lineHeight: "19px",
                                                                            padding:
                                                                                "0 24px 0 24px",
                                                                            height: "38px",
                                                                        }}
                                                                    >
                                                                        <LinesEllipsis
                                                                            text={item.detail}
                                                                            maxLine="1"
                                                                            ellipsis="..."
                                                                            trimRight
                                                                            basedOn="letters"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>

                                                        <div style={{ marginTop: "auto" }}>
                                                            <hr
                                                                style={{
                                                                    marginBottom: 0,
                                                                    marginTop: "16px",
                                                                }}
                                                            />
                                                            <Link
                                                                to="/addProduct"
                                                                state={{ id: item.id }}
                                                            >
                                                                <div
                                                                    className="d-flex justify-content-center align-items-center"
                                                                    style={{
                                                                        width: "50%",
                                                                        height: "40px",
                                                                        float: "left",
                                                                        bottom: 0,
                                                                        cursor: "pointer",
                                                                        textDecoration: "",
                                                                    }}
                                                                >
                                                                    <span
                                                                        className="d-flex justify-content-center"
                                                                        style={{
                                                                            width: "100% ",
                                                                            textAlign: "center",
                                                                            fontFamily: "Open Sans",
                                                                            fontSize: "13px",
                                                                            color: "#007AE9",
                                                                        }}
                                                                    >
                                                                        <span
                                                                            className="d-flex align-items-center justify-content-center"
                                                                            style={{
                                                                                marginRight: "5px",
                                                                            }}
                                                                        >
                                                                            <img
                                                                                alt="edit-blue"
                                                                                width={13}
                                                                                height={13}
                                                                                src="/icons/edit_blue.png"
                                                                            />
                                                                            <span
                                                                                style={{
                                                                                    marginLeft:
                                                                                        "8px",
                                                                                }}
                                                                            >
                                                                                Edit
                                                                            </span>
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </Link>

                                                            {/* QR */}
                                                            <a
                                                                href={
                                                                    "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=" +
                                                                    "http%3A%2F%2Flocalhost:3000%2FproductDetail%3Fid%3D" +
                                                                    item.id
                                                                }
                                                                target="_blank"
                                                                className="d-flex justify-content-center align-items-center"
                                                                style={{
                                                                    width: "50%",
                                                                    height: "40px",
                                                                    float: "right",
                                                                    borderLeft:
                                                                        "1px solid rgba(0,0,0,0.1)",
                                                                    bottom: 0,
                                                                    cursor: "pointer",
                                                                    textDecoration: "",
                                                                }}
                                                                rel="noreferrer"
                                                            >
                                                                <span
                                                                    className="d-flex justify-content-center "
                                                                    style={{
                                                                        width: "100% ",
                                                                        textAlign: "center",
                                                                        fontFamily: "Open Sans",
                                                                        fontSize: "13px",
                                                                        color: "#007AE9",
                                                                    }}
                                                                >
                                                                    <span
                                                                        className="d-flex align-items-center justify-content-center"
                                                                        style={{
                                                                            marginRight: "5px",
                                                                        }}
                                                                    >
                                                                        <img
                                                                            alt="qr"
                                                                            width={13}
                                                                            height={13}
                                                                            src="/icons/qr_blue.png"
                                                                        />
                                                                        <span
                                                                            style={{
                                                                                marginLeft: "8px",
                                                                            }}
                                                                        >
                                                                            Show QR
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </Layout>
                    <style>{`
                            ::placeholder {
                                color: #cacaca;
                                font-family: Open Sans;
                                font-size: 14px;
                                font-style: normal;
                                font-weight: 400;
                                line-height: 19px;
                            }
                            .card-img-top {
                                border-top-left-radius: 16px;
                                border-top-right-radius: 16px;
                            }
                        `}</style>
                </div>
            ) : (
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "100vh", width: "100vw", backgroundColor: "#188a8d" }}
                >
                    <ReactLoading type="bars" color="#FFFFFF" height={"10%"} width={"10%"} />
                </div>
            )}
        </div>
    );
};

export default ManuHome;
