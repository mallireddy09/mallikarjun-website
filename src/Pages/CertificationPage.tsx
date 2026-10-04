import GalleryPage from "../Components/GalleryPage";
import certificates from "../data/certification";

function CertificationPage() {
  return (
    <GalleryPage
      title="Certifications"
      items={certificates}
      altPrefix="certification"
    />
  );
}

export default CertificationPage;
