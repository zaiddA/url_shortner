import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const HeaderContainer = styled.header`
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem 2rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
`;

const Nav = styled.nav`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled(Link)`
    color: #2196f3;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        color: #1976d2;
    }
`;

const LogoIcon = styled.span`
    font-size: 1.8rem;
`;

const NavLinks = styled.div`
    display: flex;
    gap: 1.5rem;
    align-items: center;
`;

const NavLink = styled(Link)`
    color: #666;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
        color: #2196f3;
    }
`;

const WelcomeText = styled.span`
    color: #666;
    margin-right: 1rem;
`;

const Header = () => {
    const { user } = useAuth();

    return (
        <HeaderContainer>
            <Nav>
                <Logo to="/">
                    <LogoIcon>⚡</LogoIcon>
                    QuickLink
                </Logo>
                <NavLinks>
                    <NavLink to="/about-quicklink">About QuickLink</NavLink>
                    <NavLink to="/about-me">About Me</NavLink>
                    {user ? (
                        <>
                            <WelcomeText>Welcome, {user.username}!</WelcomeText>
                            <NavLink to="/my-links">My Links</NavLink>
                            <NavLink to="/logout">Logout</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/register">Register</NavLink>
                        </>
                    )}
                </NavLinks>
            </Nav>
        </HeaderContainer>
    );
};

export default Header;