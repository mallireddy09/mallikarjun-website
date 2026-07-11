import styled from "styled-components";

const TimelineStyled = styled.section`
  .small-title {
    padding-bottom: 1.25rem;
  }

  .u-small-title-margin {
    margin-top: 0.75rem;
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
