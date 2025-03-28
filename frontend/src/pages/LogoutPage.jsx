import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';

const LogoutContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 64px);
    padding: 2rem;
`;

const LogoutMessage = styled.div`
    text-align: center;
    font-size: 1.2rem;
    color: #666;
`;

const LogoutPage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            await logout();
            navigate('/login');
        };
        handleLogout();
    }, [logout, navigate]);

    return (
        <LogoutContainer>
            <LogoutMessage>Logging out...</LogoutMessage>
        </LogoutContainer>
    );
};

export default LogoutPage;