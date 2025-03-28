import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';

const MainContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem 2rem;
    padding-top: 5rem;
`;

const Card = styled.div`
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    color: #333;
    margin-bottom: 1.5rem;
    font-size: 2rem;
`;

const LinkCard = styled.div`
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    opacity: ${props => props.$isExpired ? 0.7 : 1};
    background-color: ${props => props.$isExpired ? '#f8f9fa' : 'white'};
`;

const ExpirationBadge = styled.span`
    background-color: ${props => props.$isExpired ? '#dc3545' : '#28a745'};
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
`;

const ExpirationText = styled.div`
    color: #666;
    font-size: 0.9rem;
    margin-top: 0.5rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 0.75rem;
    margin-top: 1rem;
`;

const Button = styled.button`
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.disabled ? 0.7 : 1};
    transition: opacity 0.2s;
`;

const CopyButton = styled(Button)`
    background-color: #2196f3;
    color: white;

    &:hover:not(:disabled) {
        opacity: 0.9;
    }
`;

const DeleteButton = styled(Button)`
    background-color: #dc3545;
    color: white;

    &:hover:not(:disabled) {
        opacity: 0.9;
    }
`;

const VisitButton = styled(Button)`
    background-color: #28a745;
    color: white;

    &:hover:not(:disabled) {
        opacity: 0.9;
    }
`;

const LoadingMessage = styled.div`
    text-align: center;
    color: #666;
    padding: 2rem;
`;

const ErrorMessage = styled.div`
    background-color: #ffebee;
    color: #c62828;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    margin-bottom: 1rem;
`;

const MyLinksPage = () => {
    const [links, setLinks] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        try {
            const response = await api.get('/api/link/get-links/');
            setLinks(response.data);
        } catch (error) {
            setError('Failed to fetch links');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (hash) => {
        try {
            await api.delete(`/api/link/delete-link/${hash}/`);
            setLinks(links.filter(link => link.hash !== hash));
        } catch (error) {
            setError('Failed to delete link');
        }
    };

    const handleCopy = (url) => {
        navigator.clipboard.writeText(url);
    };

    const handleVisit = async (hash) => {
        try {
            const response = await api.get(`/api/link/get-link/${hash}/`);
            if (response.data.source_url) {
                window.open(response.data.source_url, '_blank');
            }
        } catch (error) {
            if (error.response?.status === 410) {
                setError('This link has expired');
            } else {
                setError('Failed to access link');
            }
        }
    };

    const getTimeRemaining = (expiresAt) => {
        if (!expiresAt) return null;
        
        const now = new Date();
        const expiration = new Date(expiresAt);
        const diff = expiration - now;
        
        if (diff <= 0) return 'Expired';
        
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        
        if (minutes > 60) {
            const hours = Math.floor(minutes / 60);
            return `${hours}h ${minutes % 60}m remaining`;
        }
        if (minutes > 0) {
            return `${minutes}m ${seconds}s remaining`;
        }
        return `${seconds}s remaining`;
    };

    if (loading) {
        return (
            <MainContainer>
                <LoadingMessage>Loading your links...</LoadingMessage>
            </MainContainer>
        );
    }

    return (
        <MainContainer>
            <Card>
                <Title>My Links</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {links.map((link) => (
                    <LinkCard key={link.hash} $isExpired={link.is_expired}>
                        <div>
                            <strong>Original URL:</strong> {link.source_link}
                        </div>
                        <div style={{ marginTop: '0.5rem' }}>
                            <strong>Shortened URL:</strong>{' '}
                            {`${window.location.origin}/l/${link.hash}`}
                            <ExpirationBadge $isExpired={link.is_expired}>
                                {link.is_expired ? 'Expired' : 'Active'}
                            </ExpirationBadge>
                        </div>
                        {link.expires_at && (
                            <ExpirationText>
                                {getTimeRemaining(link.expires_at)}
                            </ExpirationText>
                        )}
                        <ButtonContainer>
                            <VisitButton
                                onClick={() => handleVisit(link.hash)}
                                disabled={link.is_expired}
                            >
                                Visit Link
                            </VisitButton>
                            <CopyButton
                                onClick={() => handleCopy(`${window.location.origin}/l/${link.hash}`)}
                                disabled={link.is_expired}
                            >
                                Copy Link
                            </CopyButton>
                            <DeleteButton onClick={() => handleDelete(link.hash)}>
                                Delete
                            </DeleteButton>
                        </ButtonContainer>
                    </LinkCard>
                ))}
            </Card>
        </MainContainer>
    );
};

export default MyLinksPage;