import React from "react";
import { InnerLayout } from "../styles/Layouts";
import Title from "./Title";
import SmallTitle from "./SmallTitle";
import SchoolIcon from "@mui/icons-material/School";
import ResumeItem from "./ResumeItem";
import TimelineStyled from "./TimelineStyled";
import AnimatedSection from "./AnimatedSection";

function Education() {
  const school = <SchoolIcon />;
  return (
    <TimelineStyled>
      <AnimatedSection>
        <Title title={"Education"} span={"education"} />
      </AnimatedSection>
      <InnerLayout>
        <AnimatedSection delay={0.1}>
          <div className="small-title u-small-title-margin">
            <SmallTitle icon={school} title={"Educational Qualifications"} />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <div className="resume-content">
            <ResumeItem
              year={"Aug 2023 - Dec 2024"}
              title={"M.S in Data Science"}
              subTitle={"University at Buffalo (SUNY)"}
              link={"https://www.buffalo.edu/"}
              text={"Grade: 3.86/4.0"}
              css={0}
            />
            <ResumeItem
              year={"June 2016 - May 2020"}
              title={"B.Tech in Computer Science Engineering"}
              subTitle={"GITAM University India"}
              link={"https://www.gitam.edu/"}
              text={"Grade: 3.6/4.0"}
              css={0}
            />
          </div>
        </AnimatedSection>
      </InnerLayout>
    </TimelineStyled>
  );
}

export default Education;
