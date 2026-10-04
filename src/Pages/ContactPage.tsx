import React, { useState } from "react";
import styled from "styled-components";
import { MainLayout, InnerLayout } from "../styles/Layouts";
import Title from "../Components/Title";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContactItem from "../Components/ContactItem";
import SecondaryButton from "../Components/SecondaryButton";
import { PROFILE } from "../data/profile";
import FormField from "../Components/FormField";
import type { FormFieldProps } from "../Components/FormField";

interface ContactForm {
  name: string;
  replyEmail: string;
  subject: string;
  message: string;
}

const CONTACT_FIELDS: (FormFieldProps & { name: keyof ContactForm })[] = [
  { name: "name", id: "name", label: "Enter your name*", type: "text", required: true },
  { name: "replyEmail", id: "email", label: "Enter your email*", type: "email", required: true },
  { name: "subject", id: "subject", label: "Enter your subject", type: "text" },
  { name: "message", id: "textarea", label: "Enter your Message*", multiline: true, required: true, cols: 30, rows: 10 },
];

function ContactPage() {
  const [form, setForm] = useState<ContactForm>({ name: "", replyEmail: "", subject: "", message: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const sendEmail: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const { name, replyEmail, subject, message } = form;
    const emailSubject = subject || "Regarding your inquiry";
    const body = `Hello,\n\nI am ${name}.\n${message}\n\nFrom: ${name} (${replyEmail})`;
    const mailtoUrl = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  return (
    <MainLayout>
      <Title title="Contact" span="Contact" />
      <ContactPageStyled>
        <InnerLayout className="contact-section">
          <div className="left-content">
            <div className="contact-title">
              <h4>Get In Touch</h4>
            </div>
            <form className="form" onSubmit={sendEmail}>
              {CONTACT_FIELDS.map((field) => (
                <FormField
                  key={field.name}
                  {...field}
                  value={form[field.name]}
                  onChange={handleChange}
                />
              ))}
              <div className="form-field f-button">
                <SecondaryButton title="Send Email" type="submit" />
              </div>
            </form>
          </div>
          <div className="right-content">
            <ContactItem title="Email" icon={<EmailIcon />} cont1={PROFILE.email} />
            <ContactItem
              title="Address"
              icon={<LocationOnIcon />}
              cont1={PROFILE.location}
            />
          </div>
        </InnerLayout>
      </ContactPageStyled>
    </MainLayout>
  );
}

const ContactPageStyled = styled.section`
  .contact-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 2rem;

    @media screen and (max-width: 900px) {
      grid-template-columns: 1fr;
      grid-row-gap: 1.5rem;

      .f-button {
        margin-bottom: 1.5rem;
      }
    }

    .right-content {
      display: grid;
      grid-template-columns: 1fr;
    }

    .contact-title h4 {
      color: var(--white-color);
      padding: 1rem 0;
      font-size: clamp(1.4rem, 3vw, 1.8rem);
      font-weight: 700;
    }

    .form {
      width: 100%;

      .form-field {
        margin-top: 1.75rem;
        position: relative;
        width: 100%;

        label {
          position: absolute;
          left: 16px;
          top: -10px;
          display: inline-block;
          background-color: var(--background-dark-color);
          padding: 0 0.5rem;
          color: var(--font-light-color);
          font-size: 0.85rem;
          font-weight: 500;
          transition: color 0.3s ease;
          max-width: calc(100% - 2rem);
        }

        input,
        textarea {
          border: 1px solid var(--border-color);
          outline: none;
          background: transparent;
          width: 100%;
          color: inherit;
          border-radius: 12px;
          font-size: 16px;
          transition: all 0.3s ease;
          -webkit-appearance: none;
          appearance: none;

          &:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1);
          }
        }

        input {
          height: 50px;
          padding: 0 15px;
        }

        textarea {
          padding: 0.8rem 1rem;
          resize: vertical;
          min-height: 140px;
        }
      }
    }
  }
`;

export default ContactPage;
