import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import LinesEllipsis from "react-lines-ellipsis";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

import Navbar from "components/Navbar";
import Layout from "components/Layout";
import Footer from "components/Footer";

import { capitalize } from "modules/capitalize";

import "bootstrap/dist/css/bootstrap.min.css";

const AdminHome = () => {
    const [admin, setAdmin] = useState();
    const [material, setMaterial] = useState();
    // const [category, setCategory] = useState();
    // const [unapprovedUsers, setUnapprovedUsers] = useState();
    const [length, setLength] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const cookies = new Cookies();
            let userToken = await cookies.get("token");
            const data = await axios.get(`http://localhost:3003/admin`, {
                headers: { Authorization: userToken },
            });

            const materialRes = await axios.get(`http://localhost:3003/material/approved`);

            // const categoryRes = await axios.get(`http://localhost:3003/category`);

            // const unapprovedUserRes = await axios.get(`http://localhost:3003/user/unapproved`);

            setMaterial(materialRes.data);
            // setCategory(categoryRes.data);
            // setUnapprovedUsers(unapprovedUserRes.data);
            setLength(materialRes.data.length);
            setAdmin(data.data);
        };

        fetchData();
    }, []);

    return (
        <div style={{ maxWidth: "100vw" }}>
            <Layout title="GreenCycle: A community-base forwarding system">
                {admin ? (
                    <div>
                        <Navbar />
                        <div
                            className="d-flex align-items-start"
                            style={{
                                minHeight: "100vh",
                                width: "100%",
                                background: "#F8F8F8",
                                padding: "130px 118px 100px 118px",
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                }}
                            >
                                <p
                                    style={{
                                        fontFamily: "Open Sans",
                                        fontSize: "15px",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        lineHeight: "40px",
                                        marginBottom: "0",
                                    }}
                                >
                                    Greeting, admin 🖐🏻
                                </p>
                                <hr style={{ marginTop: "2px", marginBottom: "30px" }} />

                                {/* <div style={{ margin: "0 32px"}}> */}

                                {/* Register new type */}
                                <Link to="/addCategory">
                                    <div
                                        style={{
                                            width: "49%",
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
                                                Register new type
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
                                                Register new tags to classify each material, provide
                                                users to explore more.
                                            </p>
                                        </div>
                                    </div>
                                </Link>

                                {/* Register new item */}
                                <Link to="/addMaterial">
                                    <div
                                        style={{
                                            width: "49%",
                                            marginBottom: "16px",
                                            height: "120px",
                                            float: "right",
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
                                                alt="edit"
                                                src="/icons/edit_app.png"
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
                                                Register new item
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
                                                Add new material into the system, provide intensive
                                                information on how to manage each one.
                                            </p>
                                        </div>
                                    </div>
                                </Link>

                                {/* approve user */}
                                <Link to="/userRequest">
                                    <div
                                        style={{
                                            width: "49%",
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
                                                alt="approve"
                                                src="/icons/approve_user.png"
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
                                                Verify new user
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
                                                Examine newly registered accounts. Let users gain
                                                access according to their role.
                                            </p>
                                        </div>
                                    </div>
                                </Link>

                                {/* approve material */}
                                <Link to="/materialRequest">
                                    <div
                                        style={{
                                            width: "49%",
                                            marginBottom: "16px",
                                            height: "120px",
                                            float: "right",
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
                                                alt="approve-item"
                                                src="/icons/approve_item.png"
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
                                                Approve requested material
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
                                                Examine the manufacturer’s request. Approve new
                                                material to update whole new information.
                                            </p>
                                        </div>
                                    </div>
                                </Link>

                                {/* Bottom */}
                                <div
                                    className="d-flex align-items-center"
                                    style={{
                                        fontFamily: "Open Sans",
                                        fontSize: "15px",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        lineHeight: "40px",
                                        marginTop: "330px",
                                        marginBottom: "0",
                                        display: "flex",
                                    }}
                                >
                                    Materials
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
                                                fontWeight: "400",
                                                fontSize: "15px",
                                            }}
                                        >
                                            {length}
                                        </span>
                                    </div>
                                </div>

                                <hr style={{ marginTop: "2px", marginBottom: "30px" }} />

                                <div
                                    className="row d-flex justify-content-center"
                                    style={{
                                        width: "105%",
                                    }}
                                >
                                    {material.map((material) => {
                                        return material.isVerified ? (
                                            <div
                                                key={material.id}
                                                style={{
                                                    width: "280px",
                                                    marginBottom: "32px",
                                                    marginTop: "0px",
                                                    marginRight: "32px",
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
                                                        to="/materialDetail"
                                                        state={{ id: material.id }}
                                                    >
                                                        <img
                                                            alt="card-img"
                                                            className="card-img-top"
                                                            src={material.image1}
                                                            title="card image"
                                                            style={{
                                                                width: "280px",
                                                                height: "200px",
                                                            }}
                                                        />
                                                    </Link>

                                                    <div
                                                        className="card-body d-flex"
                                                        style={{
                                                            flexFlow: "column",
                                                            padding: 0,
                                                        }}
                                                    >
                                                        <Link
                                                            to="/materialDetail"
                                                            state={{ id: material.id }}
                                                        >
                                                            <div>
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
                                                                        textOverflow: "ellipsis",
                                                                    }}
                                                                >
                                                                    {material.category.map(
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
                                                                        textOverflow: "ellipsis",
                                                                    }}
                                                                >
                                                                    {material.name}
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
                                                                        padding: "0 24px 0 24px",
                                                                        height: "38px",
                                                                    }}
                                                                >
                                                                    <LinesEllipsis
                                                                        text={material.detail}
                                                                        maxLine="1"
                                                                        ellipsis="..."
                                                                        trimRight
                                                                        basedOn="letters"
                                                                    />
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
                                                                to="/addMaterial"
                                                                state={{ id: material.id }}
                                                            >
                                                                <div
                                                                    className="d-flex justify-content-center align-items-center"
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "44px",
                                                                        float: "left",
                                                                        bottom: 0,
                                                                        cursor: "pointer",
                                                                        textDecoration: "",
                                                                    }}
                                                                >
                                                                    <span
                                                                        style={{
                                                                            width: "100% ",
                                                                            textAlign: "center",
                                                                            marginBottom: "8px",
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
                                                                                alt="edit"
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
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <span />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                ) : (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: "100vh", width: "100vw", backgroundColor: "#188a8d" }}
                    >
                        <ReactLoading type="bars" color="#FFFFFF" height={"10%"} width={"10%"} />
                    </div>
                )}
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
    );
};

export default AdminHome;
