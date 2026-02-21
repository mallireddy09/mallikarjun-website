import React from 'react'
import styled from 'styled-components';
import ImageSection from '../Components/ImageSection';
import Title from '../Components/Title';
import {MainLayout} from '../styles/Layouts';
import AnimatedSection from '../Components/AnimatedSection';

function AboutPage({theme}) {
    return (
        <AboutStyled>
            <MainLayout>
                <AnimatedSection>
                    <Title title={'About Me'} span={'About Me'} />
                </AnimatedSection>
                <AnimatedSection delay={0.15}>
                    <ImageSection theme={theme}/>
                </AnimatedSection>
            </MainLayout>
        </AboutStyled>
    )
}

const AboutStyled = styled.section`
    min-height: 100vh;
`;

export default AboutPage
