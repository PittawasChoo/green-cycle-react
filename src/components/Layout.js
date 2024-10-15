import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

const Layout = (props) => (
    <div>
        <div style={{}}>
            <div
                style={{
                    minHeight: "100vh",
                }}
            >
                {props.children}
            </div>
            <style>{`
                body {
                    margin: 0;
                    padding: 0;
                    max-width: 100vw;
                }
            `}</style>
        </div>
    </div>
);

export default Layout;
