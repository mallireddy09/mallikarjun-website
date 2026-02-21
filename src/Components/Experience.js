import React from "react";
import { InnerLayout } from "../styles/Layouts";
import Title from "./Title";
import SmallTitle from "./SmallTitle";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SchoolIcon from "@mui/icons-material/School";
import ResumeItem from "./ResumeItem";
import TimelineStyled from "./TimelineStyled";
import AnimatedSection from "./AnimatedSection";

function Experience() {
  const briefcase = <BusinessCenterIcon />;
  const school = <SchoolIcon />;
  return (
    <TimelineStyled>
      <AnimatedSection>
        <Title title={"Experience"} span={"experience"} />
      </AnimatedSection>
      <InnerLayout>
        <AnimatedSection delay={0.1}>
          <div className="small-title">
            <SmallTitle icon={school} title={"Academic Work Experience"} />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <div className="resume-content">
            <ResumeItem
              year={"Aug 2023 - Dec 2024"}
              title={"Graduate Research Assistant at University at Buffalo"}
              subTitle={"University at Buffalo (SUNY)"}
              link={"https://www.buffalo.edu/"}
            />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <div className="small-title u-small-title-margin">
            <SmallTitle icon={briefcase} title={"Professional Work Experience"} />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <div className="resume-content">
            <ResumeItem
              year={"Feb 2025 - Present"}
              title={"Senior Data Engineer"}
              subTitle={"Y Stem and Chess, Client: Albertsons"}
              link={"https://www.ystemandchess.com/"}
            />
            <ResumeItem
              year={"Aug 2024 - Dec 2024"}
              title={"AI/ML Engineer"}
              subTitle={"University at Buffalo"}
              link={"https://www.buffalo.edu/"}
            />
            <ResumeItem
              year={"Jan 2022 - June 2023"}
              title={"Data Engineer"}
              subTitle={"Nineleaps, Client: Uber"}
              link={"https://www.nineleaps.com/"}
            />
            <ResumeItem
              year={"Jan 2019 - Dec 2021"}
              title={"Data Engineer"}
              subTitle={"Sparklex Solutions, Client: Meijer"}
              link={"https://www.meijer.com/"}
            />
          </div>
        </AnimatedSection>
      </InnerLayout>
    </TimelineStyled>
  );
}

export default Experience;
