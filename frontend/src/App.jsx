import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import React, { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Header from "./components/Header.jsx";
import MainPage from "./pages/MainPage.jsx";
import Footer from "./components/Footer.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import MyLinksPage from "./pages/MyLinksPage.jsx";
import AboutQuickLink from "./pages/AboutQuickLink.jsx";
import AboutMe from "./pages/AboutMe.jsx";
import axios from 'axios';
import config from './config';
import styled from 'styled-components';

// Styled components
const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 64px);
    padding: 2rem;
    background-color: #f5f5f5;
`;

const Card = styled.div`
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
`;

// Short URL Redirect component
const ShortUrlRedirect = () => {
  const { hash } = useParams();
  console.log(hash);
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToSource = async () => {
      if (!hash) {
        navigate('/');
        return;
      }

      try {
        const response = await axios.get(`${config.API_URL}/api/link/get-link/${hash}/`);
        if (response.data && response.data.source_url) {
          // Redirect to the source URL
          window.location.href = response.data.source_url;

        } else {
          navigate('/');
        }
      } catch (err) {
        navigate('/');
      }
    };

    redirectToSource();
  }, [hash, navigate]);

  return (
    <MainContainer>
      <Card>
        <p>Redirecting to your link...</p>
      </Card>
    </MainContainer>
  );
};

const AppContent = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/l/:hash" element={<ShortUrlRedirect />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/about-quicklink" element={<AboutQuickLink />} />
          <Route path="/about-me" element={<AboutMe />} />
          <Route
            path="/my-links"
            element={
              <ProtectedRoute>
                <MyLinksPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <Router>
    <AuthProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </AuthProvider>
  </Router>
);

export default App;