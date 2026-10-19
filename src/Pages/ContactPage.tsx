import { useState } from "react";
import styled from "styled-components";
import { MainLayout } from "../styles/Layouts";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { lightLiquidGlass } from "../styles/shared";
import { PROFILE } from "../data/profile";

function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); setCopied(true); setCopyError(false); }
    catch { setCopied(false); setCopyError(true); }
  };
  return (
    <MainLayout>

      <ContactPageStyled>
        <div className="contact-banner">
          <h2>Let’s build<br />something useful.</h2>
          <div className="contact-bottom">
            <p>Have a data challenge, an idea,<br />or a good question? Let’s talk.</p>
            <div className="contact-actions">
              <a className="say-hello" href={`mailto:${PROFILE.email}`}>Say hello <span aria-hidden="true">→</span></a>
              <button type="button" className={`copy-email${copied ? " is-copied" : ""}`} onClick={copyEmail} aria-label={copied ? "Email copied" : "Copy email"} title={copied ? "Email copied" : "Copy email"}>
                {copied ? <DoneRoundedIcon aria-hidden="true" /> : <ContentCopyOutlinedIcon aria-hidden="true" />}
              </button>
            </div>
          </div>
          <p className={`copy-status${copyError ? " has-error" : ""}`} role="status">{copyError ? `You can email me at ${PROFILE.email}` : copied ? "Email address copied to clipboard." : ""}</p>
        </div>
      </ContactPageStyled>
    </MainLayout>
  );
}

const ContactPageStyled = styled.section`
  .contact-banner {
    ${lightLiquidGlass}
    color: #090d15;
    padding: clamp(24px, 3.5vw, 48px);
    border-radius: 24px;
  }
  .contact-banner h2 { color: #090d15; font-size: clamp(30px, 5.4vw, 80px); font-weight: 700; line-height: 1.08; letter-spacing: -.055em; }
  .contact-bottom { display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 28px; margin-top: 40px; }
  .contact-bottom p { font-size: clamp(18px, 1.7vw, 24px); line-height: 1.5; }
  .contact-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; }
  .say-hello { display: inline-flex; align-items: center; gap: 24px; padding: 10px 10px 10px 26px; background: linear-gradient(135deg, #183858, #090d15); border: 1px solid rgba(191, 226, 255, .3); box-shadow: inset 0 1px 0 rgba(225, 244, 255, .2); color: #a6cdff; border-radius: 100px; font-weight: 600; }
  .say-hello span { display: grid; place-items: center; width: 46px; height: 46px; background: #19263b; color: #74acff; border-radius: 50%; font-size: 32px; }
  .copy-email { display: grid; place-items: center; width: 66px; height: 66px; flex: 0 0 66px; background: rgba(240, 249, 255, .3); border: 2px solid rgba(27, 83, 146, .24); border-radius: 50%; color: #090d15; cursor: pointer; }
  .copy-email svg { width: 26px; height: 26px; }
  .copy-email:hover, .copy-email.is-copied { background: linear-gradient(135deg, rgba(240, 251, 255, .9), rgba(139, 198, 255, .7)); color: #123c66; box-shadow: inset 0 1px 0 #fff, 0 6px 18px rgba(38, 125, 246, .2); }
  .say-hello:active, .copy-email:active { box-shadow: inset 0 1px 0 rgba(235, 250, 255, .5), 0 6px 20px rgba(38, 125, 246, .25); }
  .contact-banner :focus-visible { outline-color: #090d15; outline-offset: 5px; }

  .say-hello, .copy-email { transition: transform .2s; }
  .say-hello:hover, .copy-email:hover { transform: translateY(-3px); }
  .copy-status { font-size: 14px; margin-top: 14px; overflow-wrap: anywhere; }
  .copy-status:empty { display: none; }
  .copy-status:not(.has-error) { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  @media(prefers-reduced-motion: reduce) { .say-hello, .copy-email { transition: none; } }

`;

export default ContactPage;
