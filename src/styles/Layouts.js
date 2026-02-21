import styled from "styled-components";

export const MainLayout = styled.div`
    padding: 3rem;
    @media screen and (max-width: 768px){
        padding: 2rem 1.5rem;
    }
    @media screen and (max-width: 502px){
        padding: 1.5rem 1rem;
    }
`;

export const InnerLayout = styled.div`
    padding: 5rem 0;
    @media screen and (max-width: 768px){
        padding: 3rem 0;
    }
    @media screen and (max-width: 502px){
        padding: 2rem 0;
    }
`;

// Alias kept for backward compatibility
export const InnerLayoutSingle = InnerLayout;