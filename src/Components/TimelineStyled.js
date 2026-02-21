import styled from "styled-components";

const TimelineStyled = styled.section`
  .small-title {
    padding-bottom: 3rem;
  }
  .u-small-title-margin {
    margin-top: 4rem;
  }
  .u-small-title-no-pad {
    padding-left: 0;
  }
  .resume-content {
    border-left: 2px solid var(--border-color);
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: -2px;
      top: 0;
      width: 2px;
      height: 100%;
      background: linear-gradient(
        to bottom,
        var(--primary-color),
        var(--border-color) 70%
      );
    }
  }
`;

export default TimelineStyled;
