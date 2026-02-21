import React from 'react';
import styled from 'styled-components';


function ContactItem({title, icon, cont1, cont2, cont3}) {
    return (
        <ContactItemStyled>
            <div className="left-content">
                {
                    icon
                }
            </div>
            <div className="right-content">
                <h6>{title}</h6>
                <p>{cont1}</p>
                <p>{cont2}</p>
                {cont3 ? <p>{cont3}</p> :''}
            </div>
        </ContactItemStyled>
    )
}

const ContactItemStyled = styled.div`
    padding: 1.5rem 2rem;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    display: flex;
    align-items: center;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    &:not(:last-child){
        margin-bottom: 2rem;
    }
    &:hover {
        border-color: var(--primary-color);
        transform: translateY(-3px);
        box-shadow: 0 8px 24px rgba(var(--primary-color-rgb), 0.1);
    }
    .left-content{
        padding: 1.2rem;
        border: 1px solid var(--border-color);
        border-radius: 12px;
        font-size: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1.5rem;
        color: var(--primary-color);
        background: rgba(var(--primary-color-rgb), 0.08);
        svg{
            font-size: 2rem;
        }
    }

    .right-content{
        h6{
            color: var(--white-color);
            font-size: 1.2rem;
            padding-bottom: .4rem;
        }
        p{
            padding: .1rem 0;
            color: var(--font-light-color);
        }
    }
`;

export default ContactItem;
