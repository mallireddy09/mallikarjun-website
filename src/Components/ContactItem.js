import React from "react";
import styled from "styled-components";

function ContactItem({ title, icon, cont1, cont2, cont3 }) {
  return (
    <ContactItemStyled>
      <div className="left-content">{icon}</div>
      <div className="right-content">
        <h6>{title}</h6>
        <p>{cont1}</p>
        {cont2 ? <p>{cont2}</p> : null}
        {cont3 ? <p>{cont3}</p> : null}
      </div>
    </ContactItemStyled>
  );
}

const ContactItemStyled = styled.div`
  padding: 1.5rem 2rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  display: flex;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  min-width: 0;

  &:not(:last-child) {
    margin-bottom: 1.25rem;
  }

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(var(--primary-color-rgb), 0.1);
  }

  @media screen and (max-width: 480px) {
    padding: 1rem 1.1rem;
    align-items: flex-start;
  }

  .left-content {
    padding: 1.2rem;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.5rem;
    color: var(--primary-color);
    background: rgba(var(--primary-color-rgb), 0.08);
    flex-shrink: 0;

    svg {
      font-size: 2rem;
    }

    @media screen and (max-width: 480px) {
      padding: 0.85rem;
      margin-right: 0.9rem;
      svg {
        font-size: 1.5rem;
      }
    }
  }

  .right-content {
    min-width: 0;
    h6 {
      color: var(--white-color);
      font-size: clamp(1rem, 2.5vw, 1.2rem);
      padding-bottom: 0.4rem;
    }
    p {
      padding: 0.1rem 0;
      color: var(--font-light-color);
      word-break: break-word;
      font-size: 0.95rem;
    }
  }
`;

export default ContactItem;
