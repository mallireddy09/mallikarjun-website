import React from 'react';
import Title from '../Components/Title';
import GridGallery from '../Components/GridGallery';
import certificates from '../data/certification';
import {MainLayout, InnerLayout} from '../styles/Layouts';
import AnimatedSection from '../Components/AnimatedSection';

function CertificationPage() {
    return (
        <MainLayout>
            <AnimatedSection>
                <Title title={'Certification'} span={'Certification'} />
            </AnimatedSection>
            <InnerLayout>
                <AnimatedSection delay={0.15}>
                    <GridGallery items={certificates} altPrefix="certification" />
                </AnimatedSection>
            </InnerLayout>
        </MainLayout>
    );
}

export default CertificationPage;
