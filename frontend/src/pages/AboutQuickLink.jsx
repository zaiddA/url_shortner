import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    color: #2196f3;
    margin-bottom: 2rem;
    text-align: center;
    font-size: 2.5rem;
`;

const Section = styled.section`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
    color: #333;
    margin-bottom: 1rem;
    font-size: 1.8rem;
`;

const Text = styled.p`
    color: #666;
    line-height: 1.6;
    margin-bottom: 1rem;
    font-size: 1.1rem;
`;

const FeatureList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const FeatureItem = styled.li`
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    position: relative;
    color: #666;
    font-size: 1.1rem;

    &:before {
        content: "•";
        color: #2196f3;
        position: absolute;
        left: 0;
        font-weight: bold;
    }
`;

const AboutQuickLink = () => {
    return (
        <Container>
            <Title>About QuickLink</Title>
            
            <Section>
                <SectionTitle>What is QuickLink?</SectionTitle>
                <Text>
                    QuickLink is a modern URL shortening service designed to make sharing links easier 
                    and more efficient. Our platform transforms long, unwieldy URLs into short, 
                    memorable links that are perfect for sharing on social media, in emails, or 
                    any other digital communication.
                </Text>
            </Section>

            <Section>
                <SectionTitle>Key Features</SectionTitle>
                <FeatureList>
                    <FeatureItem>Quick and easy URL shortening</FeatureItem>
                    <FeatureItem>Custom link expiration options</FeatureItem>
                    <FeatureItem>Secure and reliable redirection</FeatureItem>
                    <FeatureItem>User dashboard to manage your links</FeatureItem>
                    <FeatureItem>Link analytics and tracking</FeatureItem>
                    <FeatureItem>Mobile-friendly interface</FeatureItem>
                </FeatureList>
            </Section>

            <Section>
                <SectionTitle>Link Expiration</SectionTitle>
                <Text>
                    QuickLink offers flexible link expiration options to help you control how long your shortened links remain active:
                </Text>
                <FeatureList>
                    <FeatureItem>Set specific expiration dates and times</FeatureItem>
                    <FeatureItem>Choose from preset durations (30 seconds to 1 hour)</FeatureItem>
                    <FeatureItem>Create permanent links with no expiration</FeatureItem>
                    <FeatureItem>Automatic deactivation of expired links</FeatureItem>
                    <FeatureItem>Clear expiration status indicators in your dashboard</FeatureItem>
                </FeatureList>
            </Section>

            <Section>
                <SectionTitle>Security & Authentication</SectionTitle>
                <Text>
                    QuickLink implements secure authentication using JWT (JSON Web Tokens) to protect your account and links:
                </Text>
                <FeatureList>
                    <FeatureItem>Secure token-based authentication</FeatureItem>
                    <FeatureItem>Automatic token refresh mechanism</FeatureItem>
                    <FeatureItem>Protected API endpoints</FeatureItem>
                    <FeatureItem>Secure storage of user credentials</FeatureItem>
                    <FeatureItem>Session management for enhanced security</FeatureItem>
                </FeatureList>
            </Section>

            <Section>
                <SectionTitle>How It Works</SectionTitle>
                <Text>
                    Simply paste your long URL into our shortener, customize your settings if 
                    desired, and get your shortened link instantly. You can also set expiration 
                    dates for your links and track their performance through our user-friendly 
                    dashboard.
                </Text>
            </Section>
        </Container>
    );
};

export default AboutQuickLink; 