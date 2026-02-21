import React, { useState } from 'react';
import {MainLayout, InnerLayout} from '../styles/Layouts';
import Title from '../Components/Title';
import projects from '../data/projects';
import Menu from '../Components/Menu';
import Button from '../Components/Button';
import AnimatedSection from '../Components/AnimatedSection';

const allButtons = ['All', ...new Set(projects.map(item => item.category))]

function ProjectsPage() {
    const [menuItem, setMenuItems] = useState(projects);
    const [button] = useState(allButtons);

    const filter = (button) => {
        if(button === 'All'){
            setMenuItems(projects);
            return;
        }

        const filteredData = projects.filter(item => item.category === button);
        setMenuItems(filteredData);
    }
    return (
        <MainLayout>
            <AnimatedSection>
                <Title title={'Projects'} span={'projects'} />
            </AnimatedSection>
            <InnerLayout>
                <AnimatedSection delay={0.1}>
                    <Button filter={filter} button={button} />
                </AnimatedSection>
                <AnimatedSection delay={0.15}>
                    <Menu menuItem={menuItem} />
                </AnimatedSection>
            </InnerLayout>
        </MainLayout>
    )
}

export default ProjectsPage
