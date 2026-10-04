import styled from "styled-components";

export const MainLayout = styled.div`
  padding: 2.5rem 3rem 3rem;
  width: 100%;
  max-width: 100%;
  min-height: 100%;
  box-sizing: border-box;

  @media screen and (max-width: 900px) {
    padding: 2rem 1.75rem 2.5rem;
  }

  @media screen and (max-width: 768px) {
    padding: 2rem 1.25rem 2rem;
  }

  @media screen and (max-width: 480px) {
    padding: 1.5rem 1rem 1.75rem;
  }
`;

export const InnerLayout = styled.div`
  padding: 1.5rem 0 0.5rem;
  width: 100%;
  max-width: 100%;

  @media screen and (max-width: 768px) {
    padding: 1.25rem 0 0.5rem;
  }

  @media screen and (max-width: 480px) {
    padding: 1rem 0 0.25rem;
  }
`;
