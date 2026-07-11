import React from "react";
import styled from "styled-components";
import ImageSection from "../Components/ImageSection";
import Title from "../Components/Title";
import { MainLayout } from "../styles/Layouts";
import AnimatedSection from "../Components/AnimatedSection";

function AboutPage() {
  return (
    <AboutStyled>
      <MainLayout>
        <AnimatedSection>
          <Title title="About Me" span="About Me" />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <ImageSection />
        </AnimatedSection>
      </MainLayout>
    </AboutStyled>
  );
}

const AboutStyled = styled.section`
  min-height: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  > div {
    flex: 1;
  }
`;

export default AboutPage;
