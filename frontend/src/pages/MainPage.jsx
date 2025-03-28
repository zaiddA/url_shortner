import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import config from '../config';
import WelcomePage from './WelcomePage';

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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Input = styled.input`
    flex: 1;
    padding: 0.75rem 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 6px;
    font-size: 1rem;
`;

const Button = styled.button`
    padding: 0.75rem 1.5rem;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;

    &:hover {
        background-color: #1976d2;
    }

    &:disabled {
        background-color: #90caf9;
        cursor: not-allowed;
    }
`;

const ResultContainer = styled.div`
    margin-top: 2rem;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 6px;

    h3 {
        color: #333;
        margin-bottom: 0.5rem;
    }

    a {
        color: #2196f3;
        text-decoration: none;
        word-break: break-all;

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
    margin-bottom: 1rem;
`;

const Title = styled.h1`
    color: #333;
    margin-bottom: 1.5rem;
    font-size: 2rem;
`;

const ExpirationInput = styled(Input)`
    min-width: 200px;
    color: #666;
`;

const ExpirationLabel = styled.label`
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
`;

const DurationSelect = styled.select`
    padding: 0.75rem 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 6px;
    font-size: 1rem;
    color: #666;
    background-color: white;
    transition: all 0.2s;

    &:focus {
        outline: none;
        border-color: #2196f3;
        box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
    }
`;

const MainPage = () => {
    const [sourceLink, setSourceLink] = useState('');
    const [myLink, setMyLink] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [expirationType, setExpirationType] = useState('none'); // 'none', 'datetime', or 'duration'
    const [expirationDate, setExpirationDate] = useState('');
    const [expirationDuration, setExpirationDuration] = useState('5m'); // default to 5 minutes
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let expirationData = null;
            
            if (expirationType === 'datetime') {
                expirationData = expirationDate;
            } else if (expirationType === 'duration') {
                // Convert duration to future datetime
                const now = new Date();
                const [value, unit] = expirationDuration.match(/(\d+)([ms])/).slice(1);
                if (unit === 'm') {
                    now.setMinutes(now.getMinutes() + parseInt(value));
                } else {
                    now.setSeconds(now.getSeconds() + parseInt(value));
                }
                expirationData = now.toISOString();
            }

            const response = await axios.post(
                `${config.API_URL}/api/link/shortener/`,
                { 
                    source_link: sourceLink,
                    expiration_date: expirationData
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                }
            );
            setMyLink(response.data);
            setSourceLink('');
            setExpirationDate('');
            setExpirationType('none');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create short link');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <WelcomePage />;
    }

    return (
        <MainContainer>
            <Card>
                <Title>URL Shortener</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Input
                            type="url"
                            value={sourceLink}
                            onChange={(e) => setSourceLink(e.target.value)}
                            placeholder="Enter your URL here"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <ExpirationLabel>Expiration Options</ExpirationLabel>
                        <DurationSelect
                            value={expirationType}
                            onChange={(e) => setExpirationType(e.target.value)}
                        >
                            <option value="none">No expiration</option>
                            <option value="duration">Expire after duration</option>
                            <option value="datetime">Expire at specific time</option>
                        </DurationSelect>
                    </FormGroup>
                    
                    {expirationType === 'duration' && (
                        <FormGroup>
                            <ExpirationLabel>Expire after</ExpirationLabel>
                            <DurationSelect
                                value={expirationDuration}
                                onChange={(e) => setExpirationDuration(e.target.value)}
                            >
                                <option value="30s">30 seconds</option>
                                <option value="1m">1 minute</option>
                                <option value="5m">5 minutes</option>
                                <option value="10m">10 minutes</option>
                                <option value="30m">30 minutes</option>
                                <option value="60m">1 hour</option>
                            </DurationSelect>
                        </FormGroup>
                    )}
                    
                    {expirationType === 'datetime' && (
                        <FormGroup>
                            <ExpirationLabel>Expire at</ExpirationLabel>
                            <ExpirationInput
                                type="datetime-local"
                                value={expirationDate}
                                onChange={(e) => setExpirationDate(e.target.value)}
                                min={new Date().toISOString().slice(0, 16)}
                            />
                        </FormGroup>
                    )}
                    
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Shorten URL'}
                    </Button>
                </Form>
                {myLink && (
                    <ResultContainer>
                        <h3>Your Shortened URL:</h3>
                        <a 
                            href={`/l/${myLink.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {`${window.location.origin}/l/${myLink.hash}`}
                        </a>
                        {myLink.expires_at && (
                            <p style={{ color: '#666', marginTop: '0.5rem' }}>
                                Expires on: {new Date(myLink.expires_at).toLocaleString()}
                            </p>
                        )}
                    </ResultContainer>
                )}
            </Card>
        </MainContainer>
    );
};

export default MainPage;