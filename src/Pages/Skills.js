import React from "react";
import Skills from "../Components/Skills";
import { MainLayout } from "../styles/Layouts";

function SkillsPage({ theme }) {
  return (
    <MainLayout>
      <Skills theme={theme} />
    </MainLayout>
  );
}

export default SkillsPage;
