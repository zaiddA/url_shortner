import styled from 'styled-components';
import React from 'react';

const FooterContainer = styled.footer`
    background-color: #333;
    color: white;
    text-align: center;
    padding: 0.5rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    right: 0;
    font-size: 0.8rem;
    line-height: 1;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Footer = () => {
    return (
        <FooterContainer>
            &copy; {new Date().getFullYear()} Made by Zaid For Homelane
        </FooterContainer>
    );
};

export default Footer;
