import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../homepage/HomePage";
import Register from "../register/Register";
import Login from "../login/Login";
import PrivateRoute from "../privateroute/PrivateRoute";

const Layout = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/home/folders" element={<PrivateRoute element={<HomePage />} />} />
          <Route path="/home/folders/:folderId" element={<PrivateRoute element={<HomePage />} />} />
          <Route path="/*" element={<PrivateRoute element={<HomePage />} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Layout;
