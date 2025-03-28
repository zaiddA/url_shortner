import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const PageContainer = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background-color: #f5f5f5;
`;

const LoginContainer = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    margin-top: -4rem; /* Adjust vertical position */
`;

const Title = styled.h1`
    color: #333;
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 2rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    color: #666;
    font-size: 0.9rem;
    font-weight: 500;
`;

const Input = styled.input`
    padding: 0.75rem 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 6px;
    font-size: 1rem;
    transition: all 0.2s;

    &:focus {
        outline: none;
        border-color: #2196f3;
        box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
    }
`;

const LoginButton = styled.button`
    padding: 0.875rem;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 0.5rem;

    &:hover {
        background-color: #1976d2;
    }

    &:disabled {
        background-color: #90caf9;
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled.div`
    background-color: #ffebee;
    color: #c62828;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    font-size: 0.9rem;
    margin-bottom: 1rem;
`;

const RegisterLink = styled.p`
    text-align: center;
    margin-top: 1.5rem;
    color: #666;
    font-size: 0.9rem;

    a {
        color: #2196f3;
        text-decoration: none;
        font-weight: 500;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageContainer>
            <LoginContainer>
                <Title>Login</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </FormGroup>
                    <LoginButton type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </LoginButton>
                </Form>
                <RegisterLink>
                    Don't have an account? <Link to="/register">Register here</Link>
                </RegisterLink>
            </LoginContainer>
        </PageContainer>
    );
};

export default LoginPage;