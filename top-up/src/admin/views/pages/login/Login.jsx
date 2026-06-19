import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Login gagal");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat login");
    }
  };

  const handleGoogleCallback = async (response) => {
    const credential = response.credential;
    try {
      const res = await fetch("http://localhost:8000/api/admin/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError("Login Google gagal");
      }
    } catch (err) {
      setError("Login Google error");
    }
  };

  useEffect(() => {
    if (typeof google !== "undefined") {
      /* global google */
      google.accounts.id.initialize({
        client_id: "279072542678-oqhnq4faca0d2d4tc4e25sq21sj9b9ih.apps.googleusercontent.com",
        callback: handleGoogleCallback,
      });
      google.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        backgroundImage: 'url("/public/image/bglogin.jpg")',
      }}
    >
      <CContainer >
        <CRow className="justify-content-center ">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4 bg-white/10 backdrop-blur-md text-white placeholder-white border border-white/30 rounded px-3 py-2 w-full focus:outline-none">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1 className="text-center my-2 display-6 font-italic">Login</h1>
                    <p className="text-white">Sign In to your account</p>

                    {error && <p className="text-danger text-sm mb-2">{error}</p>}

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link text-white" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>

                    <div className="mt-4 text-center" id="google-login-btn"></div>
                  </CForm>
                </CCardBody>
              </CCard>

              <CCard
                className="text-white py-5"
                style={{
                  width: "50%",
                  backgroundImage: 'url("/public/image/logomlbb.webp")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <CCardBody className="text-center"></CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
