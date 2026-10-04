import React, { useState } from 'react';
import {MainLayout, InnerLayout} from '../styles/Layouts';
import Title from '../Components/Title';
import projects from '../data/projects';
import Menu from '../Components/Menu';
import Button from '../Components/Button';
import AnimatedSection from '../Components/AnimatedSection';

const allButtons = ['All', ...new Set(projects.map(item => item.category))]

function ProjectsPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const menuItem = selectedCategory === 'All'
        ? projects
        : projects.filter(item => item.category === selectedCategory);
    return (
        <MainLayout>
            <Title title={'Projects'} span={'projects'} animated />
            <InnerLayout>
                <AnimatedSection delay={0.1}>
                    <Button
                        categories={allButtons}
                        selectedCategory={selectedCategory}
                        onSelect={setSelectedCategory}
                    />
                </AnimatedSection>
                <AnimatedSection delay={0.15}>
                    <Menu menuItem={menuItem} />
                </AnimatedSection>
            </InnerLayout>
        </MainLayout>
    )
}

export default ProjectsPage
