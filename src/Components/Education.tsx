import ResumeTimeline from "./ResumeTimeline";
import education from "../data/education";

function Education() {
  return (
    <ResumeTimeline
      title="Education"
      span="education"
      sectionTitle="Educational Qualifications"
      icon="school"
      items={education}
    />
  );
}

export default Education;
