import React, { useState } from "react";
import styled from "styled-components";
import { MainLayout, InnerLayout } from "../styles/Layouts";
import Title from "../Components/Title";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContactItem from "../Components/ContactItem";
import SecondaryButton from "../Components/SecondryButton";

function ContactPage() {
  const phone = <PhoneIcon />;
  const email = <EmailIcon />;
  const location = <LocationOnIcon />;

  const [name, setName] = useState("");
  const [recemail, setRecEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = () => {
    const emailSubject = subject || "Regarding your inquiry";
    const body = `Hello,\n\nI am ${name}.\n${message}\n\nFrom: ${name} (${recemail})`;

    const mailtoUrl = `mailto:mallireddy0912@gmail.com?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailtoUrl);
  };
  return (
    <MainLayout>
      <Title title={"Contact"} span={"Contact"} />
      <ContactPageStyled>
        <InnerLayout className={"contact-section"}>
          <div className="left-content">
            <div className="contact-title">
              <h4>Get In Touch</h4>
            </div>
            <form className="form">
              <div className="form-field">
                <label htmlFor="name">Enter your name*</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="email">Enter your email*</label>
                <input
                  type="email"
                  id="email"
                  value={recemail}
                  onChange={(e) => setRecEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="subject">Enter your subject</label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="text-area">Enter your Message*</label>
                <textarea
                  name="textarea"
                  id="textarea"
                  cols="30"
                  rows="10"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <div className="form-field f-button">
                <SecondaryButton title={"Send Email"} onClick={sendEmail} />
              </div>
            </form>
          </div>
          <div className="right-content">
            <ContactItem
              title={"Phone"}
              icon={phone}
              cont1={"+1 716-544-1888"}
            />
            <ContactItem
              title={"Email"}
              icon={email}
              cont1={"mallireddy0912@gmail.com"}
            />
            <ContactItem
              title={"Address"}
              icon={location}
              cont1={"United States"}
            />
            {/* <ContactItem title={'Permanent Address'} icon={location} cont1={'4-23 Kamalapur, Navipet, Nizamabad, Telangana, 503245'} cont2={'India'} /> */}
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
    @media screen and (max-width: 978px) {
      grid-template-columns: repeat(1, 1fr);
      .f-button {
        margin-bottom: 3rem;
      }
    }
    .right-content {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      @media screen and (max-width: 502px) {
        width: 100%;
      }
    }
    .contact-title {
      h4 {
        color: var(--white-color);
        padding: 1rem 0;
        font-size: 1.8rem;
        font-weight: 700;
      }
    }
    .form {
      width: 100%;
      @media screen and (max-width: 502px) {
        width: 100%;
      }
      .form-field {
        margin-top: 2rem;
        position: relative;
        width: 100%;
        label {
          position: absolute;
          left: 20px;
          top: -10px;
          display: inline-block;
          background-color: var(--background-dark-color);
          padding: 0 0.5rem;
          color: var(--font-light-color);
          font-size: 0.85rem;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        input {
          border: 1px solid var(--border-color);
          outline: none;
          background: transparent;
          height: 50px;
          padding: 0 15px;
          width: 100%;
          color: inherit;
          border-radius: 12px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          &:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1);
          }
          &:focus + label,
          &:focus ~ label {
            color: var(--primary-color);
          }
        }
        textarea {
          background-color: transparent;
          border: 1px solid var(--border-color);
          outline: none;
          color: inherit;
          width: 100%;
          padding: 0.8rem 1rem;
          border-radius: 12px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          resize: vertical;
          &:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1);
          }
        }
      }
    }
  }
`;

export default ContactPage;
