import React from "react";
import GalleryPage from "../Components/GalleryPage";
import certificates from "../data/certification";

function CertificationPage() {
  return (
    <GalleryPage
      title="Certification"
      items={certificates}
      altPrefix="certification"
    />
  );
}

export default CertificationPage;
