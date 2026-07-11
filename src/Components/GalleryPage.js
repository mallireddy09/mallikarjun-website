import React from "react";
import Title from "./Title";
import GridGallery from "./GridGallery";
import { MainLayout, InnerLayout } from "../styles/Layouts";
import AnimatedSection from "./AnimatedSection";

function GalleryPage({ title, items, altPrefix }) {
  return (
    <MainLayout>
      <AnimatedSection>
        <Title title={title} span={title} />
      </AnimatedSection>
      <InnerLayout>
        <GridGallery items={items} altPrefix={altPrefix} />
      </InnerLayout>
    </MainLayout>
  );
}

export default GalleryPage;
