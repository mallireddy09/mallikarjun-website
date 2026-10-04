import type { ThemeProps } from "../types/portfolio";
import React from "react";
import Skills from "../Components/Skills";
import { MainLayout } from "../styles/Layouts";

function SkillsPage({ theme }: ThemeProps) {
  return (
    <MainLayout>
      <Skills theme={theme} />
    </MainLayout>
  );
}

export default SkillsPage;
