import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import ReactLoading from "react-loading";
import { Alert } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import Footer from "components/Footer";
import Layout from "components/Layout";
import Navbar from "components/Navbar";
import ProjectCard from "components/ProjectCard";
import ProductCard from "components/ProductCard";

import { capitalize } from "modules/capitalize";

const MaterialDetail = () => {
    const location = useLocation();
    const { id, show } = location.state;

    const [token, setToken] = useState(null);
    const [showImage, setShowImage] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [name, setName] = useState(null);
    const [detail, setDetail] = useState(null);
    const [categories, setCategories] = useState(null);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [status, setStatus] = useState(null);
    const [management, setManagement] = useState(null);
    const [relatedCampaign, setRelatedCampaign] = useState(null);
    const [relatedProduct, setRelatedProduct] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [confirmDelete, setConfimDelete] = useState(false);

    const inputRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            const cookies = new Cookies();
            let token = cookies.get("token");
            setToken(token);

            const header = {
                Authorization: token,
            };

            if (token !== undefined) {
                await axios
                    .get("http://localhost:3003/user/role", {
                        headers: header,
                    })
                    .then((res) => {
                        if (res.data.role === "admin") {
                            setIsOwner({ isOwner: true });
                        }
                    });
            }

            await axios
                .post(`http://localhost:3003/material`, {
                    id: id,
                })
                .then((res) => {
                    const data = res.data;

                    setShowImage(data.image1);
                    setName(data.name);
                    setDetail(data.detail);
                    setImage1(data.image1);
                    setImage2(data.image2);
                    setImage3(data.image3);
                    setImage4(data.image4);
                    setStatus(data.recyclable);
                    setCategories(data.category);
                    setManagement(data.management);
                });

            await axios
                .post(`http://localhost:3003/contributor/relatedProject`, {
                    id: id,
                    material: [id],
                })
                .then((res) => {
                    setRelatedCampaign(res.data);
                });

            await axios
                .post(`http://localhost:3003/manufacturer/relatedProduct`, {
                    id: id,
                    material: [id],
                })
                .then((res) => {
                    setRelatedProduct(res.data);
                });

            if (show) {
                setShowAlert(true);
            }
        };

        fetchData();
    }, [id, show]);

    const setShowingImage = (image) => {
        setShowImage(image);
    };

    const onDismiss = () => {
        setShowAlert(false);
    };

    const deleteMaterial = async () => {
        axios.post(
            "http://localhost:3003/material/deleteMaterial",
            {
                id: id,
            },
            {
                headers: { Authorization: token },
            }
        );
        inputRef.current.click();
    };

    return (
        <div style={{ maxWidth: "100vw" }}>
            <Layout title={name ? "Material: " + name : "Material: "}>
                {name ? (
                    <div>
                        <Navbar />
                        <div
                            className="d-flex align-items-start"
                            style={{
                                minHeight: "100vh",
                                width: "100%",
                                background: "white",
                                padding: "0 102px 0 102px",
                                paddingBottom: "100px",
                            }}
                        >
                            {name ? (
                                <div
                                    style={{
                                        paddingTop: "120px",
                                        width: "100%",
                                    }}
                                >
                                    <Alert
                                        color="success"
                                        isOpen={showAlert}
                                        toggle={() => onDismiss()}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <img
                                                alt="check"
                                                src="/icons/check.png"
                                                width={16}
                                                height={16}
                                            />
                                            <strong>&nbsp;{name}</strong> &nbsp;is finished {show}.
                                        </div>
                                    </Alert>
                                    <div
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            paddingBottom: "50px",
                                        }}
                                    >
                                        <div style={{ width: "590px" }}>
                                            <div
                                                style={{
                                                    position: "sticky",
                                                    top: "120px",
                                                    width: "590px",
                                                }}
                                            >
                                                <img
                                                    alt="main-image"
                                                    src={showImage}
                                                    style={{
                                                        width: "100%",
                                                        height: "420px",
                                                        border: 0,
                                                        borderRadius: "16px",
                                                        objectFit: "cover",
                                                        marginBottom: "24px",
                                                    }}
                                                />
                                                <div style={{ display: "flex" }}>
                                                    <div
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => setShowingImage(image1)}
                                                    >
                                                        <img
                                                            alt="image1"
                                                            src={image1}
                                                            style={{
                                                                width: "80px",
                                                                height: "80px",
                                                                border: 0,
                                                                borderRadius: "8px",
                                                                objectFit: "cover",
                                                                cursor: "pointer",
                                                                marginRight: "24px",
                                                            }}
                                                        />
                                                    </div>
                                                    {image2 ? (
                                                        <div
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => setShowingImage(image2)}
                                                        >
                                                            <img
                                                                alt="image2"
                                                                src={image2}
                                                                style={{
                                                                    width: "80px",
                                                                    height: "80px",
                                                                    border: 0,
                                                                    borderRadius: "8px",
                                                                    objectFit: "cover",
                                                                    cursor: "pointer",
                                                                    marginRight: "24px",
                                                                }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div />
                                                    )}
                                                    {image3 ? (
                                                        <div
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => setShowingImage(image3)}
                                                        >
                                                            <img
                                                                alt="image3"
                                                                src={image3}
                                                                style={{
                                                                    width: "80px",
                                                                    height: "80px",
                                                                    border: 0,
                                                                    borderRadius: "8px",
                                                                    objectFit: "cover",
                                                                    cursor: "pointer",
                                                                    marginRight: "24px",
                                                                }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div />
                                                    )}
                                                    {image4 ? (
                                                        <div
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => setShowingImage(image4)}
                                                        >
                                                            <img
                                                                alt="image4"
                                                                src={image4}
                                                                style={{
                                                                    width: "80px",
                                                                    height: "80px",
                                                                    border: 0,
                                                                    borderRadius: "8px",
                                                                    objectFit: "cover",
                                                                    cursor: "pointer",
                                                                }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                paddingLeft: "120px",
                                                width: "100%",
                                            }}
                                        >
                                            <div
                                                className="d-flex justify-content-between align-items-center"
                                                style={{ width: "100%" }}
                                            >
                                                <p className="material-name">{name}</p>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        marginLeft: "50px",
                                                    }}
                                                >
                                                    {isOwner ? (
                                                        <div>
                                                            <img
                                                                alt="more"
                                                                onClick={() => setIsOpen(!isOpen)}
                                                                src="/icons/more.png"
                                                                style={{
                                                                    width: "25px",
                                                                    height: "25px",
                                                                    border: 0,
                                                                    borderRadius: "8px",
                                                                    objectFit: "cover",
                                                                    cursor: "pointer",
                                                                    opacity: "0.4",
                                                                }}
                                                            />
                                                            {isOpen ? (
                                                                <div
                                                                    className="shadow container-box"
                                                                    style={{
                                                                        position: "absolute",
                                                                        width: "170px",
                                                                        marginBottom: "-190px",
                                                                        marginLeft: "-140px",
                                                                        zIndex: 4,
                                                                    }}
                                                                >
                                                                    <div
                                                                        className="option-box"
                                                                        style={{
                                                                            padding: "16px",
                                                                        }}
                                                                    >
                                                                        <Link
                                                                            to="/addMaterial"
                                                                            state={{
                                                                                id: id,
                                                                            }}
                                                                        >
                                                                            <div
                                                                                style={{
                                                                                    width: "100%",
                                                                                    cursor: "pointer",
                                                                                    textDecoration:
                                                                                        "none",
                                                                                }}
                                                                            >
                                                                                <span
                                                                                    className="d-flex align-items-center"
                                                                                    style={{
                                                                                        width: "100% ",
                                                                                        textAlign:
                                                                                            "center",
                                                                                        marginBottom:
                                                                                            "0",
                                                                                        fontFamily:
                                                                                            "Open Sans",
                                                                                        fontSize:
                                                                                            "14px",
                                                                                        lineHeight:
                                                                                            "19px",
                                                                                        color: "black",
                                                                                    }}
                                                                                >
                                                                                    <span
                                                                                        className="d-flex align-items-center justify-content-center"
                                                                                        style={{
                                                                                            marginRight:
                                                                                                "5px",
                                                                                        }}
                                                                                    >
                                                                                        <img
                                                                                            alt="edit"
                                                                                            src="/icons/edit_black.png"
                                                                                            style={{
                                                                                                width: "16px",
                                                                                                height: "16px",
                                                                                                marginLeft:
                                                                                                    "20px",
                                                                                            }}
                                                                                        />
                                                                                        <p
                                                                                            style={{
                                                                                                margin: "0 30px",
                                                                                                textAlign:
                                                                                                    "center",
                                                                                            }}
                                                                                        >
                                                                                            Edit
                                                                                        </p>
                                                                                    </span>
                                                                                </span>
                                                                            </div>
                                                                        </Link>
                                                                        <hr />
                                                                        <div
                                                                            onClick={() =>
                                                                                setConfimDelete(
                                                                                    true
                                                                                )
                                                                            }
                                                                            style={{
                                                                                width: "100%",
                                                                                cursor: "pointer",
                                                                                textDecoration:
                                                                                    "none",
                                                                            }}
                                                                        >
                                                                            <span
                                                                                className="d-flex align-items-center"
                                                                                style={{
                                                                                    width: "100% ",
                                                                                    textAlign:
                                                                                        "center",
                                                                                    marginBottom:
                                                                                        "0",
                                                                                    fontFamily:
                                                                                        "Open Sans",
                                                                                    fontSize:
                                                                                        "14px",
                                                                                    lineHeight:
                                                                                        "19px",
                                                                                    color: "black",
                                                                                }}
                                                                            >
                                                                                <span
                                                                                    className="d-flex align-items-center justify-content-center"
                                                                                    style={{
                                                                                        marginRight:
                                                                                            "5px",
                                                                                    }}
                                                                                >
                                                                                    <img
                                                                                        alt="delete"
                                                                                        src="/icons/delete.png"
                                                                                        style={{
                                                                                            width: "16px",
                                                                                            height: "16px",
                                                                                            marginLeft:
                                                                                                "20px",
                                                                                        }}
                                                                                    />
                                                                                    <p
                                                                                        style={{
                                                                                            margin: "0 30px",
                                                                                            textAlign:
                                                                                                "center",
                                                                                        }}
                                                                                    >
                                                                                        Delete
                                                                                    </p>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div />
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <a href="/report">
                                                            <img
                                                                data-tip="React-tooltip"
                                                                data-for="report"
                                                                alt="Report Problem"
                                                                src="/icons/report.png"
                                                                style={{
                                                                    width: "25px",
                                                                    height: "25px",
                                                                    border: 0,
                                                                    borderRadius: "8px",
                                                                    objectFit: "cover",
                                                                    cursor: "pointer",
                                                                    opacity: "0.4",
                                                                }}
                                                            />
                                                            <Tooltip
                                                                id="report"
                                                                place="right"
                                                                effect="solid"
                                                            >
                                                                Click here to report problem about
                                                                this page
                                                            </Tooltip>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                            <div style={{ display: "flex" }}>
                                                {categories.map((category, index) => {
                                                    return (
                                                        <div
                                                            key={`${category}${index}`}
                                                            className="d-flex justify-content-center align-items-center category-box"
                                                        >
                                                            {capitalize(category)}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <hr />
                                            <p className="label">Material Details</p>
                                            <p className="content">{detail}</p>
                                            <hr />
                                            <div className="d-flex justify-content-between">
                                                <div className="label">Status </div>
                                                <div className="content-black">
                                                    {status ? "Recyclable" : "Non Recyclable"}
                                                </div>
                                            </div>
                                            <hr />
                                            <p className="label">How to Manage</p>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    marginBottom: "16px",
                                                }}
                                            >
                                                <div className="d-flex justify-content-center align-items-center selected-category-box">
                                                    {capitalize(name)}
                                                </div>
                                            </div>
                                            {management.map((howToManage, index) => {
                                                return (
                                                    <div
                                                        key={`${howToManage.headline}${index}`}
                                                        style={{
                                                            width: "100%",
                                                            borderRadius: "16px",
                                                            backgroundColor: "#F2F3F7",
                                                            padding: "16px 23px",
                                                            marginBottom: "16px",
                                                        }}
                                                    >
                                                        <p className="headline">
                                                            {howToManage.headline}
                                                        </p>
                                                        <p className="management">
                                                            {howToManage.howTo}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                            <hr style={{ marginBottom: 0 }} />
                                        </div>
                                    </div>

                                    {/* related campaign */}
                                    {relatedCampaign && relatedCampaign.length > 0 && (
                                        <div>
                                            <p className="label2">Related Campaign</p>
                                            <div
                                                className="row d-flex justify-content-start"
                                                style={{
                                                    width: "100%",
                                                    margin: "0px 0px 0px 16px",
                                                    maxHeight: "350px",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {relatedCampaign ? (
                                                    relatedCampaign.map((project) => {
                                                        return (
                                                            <div key={project.id}>
                                                                <ProjectCard project={project} />
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <div />
                                                )}
                                            </div>
                                            {relatedProduct && relatedProduct.length > 0 && <hr />}
                                        </div>
                                    )}

                                    {/* related product */}
                                    {relatedProduct && relatedProduct.length > 0 && (
                                        <div>
                                            <p className="label2">Related Product</p>
                                            <div
                                                className="row d-flex justify-content-start"
                                                style={{
                                                    width: "100%",
                                                    margin: "0px 0px 0px 16px",
                                                    maxHeight: "350px",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {relatedProduct ? (
                                                    relatedProduct.map((product) => {
                                                        return (
                                                            <div key={product.id}>
                                                                <ProductCard product={product} />
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <div />
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div />
                            )}
                        </div>
                        <Footer />
                        {confirmDelete ? (
                            <div
                                style={{
                                    position: "fixed",
                                    width: "100%",
                                    height: "100%",
                                    zIndex: "5",
                                    top: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        backgroundColor: "rgba(0,0,0,0.4)",
                                    }}
                                />
                                <div
                                    style={{
                                        width: "440px",
                                        backgroundColor: "white",
                                        position: "absolute",
                                        boxShadow:
                                            "0px 4px 24px rgba(13, 53, 89, 0.03), 0px 4px 6px rgba(15, 81, 140, 0.06)",
                                        borderRadius: "16px",
                                        padding: "32px",
                                    }}
                                >
                                    <p
                                        style={{
                                            fontFamily: "Open Sans",
                                            fontSize: "20px",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            lineHeight: "40px",
                                            marginBottom: "16px",
                                        }}
                                    >
                                        Delete this project
                                    </p>
                                    <p className="modal-li">
                                        Are you sure you want to delete this project?
                                    </p>
                                    <div
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                        }}
                                    >
                                        <div
                                            onClick={() => setConfimDelete(false)}
                                            className="d-flex justify-content-center align-items-center"
                                            style={{
                                                width: "174px",
                                                height: "48px",
                                                background: "#F2F3F7",
                                                borderRadius: "8px",
                                                textDecoration: "none",
                                                float: "right",
                                                color: "#6E798C",
                                                fontFamily: "Roboto",
                                                fontStyle: "normal",
                                                fontWeight: "400",
                                                fontSize: "16px",
                                                lineHeight: "18px",
                                                margin: "0 auto",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Cancel
                                        </div>
                                        <div
                                            onClick={() => deleteMaterial()}
                                            className="d-flex justify-content-center align-items-center"
                                            style={{
                                                width: "174px",
                                                height: "48px",
                                                background: "#CA0B00",
                                                borderRadius: "8px",
                                                textDecoration: "none",
                                                float: "right",
                                                color: "white",
                                                fontFamily: "Roboto",
                                                fontStyle: "normal",
                                                fontWeight: "400",
                                                fontSize: "16px",
                                                lineHeight: "18px",
                                                margin: "0 auto",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Delete this Material
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div />
                        )}
                    </div>
                ) : (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            height: "100vh",
                            width: "100vw",
                            backgroundColor: "#188a8d",
                            zIndex: "20",
                            position: "fixed",
                            top: 0,
                        }}
                    >
                        <ReactLoading type="bars" color="#FFFFFF" height={"10%"} width={"10%"} />
                    </div>
                )}
            </Layout>
            <style>{`
                .material-name {
                    padding-top: 10px;
                    font-family: Poppins;
                    font-style: normal;
                    font-weight: 600;
                    font-size: 40px;
                    line-height: 50px;
                    color: #081f32;
                    margin-bottom: 16px;
                }
                .category-box {
                    border: 1px solid #007ae9;
                    border-radius: 8px;
                    min-width: 55px;
                    height: 24px;
                    font-family: Open Sans;
                    font-size: 11px;
                    font-weight: 600;
                    line-height: 15px;
                    color: #007ae9;
                    margin-right: 12px;
                    padding-left: 8px;
                    padding-right: 8px;
                }
                .selected-category-box {
                    border: 1px solid #007ae9;
                    border-radius: 8px;
                    min-width: 55px;
                    height: 24px;
                    font-family: Open Sans;
                    font-size: 11px;
                    font-weight: 600;
                    line-height: 15px;
                    background-color: #007ae9;
                    color: white;
                    margin-right: 12px;
                    padding-left: 8px;
                    padding-right: 8px;
                }
                .label {
                    font-family: Open Sans;
                    font-size: 18px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 25px;
                    color: black;
                }
                .content {
                    font-family: Open Sans;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 25px;
                    color: #081f32;
                    opacity: 0.8;
                }
                .content-black {
                    font-family: Open Sans;
                    font-style: normal;
                    font-size: 16px;
                    font-weight: normal;
                    line-height: 25px;
                    color: black;
                }
                .card-img-top {
                    border-top-left-radius: 16px;
                    border-top-right-radius: 16px;
                }
                .label2 {
                    font-family: Poppins;
                    font-size: 24px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 25px;
                    letter-spacing: 0em;
                    text-align: left;
                }
                .headline {
                    font-family: Open Sans;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 25px;
                    letter-spacing: 0em;
                    text-align: left;
                    color: #081f32;
                    margin-bottom: 0;
                }
                .management {
                    font-family: Open Sans;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 25px;
                    letter-spacing: 0em;
                    text-align: left;
                    color: #081f32;
                    margin-bottom: 0;
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
                a {
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default MaterialDetail;
