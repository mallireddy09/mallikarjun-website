import React from "react";
import GalleryPage from "../Components/GalleryPage";
import blogs from "../data/blogs";

function BlogsPage() {
  return <GalleryPage title="Blogs" items={blogs} altPrefix="blog" />;
}

export default BlogsPage;
