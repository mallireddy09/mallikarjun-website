import ResumeTimeline from "./ResumeTimeline";
import experience from "../data/experience";

function Experience() {
  return (
    <ResumeTimeline
      title="Experience"
      span="experience"
      sectionTitle="Professional Work Experience"
      icon="work"
      items={experience}
    />
  );
}

export default Experience;
