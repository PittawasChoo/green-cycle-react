import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { Scanner } from "@yudiel/react-qr-scanner";

import { createSearchParams, useNavigate } from "react-router-dom";

import Card from "components/Card";
import Footer from "components/Footer";
import Layout from "components/Layout";
import Navbar from "components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";

const Search = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [allProduct, setAllProduct] = useState([]);
    const [allProject, setAllProject] = useState([]);
    const [allMaterial, setAllMaterial] = useState([]);
    const [allCard, setAllCard] = useState([]);
    const [option, setOption] = useState(1);
    const [input, setInput] = useState("");
    const [showQRReader, setShowQRReader] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                let allCardArray = [];

                await axios.get(`http://localhost:3003/material/approved`).then((res) => {
                    setAllMaterial(res.data);
                    res.data.forEach((material) => {
                        material.categories = material.category;
                        material.path = "/materialDetail";
                        allCardArray = [...allCardArray, material];
                    });
                });

                await axios.get(`http://localhost:3003/contributor/allProject`).then((res) => {
                    const filterProject = res.data.filter((project) => {
                        return project.status !== "Hidden";
                    });
                    setAllProject(filterProject);
                    filterProject.forEach((project) => {
                        project.detail = project.projectDetail;
                        project.path = "/projectDetail";
                        allCardArray = [...allCardArray, project];
                    });
                });

                await axios.get(`http://localhost:3003/manufacturer/allProduct`).then((res) => {
                    setAllProduct(res.data);
                    res.data.forEach((product) => {
                        product.path = "/productDetail";
                        allCardArray = [...allCardArray, product];
                    });
                });

                setAllCard(allCardArray);
            } catch (error) {
                console.error(error.message);
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const checkInput = (input, array) => {
        if (!input) {
            return array;
        }
        let inputArray = input.split(/[&\\#,+()$~%.'":*?<>{}[\] ^_=|`฿?;@!]/g).filter((word) => {
            return word !== "";
        });
        let mergedArray = [];
        for (let j = 0; j < inputArray.length; j++) {
            const filterByName = array.filter((item) => {
                return item.name.toLowerCase().includes(inputArray[j].toLowerCase());
            });
            const filterByCategory = array.filter((item) => {
                let check = false;
                for (let i = 0; i < item.categories.length; i++) {
                    if (item.categories[i].toLowerCase().includes(inputArray[j].toLowerCase())) {
                        check = true;
                    }
                }
                return check;
            });
            const filterByMaterial = array.filter((item) => {
                if (!item.material) {
                    return false;
                } else {
                    let check = false;
                    for (let i = 0; i < item.material.length; i++) {
                        if (
                            item.material[i].name
                                .toLowerCase()
                                .includes(inputArray[j].toLowerCase())
                        ) {
                            check = true;
                        }
                    }
                    return check;
                }
            });
            const filterByDetail = array.filter((item) => {
                return item.detail.toLowerCase().includes(inputArray[j].toLowerCase());
            });
            let searchResult = [
                ...filterByName,
                ...filterByDetail,
                ...filterByMaterial,
                ...filterByCategory,
            ];
            if (j === 0) {
                let set = new Set();
                let unionArray = searchResult.filter((item) => {
                    if (!set.has(item.id)) {
                        set.add(item.id);
                        return true;
                    }
                    return false;
                }, set);
                mergedArray = unionArray;
            } else {
                const mergedArrayIds = mergedArray.map((mergedItem) => mergedItem.id);

                let intersectArray = searchResult.filter((item) => {
                    return mergedArrayIds.includes(item.id);
                });

                mergedArray = intersectArray;
            }
        }
        return mergedArray;
    };

    const showCard = (option) => {
        switch (option) {
            case 1:
                const allArray = checkInput(input, allCard);
                return allArray.map((card) => {
                    return (
                        <div key={card.id}>
                            <Card
                                path={card.path}
                                id={card.id}
                                name={card.name}
                                categories={card.categories}
                                image1={card.image1}
                                detail={card.detail}
                            />
                        </div>
                    );
                });
            case 2:
                const projectArray = checkInput(input, allProject);
                return projectArray.map((project) => {
                    return (
                        <div key={project.id}>
                            <Card
                                path={project.path}
                                id={project.id}
                                name={project.name}
                                categories={project.categories}
                                image1={project.image1}
                                detail={project.detail}
                            />
                        </div>
                    );
                });
            case 3:
                const productArray = checkInput(input, allProduct);
                return productArray.map((product) => {
                    return (
                        <div key={product.id}>
                            <Card
                                path={product.path}
                                id={product.id}
                                name={product.name}
                                categories={product.categories}
                                image1={product.image1}
                                detail={product.detail}
                            />
                        </div>
                    );
                });
            case 4:
                const materialArray = checkInput(input, allMaterial);
                return materialArray.map((material) => {
                    return (
                        <div key={material.id}>
                            <Card
                                path={material.path}
                                id={material.id}
                                name={material.name}
                                categories={material.categories}
                                image1={material.image1}
                                detail={material.detail}
                            />
                        </div>
                    );
                });
            default:
                const defaultArray = checkInput(input, allCard);
                return defaultArray.map((card) => {
                    return (
                        <div key={card.id}>
                            <Card
                                path={card.path}
                                id={card.id}
                                name={card.name}
                                categories={card.categories}
                                image1={card.image1}
                                detail={card.detail}
                            />
                        </div>
                    );
                });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setInput(e.target.value);
        }
    };

    const toggleImageDialog = () => {
        setShowQRReader(!showQRReader);
    };

    return (
        <div style={{ maxWidth: "100vw" }}>
            {!isLoading ? (
                <div>
                    <Layout title="GreenCycle: A community-base forwarding system">
                        <Navbar />
                        <div
                            style={{
                                minHeight: "100vh",
                                width: "100%",
                                background: "white",
                                padding: "130px 118px 0 118px",
                                paddingBottom: "100px",
                            }}
                        >
                            <div
                                className="row d-flex justify-content-center tab"
                                style={{
                                    margin: "0px 0px 32px 0px",
                                    fontFamily: "Open Sans",
                                    fontWeight: "600",
                                }}
                            >
                                <div
                                    className={option === 1 ? "col-md-3 selectedTab" : "col-md-3"}
                                    onClick={() => setOption(1)}
                                    style={{
                                        cursor: "pointer",
                                        borderBottom: "1.5px solid rgba(0,0,0,0.1)",
                                        paddingBottom: "16px",
                                    }}
                                >
                                    All
                                </div>
                                <div
                                    className={option === 2 ? "col-md-3 selectedTab" : "col-md-3"}
                                    onClick={() => setOption(2)}
                                    style={{
                                        cursor: "pointer",
                                        borderBottom: "1.5px solid rgba(0,0,0,0.1)",
                                        paddingBottom: "16px",
                                    }}
                                >
                                    Campaigns
                                </div>
                                <div
                                    className={option === 3 ? "col-md-3 selectedTab" : "col-md-3"}
                                    onClick={() => setOption(3)}
                                    style={{
                                        cursor: "pointer",
                                        borderBottom: "1.5px solid rgba(0,0,0,0.1)",
                                        paddingBottom: "16px",
                                    }}
                                >
                                    Products
                                </div>
                                <div
                                    className={option === 4 ? "col-md-3 selectedTab" : "col-md-3"}
                                    onClick={() => setOption(4)}
                                    style={{
                                        cursor: "pointer",
                                        borderBottom: "1.5px solid rgba(0,0,0,0.1)",
                                        paddingBottom: "16px",
                                    }}
                                >
                                    Materials
                                </div>
                            </div>

                            {showQRReader && (
                                <div
                                    style={{
                                        width: "100%",
                                        height: "540px",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <div>
                                        <div style={{ width: "500px", height: "500px" }}>
                                            <Scanner
                                                onScan={(result) => {
                                                    console.log("result", result);
                                                    const url = result[0].rawValue;
                                                    console.log("url", url);
                                                    const splittedURL = url.split("?");
                                                    const path = splittedURL[0];
                                                    const page = path.split("/").at(-1);
                                                    const id = splittedURL[1].substring(3);
                                                    navigate({
                                                        pathname: `../${page}`,
                                                        search: `?${createSearchParams({
                                                            id,
                                                        })}`,
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "14px",
                                                color: "rgba(0,0,0,0.5)",
                                                textAlign: "center",
                                                paddingTop: "10px",
                                            }}
                                        >
                                            Please show the QR code to the camera to open that
                                            product detail page
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="d-flex justify-content-center">
                                <div
                                    style={{
                                        width: "100%",
                                        marginRight: "16px",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        marginBottom: "32px",
                                        alignItems: "center",
                                    }}
                                >
                                    <input
                                        type="text"
                                        name="input"
                                        placeholder="Search here..."
                                        onKeyDown={handleKeyDown}
                                        style={{
                                            width: "100%",
                                            height: "41px",
                                            borderRadius: "16px",
                                            backgroundColor: "rgba(0,0,0,.05)",
                                            border: "none",
                                            paddingLeft: "24px",
                                            paddingRight: "24px",
                                        }}
                                    />
                                    <span
                                        onClick={() => setInput("")}
                                        style={{
                                            position: "absolute",
                                            fontSize: "14px",
                                            opacity: 0.4,
                                            paddingRight: "16px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        X
                                    </span>
                                </div>

                                {/* upload img */}
                                <div
                                    className="d-flex justify-content-center align-items-center img-uploader"
                                    onClick={toggleImageDialog}
                                    style={{
                                        backgroundColor: showQRReader ? "rgba(0,0,0,0.2)" : "white",
                                    }}
                                >
                                    <img
                                        alt="qr"
                                        src="/icons/qr.png"
                                        style={{ width: "24px", height: "24px", opacity: 0.5 }}
                                    />
                                </div>
                            </div>

                            {/* card */}
                            <div
                                className="cardContainer"
                                style={{
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                {showCard(option)}
                            </div>
                        </div>
                        <Footer />
                    </Layout>
                </div>
            ) : (
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "100vh", width: "100vw", backgroundColor: "#188a8d" }}
                >
                    <ReactLoading type="bars" color="#FFFFFF" height={"10%"} width={"10%"} />
                </div>
            )}
            <style>{`
                a {
                    cursor: pointer;
                    color: rgba(0, 0, 0, 0.4);
                }

                .tab a:hover {
                    text-decoration: none;
                    color: #007ae9;
                    border-bottom: 2px solid #007ae9 !important;
                    border-radius: 1px;
                    position: inline-block;
                    transition: all 100ms ease-out;
                }

                .selectedTab {
                    text-decoration: none;
                    color: #007ae9;
                    border-bottom: 2px solid #007ae9 !important;
                    border-radius: 1px;
                    position: inline-block;
                    transition: all 100ms ease-out;
                }

                .tab a:active {
                    color: #007ae9;
                    //border-color: #007AE9 !important;
                    border-bottom: 2px solid #007ae9 !important;
                    border-radius: 1px;
                    position: inline-block;
                    transition: all 100ms ease-out;
                }

                .tab a:focus {
                    color: #007ae9;
                    //border-color: #007AE9 !important;
                    border-bottom: 2px solid #007ae9 !important;
                    border-radius: 1px;
                    position: inline-block;
                }

                .img-uploader {
                    width: 52px;
                    height: 41px;
                    border-radius: 8px;
                    cursor: pointer;
                    border: 1px solid rgba(0, 0, 0, 0.32);
                }

                .tab {
                    // border-bottom: 2px solid transparent;
                    // border-bottom: 2px solid black;
                }

                .cardContainer {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, 280px);
                    justify-content: space-between;
                    grid-gap: 20px;
                }
            `}</style>
        </div>
    );
};

export default Search;
