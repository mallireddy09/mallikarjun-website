import React from "react";
import Title from "./Title";
import GridGallery from "./GridGallery";
import { MainLayout, InnerLayout } from "../styles/Layouts";

function GalleryPage({ title, items, altPrefix }) {
  return (
    <MainLayout>
      <Title title={title} span={title} animated />
      <InnerLayout>
        <GridGallery items={items} altPrefix={altPrefix} />
      </InnerLayout>
    </MainLayout>
  );
}

export default GalleryPage;
