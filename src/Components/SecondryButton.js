import React from 'react'
import styled from 'styled-components';

function SecondaryButton({title,onClick}) {
    return (
        <SecondaryButtonStyled onClick={onClick}>
            {title}
        </SecondaryButtonStyled>
    )
}

const SecondaryButtonStyled = styled.button`
    background: var(--gradient-primary);
    padding: .8rem 2.5rem;
    color: white;
    cursor: pointer;
    display: inline-block;
    font-size: inherit;
    text-transform: uppercase;
    position: relative;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    letter-spacing: 0.03em;
    transition: all .4s cubic-bezier(0.16, 1, 0.3, 1);
    overflow: hidden;
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(var(--primary-color-rgb), 0.4);
    }
    &:active {
        transform: translateY(0);
    }
`;
export default SecondaryButton;
