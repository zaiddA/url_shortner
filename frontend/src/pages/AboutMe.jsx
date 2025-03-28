import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background-color: #f5f5f5;
    padding-top: 5rem;
`;

const ContentContainer = styled.div`
    background: white;
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 800px;
`;

const Title = styled.h1`
    color: #333;
    margin-bottom: 2rem;
    font-size: 2.5rem;
`;

const Section = styled.div`
    margin-bottom: 2rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const SectionTitle = styled.h2`
    color: #333;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f0f0;
`;

const SectionContent = styled.p`
    color: #555;
    line-height: 1.6;
    font-size: 1rem;
    margin-bottom: 1rem;
`;

const SkillList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 1rem 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
`;

const SkillItem = styled.li`
    color: #555;
    padding: 0.75rem;
    background: #f8f9fa;
    border-radius: 6px;
    display: flex;
    align-items: center;
    
    &:before {
        content: "•";
        color: #2196f3;
        font-weight: bold;
        margin-right: 0.5rem;
    }
`;

const ProjectList = styled.div`
    display: grid;
    gap: 1.5rem;
    margin-top: 1rem;
`;

const ProjectCard = styled.div`
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid #2196f3;
`;

const ProjectTitle = styled.h3`
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
`;

const ProjectDescription = styled.p`
    color: #555;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
`;

const LinkIcon = styled.span`
    margin-right: 0.5rem;
    color: #2196f3;
`;

const ProfileLink = styled.a`
    color: #2196f3;
    text-decoration: none;
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    
    &:hover {
        text-decoration: underline;
    }
`;

const ProfileLinks = styled.div`
    margin-top: 1rem;
`;

const AboutMe = () => {
    return (
        <PageContainer>
            <ContentContainer>
                <Title>About Me</Title>
                
                <Section>
                    <SectionTitle>Introduction</SectionTitle>
                    <SectionContent>
                        Hello! I'm Mohammad Zaid Ansari, a passionate Full Stack Developer with expertise in building 
                        modern web applications. I specialize in creating efficient, scalable, and user-friendly 
                        solutions using cutting-edge technologies.
                    </SectionContent>
                    <ProfileLinks>
                        <ProfileLink href="https://leetcode.com/u/mza_26/" target="_blank" rel="noopener noreferrer">
                            <LinkIcon>💻</LinkIcon>LeetCode Profile
                        </ProfileLink>
                        <ProfileLink href="https://github.com/zaiddA" target="_blank" rel="noopener noreferrer">
                            <LinkIcon>📚</LinkIcon>GitHub Profile
                        </ProfileLink>
                    </ProfileLinks>
                </Section>

                <Section>
                    <SectionTitle>Education</SectionTitle>
                    <SectionContent>
                        <strong>Indian Institute of Information Technology, Pune (IIIT Pune)</strong>
                        <br />
                        Bachelor of Technology (B.Tech)
                        <br />
                        Computer Science and Engineering
                    </SectionContent>
                </Section>

                <Section>
                    <SectionTitle>Technical Skills</SectionTitle>
                    <SkillList>
                        <SkillItem>React.js</SkillItem>
                        <SkillItem>Django</SkillItem>
                        <SkillItem>Python</SkillItem>
                        <SkillItem>JavaScript</SkillItem>
                        <SkillItem>MySQL</SkillItem>
                        <SkillItem>HTML5/CSS3</SkillItem>
                        <SkillItem>Git</SkillItem>
                        <SkillItem>RESTful APIs</SkillItem>
                        <SkillItem>Node.js</SkillItem>
                        <SkillItem>MongoDB</SkillItem>
                    </SkillList>
                </Section>

                <Section>
                    <SectionTitle>Featured Projects</SectionTitle>
                    <ProjectList>
                        <ProjectCard>
                            <ProjectTitle>QuickLink - URL Shortener</ProjectTitle>
                            <ProjectDescription>
                                A full-stack URL shortening service built with React and Django. Features include user 
                                authentication, analytics tracking, and a responsive dashboard interface.
                            </ProjectDescription>
                        </ProjectCard>
                        
                        <ProjectCard>
                            <ProjectTitle>Inventory Management Dashboard</ProjectTitle>
                            <ProjectDescription>
                                A high-performance inventory management system built with Next.js, Node.js, and AWS. 
                                Features real-time tracking, automated reconciliation, and handling of 1000+ records 
                                with Redux Toolkit & Prisma ORM. Achieved 40% efficiency boost and 99.9% uptime with 
                                optimized AWS infrastructure.
                            </ProjectDescription>
                        </ProjectCard>
                    </ProjectList>
                </Section>

                <Section>
                    <SectionTitle>Professional Experience</SectionTitle>
                    <SectionContent>
                        I have experience working on various web development projects, focusing on creating 
                        scalable solutions and implementing best practices in software development. My work 
                        involves both frontend and backend development, ensuring seamless integration and 
                        optimal performance.
                    </SectionContent>
                </Section>
            </ContentContainer>
        </PageContainer>
    );
};

export default AboutMe; 