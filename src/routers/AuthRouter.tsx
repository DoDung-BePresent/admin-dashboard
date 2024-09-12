import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, SignUp } from "../screens";
import { Typography } from "antd";

const { Title } = Typography;

const AuthRouter = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col d-none d-lg-block text-center"
          style={{ marginTop: "15%" }}
        >
          <div className="mb-4">
            <img
              style={{
                width: 256,
                objectFit: "cover",
              }}
              src="https://firebasestorage.googleapis.com/v0/b/kanban-2cf22.appspot.com/o/Group%201122.png?alt=media&token=7729da1a-914e-417e-b148-dba255de06a3"
              alt=""
            />
          </div>
          <div>
            <Title className="text-primary">KANBAN</Title>
          </div>
        </div>

        <div className="col content-center">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};

export default AuthRouter;
