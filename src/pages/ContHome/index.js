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

const ContHome = () => {
    const [token, setToken] = useState(null);
    const [data, setData] = useState(null);
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const cookies = new Cookies();
            let token = await cookies.get("token");
            setToken(token);

            await axios
                .get(`http://localhost:3003/contributor/data`, {
                    headers: {
                        Authorization: cookies.get("token"),
                    },
                })
                .then((res) => {
                    setData(res.data);
                });

            await axios
                .get(`http://localhost:3003/contributor/project`, {
                    headers: {
                        Authorization: cookies.get("token"),
                    },
                })
                .then((res) => {
                    setProject(res.data);
                });
        };

        fetchData();
    }, []);

    const hideProject = async (id) => {
        const header = {
            Authorization: token,
        };

        await axios.post(
            `http://localhost:3003/contributor/updateProject/` + id,
            {
                status: "Hidden",
            },
            {
                headers: header,
            }
        );

        let tmpProject = project;
        tmpProject.foreach((project) => {
            if (project.id === id) {
                project.status = "Hidden";
            }
        });
        setProject(tmpProject);
    };

    const showProject = async (id) => {
        const header = {
            Authorization: token,
        };

        await axios.post(
            `http://localhost:3003/contributor/updateProject/` + id,
            {
                status: "Available",
            },
            {
                headers: header,
            }
        );

        let tmpProject = project;
        tmpProject.foreach((project) => {
            if (project.id === id) {
                project.status = "Available";
            }
        });
        setProject(tmpProject);
    };

    return (
        <div style={{ maxWidth: "100vw" }}>
            {data && project ? (
                <div>
                    <Layout title="GreenCycle: A community-base forwarding system">
                        <Navbar />
                        <div
                            className="d-flex align-items-start"
                            style={{
                                minHeight: "100vh",
                                width: "100%",
                                background: "#f8f8f8",
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
                                                    alt="profile"
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

                                {/* <div style={{ margin: "0 32px"}}> */}
                                <div style={{ display: "flex", width: "100%" }}>
                                    {/* add project */}
                                    <Link to="/addProject">
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
                                                        //paddingTop: "10px",
                                                        fontFamily: "Poppins",
                                                        fontSize: "17px",
                                                        color: "#081F32",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    Add new campaign
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
                                                    Spread the word about your campaign, and
                                                    encourage user to donate.
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
                                                        //paddingTop: "10px",
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
                                {/* </div> */}

                                {/* Your Campaign */}
                                <div
                                    className="d-flex align-items-center"
                                    style={{
                                        fontFamily: "Open Sans",
                                        fontSize: "15px",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        lineHeight: "40px",
                                        marginTop: "24px",
                                        marginBottom: "0",
                                        display: "flex",
                                    }}
                                >
                                    Your Campaign(s)
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
                                            {project !== undefined ? project.length : "-"}
                                        </span>
                                    </div>
                                </div>

                                <hr style={{ marginTop: "2px", marginBottom: "30px" }} />

                                <div
                                    className="row d-flex justify-content-center"
                                    style={{
                                        width: "105%",
                                        //display: "grid",
                                        //gridTemplateColumns: "25% 25% 25% 25%"
                                    }}
                                >
                                    {project === undefined ? (
                                        <div />
                                    ) : (
                                        project.map((project) => {
                                            return (
                                                <div
                                                    key={project.id}
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
                                                            to="/projectDetail"
                                                            state={{ id: project.id }}
                                                        >
                                                            <div>
                                                                <img
                                                                    alt="card-img"
                                                                    className="card-img-top"
                                                                    src={project.image1}
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
                                                                        {project.categories.map(
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
                                                                        {project.name}
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
                                                                            text={
                                                                                project.projectDetail
                                                                            }
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

                                                            {/* edit */}
                                                            <Link
                                                                to="/addProject"
                                                                state={{ id: project.id }}
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
                                                                                alt="card-edit"
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

                                                            {/* hide */}
                                                            <div
                                                                onClick={
                                                                    project.status !== "Hidden"
                                                                        ? () =>
                                                                              hideProject(
                                                                                  project.id
                                                                              )
                                                                        : () =>
                                                                              showProject(
                                                                                  project.id
                                                                              )
                                                                }
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
                                                                            alt="card-hide"
                                                                            width={13}
                                                                            height={13}
                                                                            src={
                                                                                project.status !==
                                                                                "Hidden"
                                                                                    ? "/icons/hide_blue.png"
                                                                                    : "/icons/show_blue.png"
                                                                            }
                                                                        />
                                                                        <span
                                                                            style={{
                                                                                marginLeft: "8px",
                                                                            }}
                                                                        >
                                                                            {project.status !==
                                                                            "Hidden"
                                                                                ? "Hide"
                                                                                : "Show"}
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </div>
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

export default ContHome;
