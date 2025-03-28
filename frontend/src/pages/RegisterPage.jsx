import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const PageContainer = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background-color: #f5f5f5;
`;

const RegisterContainer = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    margin-top: 4rem;
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

const RegisterButton = styled.button`
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
    width: 100%;

    &:hover {
        background-color: #1976d2;
    }

    &:disabled {
        background-color: #90caf9;
        cursor: not-allowed;
    }
`;

const LoginText = styled.div`
    text-align: center;
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #666;

    a {
        color: #2196f3;
        text-decoration: none;
        font-weight: 500;
        margin-left: 0.5rem;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const ErrorMessage = styled.div`
    background-color: #ffebee;
    color: #c62828;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    white-space: pre-line;
`;

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== password2) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            // Register the user
            await api.post('/api/user/register/', {
                username,
                email,
                password,
                password2
            });

            // After successful registration, log the user in
            await login(username, password);
            
            // Redirect to home page
            navigate('/');
        } catch (err) {
            if (err.response?.data) {
                const errorData = err.response.data;
                let errorMessage = '';
                if (typeof errorData === 'object') {
                    Object.entries(errorData).forEach(([key, value]) => {
                        errorMessage += `${key}: ${value.join(', ')}\n`;
                    });
                } else {
                    errorMessage = errorData;
                }
                setError(errorMessage);
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageContainer>
            <RegisterContainer>
                <Title>Register</Title>
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
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
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
                            autoComplete="new-password"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password2">Confirm Password</Label>
                        <Input
                            id="password2"
                            type="password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </FormGroup>
                    <RegisterButton type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </RegisterButton>
                </Form>
                <LoginText>
                    Already have an account?<Link to="/login">Login</Link>
                </LoginText>
            </RegisterContainer>
        </PageContainer>
    );
};

export default RegisterPage;