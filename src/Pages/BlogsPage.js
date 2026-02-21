import React from 'react';
import Title from '../Components/Title';
import GridGallery from '../Components/GridGallery';
import blogs from '../data/blogs';
import {MainLayout, InnerLayout} from '../styles/Layouts';
import AnimatedSection from '../Components/AnimatedSection';

function BlogsPage() {
    return (
        <MainLayout>
            <AnimatedSection>
                <Title title={'Blogs'} span={'Blogs'} />
            </AnimatedSection>
            <InnerLayout>
                <AnimatedSection delay={0.15}>
                    <GridGallery items={blogs} altPrefix="blog" />
                </AnimatedSection>
            </InnerLayout>
        </MainLayout>
    );
}

export default BlogsPage;
