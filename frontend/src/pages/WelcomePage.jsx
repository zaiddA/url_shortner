import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background-color: #f5f5f5;
`;

const WelcomeContainer = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
`;

const Title = styled.h1`
    color: #333;
    margin-bottom: 1rem;
    font-size: 2.5rem;
`;

const Subtitle = styled.p`
    color: #666;
    margin-bottom: 1.5rem;
    font-size: 1rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
`;

const StyledButton = styled(Link)`
    flex: 1;
    text-decoration: none;

    button {
        width: 100%;
        padding: 0.75rem 2rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        text-align: center;
        border: none;
        cursor: pointer;
        transition: opacity 0.2s;
    }

    &:hover button {
        opacity: 0.9;
    }

    &:first-child button {
        background-color: #2196f3;
        color: white;
    }

    &:last-child button {
        background-color: #4caf50;
        color: white;
    }
`;

const WelcomePage = () => {
    return (
        <PageContainer>
            <WelcomeContainer>
                <Title>Welcome to URL Shortener</Title>
                <Subtitle>Please log or register in to create shortened links</Subtitle>
                <ButtonContainer>
                    <StyledButton to="/login">
                        <button>Log In</button>
                    </StyledButton>
                    <StyledButton to="/register">
                        <button>Register</button>
                    </StyledButton>
                </ButtonContainer>
            </WelcomeContainer>
        </PageContainer>
    );
};

export default WelcomePage;
