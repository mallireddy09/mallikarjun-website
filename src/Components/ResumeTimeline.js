import React from "react";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SchoolIcon from "@mui/icons-material/School";
import { InnerLayout } from "../styles/Layouts";
import Title from "./Title";
import SmallTitle from "./SmallTitle";
import ResumeItem from "./ResumeItem";
import TimelineStyled from "./TimelineStyled";
import AnimatedSection from "./AnimatedSection";

const ICONS = {
  work: <BusinessCenterIcon />,
  school: <SchoolIcon />,
};

function ResumeTimeline({ title, span, sectionTitle, icon = "work", items }) {
  return (
    <TimelineStyled>
      <AnimatedSection>
        <Title title={title} span={span} />
      </AnimatedSection>
      <InnerLayout>
        <AnimatedSection delay={0.1}>
          <div className="small-title u-small-title-margin">
            <SmallTitle icon={ICONS[icon]} title={sectionTitle} />
          </div>
        </AnimatedSection>
        <div className="resume-content">
          {items.map((item) => (
            <ResumeItem
              key={`${item.year}-${item.title}-${item.company.name}`}
              year={item.year}
              title={item.title}
              subTitle={item.company.name}
              link={item.company.url}
              logo={item.company.logo}
              text={item.text}
            />
          ))}
        </div>
      </InnerLayout>
    </TimelineStyled>
  );
}

export default ResumeTimeline;
