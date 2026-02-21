import React, { useState } from 'react';
import styled from 'styled-components';

function Button({filter, button}) {
    const [active, setActive] = useState(0);
    return (
        <ButtonsStyled>
            {
                button.map((but, i) =>{
                    return <ButtonStyled
                        key={i}
                        className={active === i ? 'active' : ''}
                        onClick={() => {
                            setActive(i);
                            filter(but);
                        }}
                    >
                        {but}
                    </ButtonStyled>
                })
            }
        </ButtonsStyled>
    )
}

const ButtonStyled = styled.button`
    outline: none;
    border: 1px solid var(--border-color);
    background: transparent;
    padding: .5rem 1.2rem;
    font-size: 0.9rem;
    color: var(--font-light-color);
    cursor: pointer;
    transition: all .3s cubic-bezier(0.16, 1, 0.3, 1);
    margin-bottom: .6rem;
    border-radius: 50px;
    font-weight: 500;
    &.active {
        background: var(--gradient-primary);
        border-color: transparent;
        color: #fff;
        box-shadow: 0 4px 12px rgba(var(--primary-color-rgb), 0.3);
    }
    &:hover:not(.active) {
        border-color: var(--primary-color);
        color: var(--primary-color);
    }
    &:not(:last-child){
        margin-right: .6rem;
    }
`;
const ButtonsStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 90%;
    margin: 2.4rem auto;
`;
export default Button;
