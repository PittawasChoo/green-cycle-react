import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "pages/Main";

import About from "pages/About";
import Contact from "pages/Contact";
import Location from "pages/Location";
import Search from "pages/Search";

import MaterialDetail from "pages/MaterialDetail";
import ProductDetail from "pages/ProductDetail";
import ProjectDetail from "pages/ProjectDetail";

import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import CreateAccount from "pages/CreateAccount";
import CreateSuccessful from "pages/CreateSuccesful";
import SelectRole from "pages/SelectRole";

import AdminHome from "pages/AdminHome";
import ContHome from "pages/ContHome";
import ManuHome from "pages/ManuHome";

import AddProduct from "pages/AddProduct";
import AddProject from "pages/AddProject";
import AddCategory from "pages/AddCategory";
import AddMaterial from "pages/AddMaterial";
import MaterialRequest from "pages/MaterialRequest";
import UserRequest from "pages/UserRequest";
import EditProfile from "pages/EditProfile";

import Report from "pages/Report";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />

                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/location" element={<Location />} />
                <Route path="/search" element={<Search />} />

                <Route path="/materialDetail" element={<MaterialDetail />} />
                <Route path="/projectDetail" element={<ProjectDetail />} />
                <Route path="/productDetail" element={<ProductDetail />} />

                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/createAccount" element={<CreateAccount />} />
                <Route path="/createSuccessful" element={<CreateSuccessful />} />
                <Route path="/selectRole" element={<SelectRole />} />

                <Route path="/adminHome" element={<AdminHome />} />
                <Route path="/contHome" element={<ContHome />} />
                <Route path="/manuHome" element={<ManuHome />} />

                <Route path="/addProduct" element={<AddProduct />} />
                <Route path="/addProject" element={<AddProject />} />
                <Route path="/addCategory" element={<AddCategory />} />
                <Route path="/addMaterial" element={<AddMaterial />} />
                <Route path="/materialRequest" element={<MaterialRequest />} />
                <Route path="/userRequest" element={<UserRequest />} />
                <Route path="/editProfile" element={<EditProfile />} />

                <Route path="/report" element={<Report />} />
                {/* <Route path="*" element={<PageNotFound />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
