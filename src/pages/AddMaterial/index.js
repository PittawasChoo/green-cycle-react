import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Multiselect from "multiselect-react-dropdown";
import ReactLoading from "react-loading";
import { get } from "lodash";
import { Link, useLocation } from "react-router-dom";

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
        gridTemplateColumns: "auto auto auto auto auto",
        listStyleType: "none",
        padding: "20px",
    },
};

const selectStatusStyle = {
    chips: {
        fontFamily: "Open Sans",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "19px",
        letterSpacing: "0em",
        marginBottom: 0,
        paddingLeft: 0,
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
    },
};

const AddMaterial = () => {
    const rrdLocation = useLocation();
    const id = get(rrdLocation, "state.id", null);
    const requestBy = get(rrdLocation, "state.requestBy", null);
    const materialName = get(rrdLocation, "state.name", null);

    const [token, setToken] = useState(null);
    const [page, setPage] = useState(1);
    const [name, setName] = useState(null);
    const [category, setCategory] = useState(null);
    const [option, setOption] = useState([]);
    const [selectedStatusArray, setSelectedStatusArray] = useState(null);
    const [modal, setModal] = useState(false);
    const [detail, setDetail] = useState(null);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [oldImage1, setOldImage1] = useState(null);
    const [oldImage2, setOldImage2] = useState(null);
    const [oldImage3, setOldImage3] = useState(null);
    const [oldImage4, setOldImage4] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [selectedCategoryArray, setSelectedCategoryArray] = useState([]);
    const [headline, setHeadline] = useState(null);
    const [management, setManagement] = useState(null);
    const [managementArray, setManagementArray] = useState(null);
    const [howToManage, setHowToManage] = useState([]);
    const [materialId, setMaterialId] = useState(null);

    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef();
    const inputRef4 = useRef();

    const alertText = "publishing";

    useEffect(() => {
        const fetchData = async () => {
            // axios.get(`http://localhost:3003/category`)
            axios.get(`http://localhost:3003/category`).then((res) => {
                let optionArray = [];
                for (let i = 0; i < res.data.length; i++) {
                    optionArray = [
                        ...optionArray,
                        {
                            name: res.data[i],
                            id: i + 1,
                        },
                    ];
                }
                setOption(optionArray);
                setCategory(res.data);
            });

            const cookies = new Cookies();
            let token = cookies.get("token");

            setToken(token);

            if (id && !requestBy) {
                // await axios.post('http://localhost:3003/material',
                await axios
                    .post(`http://localhost:3003/material`, {
                        id: id,
                    })
                    .then((res) => {
                        const data = res.data;

                        setName(data.name);
                        setDetail(data.detail);
                        setOldImage1(data.image1 || null);
                        setOldImage2(data.image2 || null);
                        setOldImage3(data.image3 || null);
                        setOldImage4(data.image4 || null);
                        setCategory(data.category);
                        setStatus(data.recyclable);
                        setManagementArray(data.management);
                    });
                const filteredCategory = option.filter((item) => {
                    let check = false;
                    for (let i = 0; i < category.length; i++) {
                        if (item.name === category[i]) {
                            check = true;
                        }
                    }
                    return check;
                });
                let howTo = howToManage;
                managementArray.foreach((mnm) => {
                    howTo = [
                        ...howTo,
                        {
                            headline: mnm.headline,
                            howTo: mnm.howTo,
                        },
                    ];
                });
                setHowToManage(howTo);
                setSelectedCategoryArray(filteredCategory);

                if (status) {
                    selectedStatusArray([{ name: "Recyclable", id: 1 }]);
                } else {
                    selectedStatusArray([{ name: "Non Recyclable", id: 2 }]);
                }
            } else if (id && requestBy) {
                setName(materialName);
            }
        };

        fetchData();
    }, [
        category,
        howToManage,
        id,
        managementArray,
        materialName,
        option,
        requestBy,
        selectedStatusArray,
        status,
    ]);

    const triggerInput1 = (e) => {
        e.persist();
        inputRef1.current.click();
    };

    const triggerInput2 = (e) => {
        e.persist();
        inputRef2.current.click();
    };

    const triggerInput3 = (e) => {
        e.persist();
        inputRef3.current.click();
    };

    const triggerInput4 = (e) => {
        e.persist();
        inputRef4.current.click();
    };

    const togglePage = (page) => {
        if (page === 1) {
            setPage(2);
        } else if (page === 2) {
            setPage(1);
        }
    };

    const toggleModal = () => {
        setModal(!modal);
    };

    const onSelectCategory = (selectedList, selectedItem) => {
        let categoryArray = [];

        for (let i = 0; i < selectedList.length; i++) {
            categoryArray = [...categoryArray, selectedList[i].name];
        }
        setCategory(categoryArray);
        setSelectedCategoryArray(selectedList);
    };

    const onRemoveCategory = (selectedList, removedItem) => {
        let categoryArray = [];

        for (let i = 0; i < selectedList.length; i++) {
            categoryArray = [...categoryArray, selectedList[i].name];
        }
        setCategory(categoryArray);
        setSelectedCategoryArray(selectedList);
    };

    const onSelectStatus = (selectedList, selectedItem) => {
        setSelectedStatusArray(selectedList);
    };

    const uploadImg = async (image) => {
        if (!image) {
            return null;
        }
        let data = new FormData();
        data.append("file", image, image.name);
        // const res = await axios.post('http://localhost:3003/upload', data)
        const res = await axios.post("http://localhost:3003/upload", data);
        return res.data;
    };

    const createMaterial = async () => {
        setLoading(true);

        const header = {
            Authorization: token,
        };

        const img1 = await uploadImg(image1);
        const img2 = await uploadImg(image2);
        const img3 = await uploadImg(image3);
        const img4 = await uploadImg(image4);

        // await axios.post('http://localhost:3003/material/add',
        const res = await axios.post(
            `http://localhost:3003/material/add`,
            {
                name: name,
                category: category,
                recyclable: selectedStatusArray[0].name === "Recyclable",
                detail: detail,
                image1: img1,
                image2: img2,
                image3: img3,
                image4: img4,
                management: howToManage,
                isVerified: true,
            },
            {
                headers: header,
            }
        );

        if (materialName && id && requestBy) {
            // axios.post('http://localhost:3003/material/accept', {
            axios.post(`http://localhost:3003/material/accept`, {
                id: id,
                requestBy: requestBy,
                name: materialName,
            });
        }

        setMaterialId(res.data);
        setSuccess(true);
        setLoading(false);
    };

    const addHowTo = () => {
        let array = howToManage;
        let howTo = {
            headline: headline,
            howTo: management,
        };
        array = [...array, howTo];

        setHowToManage(array);
        setHeadline("");
        setManagement("");
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
                        {page === 1 ? (
                            <div>
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
                                <div
                                    onClick={() => togglePage(page)}
                                    style={{
                                        padding: "16px",
                                        color: "black",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                        fontWeight: "600",
                                    }}
                                >
                                    Management Guide
                                </div>
                                <hr style={{ margin: 0 }} />
                            </div>
                        ) : (
                            <div>
                                <div
                                    onClick={() => togglePage(page)}
                                    style={{
                                        padding: "16px",
                                        color: "black",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                        fontWeight: "600",
                                    }}
                                >
                                    Basic Information
                                </div>
                                <hr style={{ margin: 0 }} />
                                <p
                                    style={{
                                        padding: "16px",
                                        color: "#007AE9",
                                        cursor: "default",
                                        margin: 0,
                                        fontWeight: "600",
                                    }}
                                >
                                    Management Guide
                                </p>
                                <hr style={{ margin: 0 }} />
                            </div>
                        )}
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
                        {page === 1 ? (
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
                                        MATERIAL <span style={{ color: "#EB5757" }}>*</span>
                                    </label>
                                    <br />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Material Name"
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
                                        MATERIAL TYPE <span style={{ color: "#EB5757" }}>*</span>
                                    </label>
                                    <br />
                                    <Multiselect
                                        className="select-material"
                                        showArrow
                                        options={option}
                                        displayValue="name"
                                        placeholder=""
                                        showCheckbox={true}
                                        selectedValues={selectedCategoryArray}
                                        onSelect={onSelectCategory}
                                        onRemove={onRemoveCategory}
                                        closeOnSelect={false}
                                        style={multiselectStyle}
                                        closeIcon="cancel"
                                        avoidHighlightFirstOption={true}
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
                                        RECYCLABLE <span style={{ color: "#EB5757" }}>*</span>
                                    </label>
                                    <Multiselect
                                        singleSelect
                                        className="select-status"
                                        showArrow
                                        options={[
                                            { name: "Recyclable", id: 1 },
                                            { name: "Non Recyclable", id: 2 },
                                        ]}
                                        displayValue="name"
                                        placeholder=""
                                        selectedValues={selectedStatusArray}
                                        onSelect={onSelectStatus}
                                        avoidHighlightFirstOption={true}
                                        style={selectStatusStyle}
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
                                        DETAIL <span style={{ color: "#EB5757" }}>*</span>
                                    </label>
                                    <textarea
                                        name="detail"
                                        maxLength="500"
                                        placeholder=""
                                        value={detail}
                                        onChange={(e) => setDetail(e.target.value)}
                                        style={{
                                            resize: "none",
                                            width: "100%",
                                            height: "150px",
                                            borderRadius: "16px",
                                            backgroundColor: "#F2F3F7",
                                            border: "none",
                                            marginBottom: "16px",
                                            paddingLeft: "24px",
                                            paddingTop: "17px",
                                            paddingRight: "24px",
                                        }}
                                    />
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
                                        PHOTO <span style={{ color: "#EB5757" }}>*</span>
                                    </label>
                                    <br />
                                    <div className="d-flex">
                                        <div className="uploader-container">
                                            <div
                                                className="d-flex justify-content-center align-items-center img-uploader"
                                                onClick={(e) => triggerInput1(e)}
                                            >
                                                <input
                                                    style={{
                                                        position: "absolute",
                                                        top: "-9999px",
                                                    }}
                                                    ref={inputRef1}
                                                    type="file"
                                                    onChange={(e) => setImage1(e.target.files[0])}
                                                />
                                                {image1 ? (
                                                    <img
                                                        alt="image1"
                                                        src={URL.createObjectURL(image1)}
                                                        style={{
                                                            width: "180px",
                                                            height: "180px",
                                                            border: 0,
                                                            borderRadius: "16px",
                                                        }}
                                                    />
                                                ) : oldImage1 ? (
                                                    <img
                                                        alt="old-image1"
                                                        src={oldImage1}
                                                        style={{
                                                            width: "180px",
                                                            height: "180px",
                                                            border: 0,
                                                            borderRadius: "16px",
                                                        }}
                                                    />
                                                ) : (
                                                    <img
                                                        alt="upload"
                                                        src="/icons/upload.png"
                                                        width={50}
                                                        height={50}
                                                    />
                                                )}
                                            </div>
                                            <p className="photo-description">* Photo 1</p>
                                            {image1 && (
                                                <p
                                                    className="remove"
                                                    onClick={() => setImage1(null)}
                                                >
                                                    Remove
                                                </p>
                                            )}
                                        </div>
                                        <div className="uploader-container">
                                            <div
                                                className="d-flex justify-content-center align-items-center img-uploader"
                                                onClick={(e) => triggerInput2(e)}
                                            >
                                                <input
                                                    style={{
                                                        position: "absolute",
                                                        top: "-9999px",
                                                    }}
                                                    ref={inputRef2}
                                                    type="file"
                                                    onChange={(e) => {
                                                        setImage2(e.target.files[0]);
                                                        setOldImage2(e.target.files[0]);
                                                    }}
                                                />
                                                {image2 ? (
                                                    <img
                                                        alt="image2"
                                                        src={URL.createObjectURL(image2)}
                                                        style={{
                                                            width: "180px",
                                                            height: "180px",
                                                            border: 0,
                                                            borderRadius: "16px",
                                                        }}
                                                    />
                                                ) : oldImage2 ? (
                                                    <img
                                                        alt="old-image2"
                                                        src={oldImage2}
                                                        style={{
                                                            width: "180px",
                                                            height: "180px",
                                                            border: 0,
                                                            borderRadius: "16px",
                                                        }}
                                                    />
                                                ) : (
                                                    <img
                                                        alt="upload"
                                                        src="/icons/upload.png"
                                                        width={50}
                                                        height={50}
                                                    />
                                                )}
                                            </div>
                                            <p className="photo-description">Photo 2</p>
                                            {image2 && (
                                                <p
                                                    className="remove"
                                                    onClick={() => setImage2(null)}
                                                >
                                                    Remove
                                                </p>
                                            )}
                                        </div>
                                        <div className="uploader-container">
                                            <div
                                                className="d-flex justify-content-center align-items-center img-uploader"
                                                onClick={(e) => triggerInput3(e)}
                                            >
                                                <input
                                                    style={{
                                                        position: "absolute",
                                                        top: "-9999px",
                                                    }}
                                                    ref={inputRef3}
                                                    type="file"
                                                    onChange={(e) => {
                                                        setImage3(e.target.files[0]);
                                                        setOldImage3(e.target.files[0]);
                                                    }}
                                                />
                                                {image3 ? (
                                                    <img
                                                        alt="image3"
                                                        src={URL.createObjectURL(image3)}
                                                        style={{
                                                            width: "180px",
                                                            height: "180px",
                                                            border: 0,
                                                            borderRadius: "16px",
                                                        }}
                                                    />
                                                ) : oldImage3 ? (
                                                    <img
                                                        alt="old-image3"
                                                        src={oldImage3}
                                                        style={{
                                                            width: "180px",
                                                            height: "180px",
                                                            border: 0,
                                                            borderRadius: "16px",
                                                        }}
                                                    />
                                                ) : (
                                                    <img
                                                        alt="upload"
                                                        src="/icons/upload.png"
                                                        width={50}
                                                        height={50}
                                                    />
                                                )}
                                            </div>
                                            <p className="photo-description">Photo 3</p>
                                            {image3 && (
                                                <p
                                                    className="remove"
                                                    onClick={() => setImage3(null)}
                                                >
                                                    Remove
                                                </p>
                                            )}
                                        </div>
                                        <div className="uploader-container">
                                            <div
                                                className="d-flex justify-content-center align-items-center img-uploader"
                                                onClick={(e) => triggerInput4(e)}
                                            >
                                                <input
                                                    style={{
                                                        position: "absolute",
                                                        top: "-9999px",
                                                    }}
                                                    ref={inputRef4}
                                                    type="file"
                                                    onChange={(e) => {
                                                        setImage4(e.target.files[0]);
                                                        setOldImage4(e.target.files[0]);
                                                    }}
                                                />
                                                {image4 ? (
                                                    <img
                                                        alt="image4"
                                                        src={URL.createObjectURL(image4)}
                                                        style={{
                                                            width: "180px",
                                                            height: "180px",
                                                            border: 0,
                                                            borderRadius: "16px",
                                                        }}
                                                    />
                                                ) : oldImage4 ? (
                                                    <img
                                                        alt="old-image4"
                                                        src={oldImage4}
                                                        style={{
                                                            width: "180px",
                                                            height: "180px",
                                                            border: 0,
                                                            borderRadius: "16px",
                                                        }}
                                                    />
                                                ) : (
                                                    <img
                                                        alt="upload"
                                                        src="/icons/upload.png"
                                                        width={50}
                                                        height={50}
                                                    />
                                                )}
                                            </div>
                                            <p className="photo-description">Photo 4</p>
                                            {image4 && (
                                                <p
                                                    className="remove"
                                                    onClick={() => setImage4(null)}
                                                >
                                                    Remove
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </form>
                                <div style={{ paddingRight: "29px" }}>
                                    <div
                                        className={
                                            name &&
                                            detail &&
                                            (image1 || oldImage1) &&
                                            selectedStatusArray &&
                                            category.length !== 0
                                                ? "d-flex justify-content-center align-items-center"
                                                : "not-ready d-flex justify-content-center align-items-center"
                                        }
                                        onClick={
                                            name &&
                                            detail &&
                                            (image1 || oldImage1) &&
                                            selectedStatusArray &&
                                            category.length !== 0
                                                ? () => togglePage(1)
                                                : () => {}
                                        }
                                        style={{
                                            width: "177px",
                                            height: "48px",
                                            background: "#007AE9",
                                            borderRadius: "8px",
                                            textDecoration: "none",
                                            float: "right",
                                            color: "white",
                                            fontFamily: "Open Sans",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            fontSize: "16px",
                                            lineHeight: "18px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Next
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // .............................. PAGE 2 ..............................

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
                                        HOW TO MANAGE <span style={{ color: "#EB5757" }}>* </span>
                                    </label>
                                    <br />
                                    <div
                                        className="how-to"
                                        style={{
                                            width: "100%",
                                            borderRadius: "16px",
                                            backgroundColor: "#F2F3F7",
                                            marginBottom: "16px",
                                        }}
                                    >
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Headline"
                                            value={headline}
                                            onChange={(e) => setHeadline(e.target.vaue)}
                                            style={{
                                                width: "100%",
                                                height: "56px",
                                                borderTopRightRadius: "16px",
                                                borderTopLeftRadius: "16px",
                                                backgroundColor: "#F2F3F7",
                                                border: "none",
                                                paddingLeft: "24px",
                                                paddingRight: "24px",
                                                outline: "none",
                                            }}
                                        />
                                        <div
                                            style={{
                                                width: "100%",
                                                backgroundColor: "#F2F3F7",
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <hr style={{ width: "95%", margin: 0 }} />
                                        </div>
                                        <textarea
                                            name="preparing"
                                            maxLength="500"
                                            placeholder=""
                                            value={management}
                                            onChange={(e) => setManagement(e.target.value)}
                                            style={{
                                                resize: "none",
                                                width: "100%",
                                                height: "100px",
                                                backgroundColor: "#F2F3F7",
                                                marginBottom: 0,
                                                border: "none",
                                                paddingLeft: "24px",
                                                paddingTop: "10px",
                                                paddingRight: "24px",
                                                outline: "none",
                                            }}
                                        />
                                        <div
                                            style={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                paddingRight: "24px",
                                                paddingBottom: "24px",
                                            }}
                                        >
                                            <div
                                                className={
                                                    headline && management
                                                        ? "d-flex justify-content-center align-items-center"
                                                        : "not-ready d-flex justify-content-center align-items-center"
                                                }
                                                onClick={
                                                    headline && management
                                                        ? () => addHowTo()
                                                        : () => {}
                                                }
                                                style={{
                                                    width: "54px",
                                                    height: "24px",
                                                    background: "#007AE9",
                                                    borderRadius: "8px",
                                                    textDecoration: "none",
                                                    float: "right",
                                                    color: "white",
                                                    fontFamily: "Open Sans",
                                                    fontStyle: "normal",
                                                    fontWeight: "400",
                                                    fontSize: "14px",
                                                    lineHeight: "16px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Save
                                            </div>
                                        </div>
                                    </div>
                                    {howToManage.length !== 0 ? (
                                        howToManage.map((howToManage, index) => {
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
                                        })
                                    ) : (
                                        <div />
                                    )}
                                </form>
                                <div style={{ paddingRight: "29px" }}>
                                    <div
                                        className={
                                            name &&
                                            detail &&
                                            (image1 || oldImage1) &&
                                            selectedStatusArray &&
                                            category.length !== 0 &&
                                            howToManage.length !== 0
                                                ? "d-flex justify-content-center align-items-center"
                                                : "not-ready d-flex justify-content-center align-items-center"
                                        }
                                        onClick={
                                            name &&
                                            detail &&
                                            (image1 || oldImage1) &&
                                            selectedStatusArray &&
                                            category.length !== 0 &&
                                            howToManage.length !== 0
                                                ? () => createMaterial()
                                                : () => {}
                                        }
                                        style={{
                                            width: "177px",
                                            height: "48px",
                                            background: "#007AE9",
                                            borderRadius: "8px",
                                            textDecoration: "none",
                                            float: "right",
                                            color: "white",
                                            fontFamily: "Open Sans",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            fontSize: "16px",
                                            lineHeight: "18px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Publish
                                    </div>
                                </div>
                            </div>
                        )}
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
                            zIndex: "20",
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
                                    marginBottom: "0",
                                }}
                            >
                                Congratulation!
                            </p>
                            <p className="modal-li" style={{ marginBottom: "30px" }}>
                                Your material has been created. You can view this material page or
                                go back to your home page.
                            </p>
                            <div style={{ width: "100%", display: "flex" }}>
                                <Link to="/adminHome">
                                    <div
                                        onClick={() => toggleModal()}
                                        className="d-flex justify-content-center align-items-center"
                                        style={{
                                            width: "174px",
                                            height: "48px",
                                            background: "#F2F3F7",
                                            borderRadius: "8px",
                                            textDecoration: "none",
                                            float: "right",
                                            color: "#6E798C",
                                            fontFamily: "Open Sans",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            fontSize: "14px",
                                            lineHeight: "18px",
                                            margin: "0 auto",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Go back to home page
                                    </div>
                                </Link>
                                <Link
                                    to="/materialDetail"
                                    state={{
                                        id: materialId,
                                        show: alertText,
                                    }}
                                >
                                    <div
                                        className="d-flex justify-content-center align-items-center"
                                        style={{
                                            width: "174px",
                                            height: "48px",
                                            background: "#007AE9",
                                            borderRadius: "8px",
                                            textDecoration: "none",
                                            float: "right",
                                            color: "white",
                                            fontFamily: "Open Sans",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            fontSize: "14px",
                                            lineHeight: "18px",
                                            margin: "0 auto",
                                            cursor: "pointer",
                                        }}
                                    >
                                        View this material
                                    </div>
                                </Link>
                            </div>
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
                    .how-to:focus-within {
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
                    .not-ready {
                        opacity: 0.3;
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
                    .remove {
                        font-family: Open Sans;
                        font-size: 14px;
                        text-align: center;
                        color: #007ae9;
                        cursor: pointer;
                        margin-top: 10;
                    }
                `}</style>
        </div>
    );
};

export default AddMaterial;
