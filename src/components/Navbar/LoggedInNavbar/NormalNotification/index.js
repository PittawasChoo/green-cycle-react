import React from "react";

const Notification = ({ notiList = [] }) => {
    return (
        <div>
            <hr style={{ marginBottom: 0 }} />
            <div
                style={{
                    height: "520px",
                    overflow: "hidden",
                    flexFlow: "column wrap",
                    display: "flex",
                }}
            >
                {notiList
                    .slice(0)
                    .reverse()
                    .map((noti, index) => {
                        return (
                            <div key={`${noti.subject}${index}`}>
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
                                            alt="flag"
                                            width={"30px"}
                                            height={"30px"}
                                            src="/icons/flag.png"
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
                                            {noti.subject}
                                        </p>
                                        <p
                                            style={{
                                                fontSize: "12px",
                                                fontWeight: "400",
                                                color: "#6E798C",
                                                marginBottom: "0",
                                            }}
                                        >
                                            {noti.detail}
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
            </div>
        </div>
    );
};

export default Notification;
