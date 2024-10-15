import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Multiselect from "multiselect-react-dropdown";
import ReactLoading from "react-loading";
import { Tooltip } from "react-tooltip";

import Navbar from "components/Navbar";
import Layout from "components/Layout";
import Footer from "components/Footer";

const multiselectStyle = {
    chips: {
        background: "none",
        color: "#007AE9",
        borderRadius: "8px",
        border: "1px solid #007AE9",
        fontFamily: "Open Sans",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "19px",
        letterSpacing: "0em",
        marginBottom: 0,
    },
    searchBox: {
        width: "100%",
        height: "56px",
        borderRadius: "16px",
        backgroundColor: "#F2F3F7",
        border: "none",
        paddingLeft: "24px",
        paddingRight: "24px",
        display: "flex",
        alignItems: "center",
    },
    multiselectContainer: {
        fontFamily: "Open Sans",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "19px",
        borderRadius: "16px",
    },
    optionContainer: {
        background: "#F2F3F7",
        border: "1px solid #007AE9",
        borderRadius: "16px",
        display: "grid",
        gridTemplateColumns: "auto auto auto auto",
        listStyleType: "none",
    },
};

const AddCategory = () => {
    const [token, setToken] = useState(null);
    const [name, setName] = useState(null);
    const [material, setMaterial] = useState([]);
    const [option, setOption] = useState([]);
    const [selectedMaterialArray, setSelectedMaterialArray] = useState([]);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let optionArray = [];

            // axios.get('http://localhost:3003/material/approved')
            await axios.get(`http://localhost:3003/material/approved`).then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    optionArray = [
                        ...optionArray,
                        {
                            name: res.data[i].name,
                            id: i + 1,
                            mid: res.data[i].id,
                        },
                    ];
                }
                setOption(optionArray);
            });

            const cookies = new Cookies();
            let token = cookies.get("token");

            setToken(token);
        };

        fetchData();
    }, []);

    const onSelectMaterial = (selectedList, selectedItem) => {
        let materialArray = [];

        for (let i = 0; i < selectedList.length; i++) {
            materialArray = [...materialArray, selectedList[i].mid];
        }

        setMaterial(materialArray);
        setSelectedMaterialArray(selectedList);
    };

    const onRemoveMaterial = (selectedList, removedItem) => {
        let materialArray = [];

        for (let i = 0; i < selectedList.length; i++) {
            materialArray = [...materialArray, selectedList[i].mid];
        }

        setMaterial(materialArray);
        setSelectedMaterialArray(selectedList);
    };

    const createCategory = async () => {
        setLoading(true);
        const header = {
            Authorization: token,
        };

        // await axios.post(`http://localhost:3003/manufacturer/addProduct`,
        await axios
            .post(
                `http://localhost:3003/category/add`,
                {
                    name: name,
                    material: material,
                },
                {
                    headers: header,
                }
            )
            .then((res) => {
                setSuccess(true);
                setLoading(false);
            });
    };

    return (
        <div style={{ maxWidth: "100vw" }}>
            <Layout title="GreenCycle: A community-base forwarding system">
                <Navbar />
                <div
                    className="d-flex align-items-start"
                    style={{
                        height: "100vh",
                        width: "100%",
                        background: "#F8F8F8",
                        padding: "120px 120px 50px 120px",
                    }}
                >
                    <div
                        className="shadow"
                        style={{
                            width: "283px",
                            height: "100%",
                            borderRadius: "16px",
                            padding: "30px 24px 0 24px",
                        }}
                    >
                        <p
                            style={{
                                padding: "16px",
                                color: "#007AE9",
                                cursor: "default",
                                margin: 0,
                                fontWeight: "600",
                            }}
                        >
                            Basic Information
                        </p>
                        <hr style={{ margin: 0 }} />
                    </div>
                    <div
                        className="shadow"
                        style={{
                            flex: "1",
                            height: "100%",
                            marginLeft: "24px",
                            borderRadius: "16px",
                            padding: "43px 10px 30px 39px",
                        }}
                    >
                        <div style={{ height: "100%" }}>
                            <form
                                style={{
                                    height: "85%",
                                    marginBottom: "40px",
                                    overflowY: "scroll",
                                    paddingRight: "15px",
                                }}
                            >
                                <label
                                    style={{
                                        fontFamily: "Open Sans",
                                        fontSize: "12px",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        lineHeight: "17px",
                                        color: "#2B2B2B",
                                        letterSpacing: "1px",
                                        marginBottom: "16px",
                                    }}
                                >
                                    TYPE <span style={{ color: "#EB5757" }}>* </span>
                                    <img
                                        alt="tooltip"
                                        src="/icons/tooltip.png"
                                        width={12}
                                        height={12}
                                    />
                                    <Tooltip id="material" place="right" effect="solid">
                                        By publishing new type of recycling item, it will start by 0
                                        item. You will have to edit or register new item.{" "}
                                    </Tooltip>
                                </label>
                                <br />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Product Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{
                                        width: "100%",
                                        height: "56px",
                                        borderRadius: "16px",
                                        backgroundColor: "#F2F3F7",
                                        border: "none",
                                        marginBottom: "16px",
                                        paddingLeft: "24px",
                                        paddingRight: "24px",
                                    }}
                                />
                                <br />
                                <label
                                    style={{
                                        fontFamily: "Open Sans",
                                        fontSize: "12px",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        lineHeight: "17px",
                                        color: "#2B2B2B",
                                        letterSpacing: "1px",
                                        marginBottom: "16px",
                                    }}
                                >
                                    MATERIAL
                                </label>
                                <br />
                                <Multiselect
                                    className="select-material"
                                    showArrow
                                    options={option}
                                    displayValue="name"
                                    placeholder=""
                                    showCheckbox={true}
                                    selectedValues={selectedMaterialArray}
                                    onSelect={onSelectMaterial}
                                    onRemove={onRemoveMaterial}
                                    closeOnSelect={false}
                                    style={multiselectStyle}
                                    closeIcon="cancel"
                                    avoidHighlightFirstOption={true}
                                />
                            </form>
                            <div style={{ paddingRight: "29px" }}>
                                {name ? (
                                    <div
                                        className="d-flex justify-content-center align-items-center"
                                        onClick={() => createCategory()}
                                        style={{
                                            width: "177px",
                                            height: "48px",
                                            background: "#007AE9",
                                            borderRadius: "8px",
                                            textDecoration: "none",
                                            float: "right",
                                            color: "white",
                                            fontFamily: "Roboto",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            fontSize: "16px",
                                            lineHeight: "18px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Publish
                                    </div>
                                ) : (
                                    <div
                                        className="d-flex justify-content-center align-items-center"
                                        style={{
                                            width: "177px",
                                            height: "48px",
                                            background: "#007AE9",
                                            borderRadius: "8px",
                                            textDecoration: "none",
                                            float: "right",
                                            opacity: "0.3",
                                            color: "white",
                                            fontFamily: "Roboto",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            fontSize: "16px",
                                            lineHeight: "18px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Publish
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                {loading ? (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            height: "100vh",
                            width: "100vw",
                            backgroundColor: "rgba(0,0,0,0.4)",
                            zIndex: "1000",
                            position: "fixed",
                            top: 0,
                        }}
                    >
                        <ReactLoading type="bars" color="#FFFFFF" height={"10%"} width={"10%"} />
                    </div>
                ) : (
                    <div />
                )}
                {success ? (
                    <div
                        href="/adminHome"
                        style={{
                            position: "fixed",
                            width: "100%",
                            height: "100%",
                            zIndex: "100",
                            top: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0,0,0,0.4)",
                                cursor: "pointer",
                            }}
                        />
                        <div
                            style={{
                                backgroundColor: "white",
                                position: "absolute",
                                boxShadow:
                                    "0px 4px 24px rgba(13, 53, 89, 0.03), 0px 4px 6px rgba(15, 81, 140, 0.06)",
                                borderRadius: "16px",
                                padding: "32px",
                            }}
                        >
                            <div className="d-flex">
                                <p
                                    style={{
                                        fontFamily: "Open Sans",
                                        fontSize: "20px",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        lineHeight: "40px",
                                        marginBottom: "0",
                                        textDecoration: "none",
                                        color: "black",
                                    }}
                                >
                                    Report sent!
                                </p>
                                <img
                                    alt="close"
                                    className="ml-auto"
                                    src="/icons/close.png"
                                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                                />
                            </div>
                            <p className="modal-li">Your category has been created.</p>
                        </div>
                    </div>
                ) : (
                    <div />
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
                    .img-uploader {
                        width: 180px;
                        height: 180px;
                        border-radius: 16px;
                        background-color: #f2f3f7;
                        cursor: pointer;
                    }
                    .uploader-container {
                        margin: auto;
                    }
                    .photo-description {
                        font-family: Open Sans;
                        font-size: 14px;
                        line-height: 19px;
                        color: #858585;
                        opacity: 50%;
                        text-align: center;
                        margin-bottom: 0;
                        margin-top: 17px;
                    }
                    .multiselect-container:focus-within {
                        border: 1px solid #007ae9;
                    }
                    .optionListContainer {
                        backgroun-color: none !important;
                        border-radius: 16px !important;
                        margin-top: 18px !important;
                    }
                    .modal-ul {
                        padding-left: 15px;
                        margin-bottom: 24px;
                    }
                    .modal-li {
                        font-family: Open Sans;
                        font-size: 12px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 18px;
                        letter-spacing: 0em;
                        text-align: left;
                        color: rgba(0, 0, 0, 0.5);
                    }
                `}</style>
        </div>
    );
};

export default AddCategory;
