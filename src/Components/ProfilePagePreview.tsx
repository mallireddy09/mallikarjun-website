import styled from "styled-components";
import portrait from "../img/arjun_image.jpg";
import { PROFILE } from "../data/profile";
import { publicAsset } from "../helper/publicAsset";

export type ProfileKind = "github" | "linkedin" | "x" | "resume";

function Cover({ platform }: { platform: "x" | "linkedin" }) {
  return platform === "x" ? <svg className="profile-cover" viewBox="0 0 360 105" aria-hidden="true">
    <defs><linearGradient id="profile-sunset" x2="0" y2="1"><stop stopColor="#536c8e"/><stop offset=".58" stopColor="#d0bc9c"/><stop offset=".8" stopColor="#e8ad66"/><stop offset="1" stopColor="#5c6879"/></linearGradient></defs>
    <path fill="url(#profile-sunset)" d="M0 0h360v105H0z"/><path fill="#15242d" d="M0 79l43-8 36 5 25 10 35 4-32 15H0zm360-13-61 4-52 12-56 8 53 15h116z"/><path stroke="#e4b878" opacity=".6" d="m125 91 91-3m-103 10 107-3m-89-58 140 4M33 24l116 12"/>
  </svg> : <svg className="profile-cover" viewBox="0 0 360 105" aria-hidden="true">
    <path fill="#e7e4df" d="M0 0h360v105H0z"/><path fill="#faf9f6" d="m0 76 360-11v40H0z"/><path fill="#cecac2" d="m118 17 79 2 3 62-76 1z"/><path fill="#efeeeb" d="m120 15 77 2 2 61-75 1z"/><path fill="#c6c2bb" d="m105 84 108-3-11 6H94z"/><path stroke="#b69558" strokeWidth="3" fill="none" d="m317 80 13-72-27 3"/><path fill="#b69558" d="m303 7-17 24 31 5z"/><path fill="#f5f4ef" d="m58 58 23 1-4 24H61z"/><path stroke="#706856" strokeWidth="2" d="m64 61-4-26m10 26 3-32m2 33 10-24"/>
  </svg>;
}

export default function ProfilePagePreview({ kind, handle, displayUrl }: { kind: ProfileKind; handle: string; displayUrl: string }) {
  const avatar = <img className="preview-portrait" src={portrait} alt="" width="84" height="84" />;
  return <Preview className={`native-preview native-${kind}`} data-platform={kind}>
    {kind === "resume" ? <>
      <div className="document-bar">Resume <span>Google Drive</span></div>
      <article className="resume-paper">
        <h3>{PROFILE.name}</h3><div className="resume-role">DATA ENGINEER · DATA &amp; AI</div>
        <h4>SUMMARY</h4><p>Data Engineer with 3+ years of experience building scalable data platforms across Azure, AWS, and GCP. Python, SQL, Spark, and Microsoft Fabric for batch and real-time processing.</p>
        <h4>EDUCATION</h4><strong>Master of Science in Data Sciences &amp; Applications</strong><p>State University of New York at Buffalo<br/>August 2023 – January 2025</p>
        <h4>PROFESSIONAL EXPERIENCE</h4><strong>NVIDIA Corporation <span className="resume-location">Texas</span></strong><p>Software Engineer – Data and Observability Platform<br/>June 2026 – Present</p>
        <ul><li>Scalable telemetry pipelines using Kafka, Elasticsearch, and OpenSearch.</li><li>Python services, optimized SQL models, and cloud-native Kubernetes applications.</li></ul>
      </article>
    </> : kind === "github" ? <>
      <div className="github-bar"><img src={publicAsset("/images/3d/github-clear-3d.webp")} alt=""/> GitHub <span>Public profile</span></div>
      <div className="github-body">{avatar}<h3>{PROFILE.name}</h3><div className="account-handle">{handle} <span>· he/him</span></div><p>Building data systems <b>@NVIDIA</b> | Previously <b>@microsoft</b> &amp; <b>@uber</b></p><div className="github-overview">▣ &nbsp; Overview <span>Repositories</span></div></div>
    </> : kind === "linkedin" ? <>
      <Cover platform="linkedin"/><div className="linkedin-body">{avatar}<span className="linkedin-brand" aria-hidden="true">in</span><h3>{PROFILE.name}</h3><p className="linkedin-headline">Data Engineer @NVIDIA | Previously @Microsoft &amp; @Uber | Data &amp; AI</p><div className="linkedin-location">Austin, Texas, United States</div><div className="linkedin-organizations"><span><img src={publicAsset("/images/3d/nvidia-brand-render.webp")} alt=""/> NVIDIA</span><span><img src={publicAsset("/images/3d/buffalo-brand-render.webp")} alt=""/> University at Buffalo</span></div><strong className="linkedin-connections">500+ connections</strong></div>
    </> : <>
      <Cover platform="x"/><div className="x-body">{avatar}<span className="x-brand" aria-hidden="true">𝕏</span><h3>{PROFILE.name}</h3><div className="account-handle">{handle}</div><p>Building data systems <span className="x-mention">@NVIDIA</span> | Previously <span className="x-mention">@Microsoft</span> &amp; <span className="x-mention">@Uber</span></p><div className="x-meta">Science &amp; Technology · United States<br/>Joined August 2018</div></div>
    </>}
    <footer>{displayUrl}<span aria-hidden="true"> ↗</span><small>Click the icon to open {kind === "resume" ? "my resume" : "my profile"}.</small></footer>
  </Preview>;
}

const Preview = styled.div`
  width: min(354px, calc(100vw - 48px)); box-sizing: border-box; position: relative;
  font-family: Arial, sans-serif; font-weight: 400; font-size: 12px; line-height: 1.45;
  color: #e6edf3; background: #0d1117; border: 1px solid #404a57; border-radius: 15px;
  box-shadow: 3px 4px 0 #252e3c, 6px 8px 0 #111926, 12px 22px 40px #0007, inset 0 1px 0 #ffffff38;
  transform: perspective(1000px) rotateX(2deg) rotateY(-3deg); transform-origin: center bottom; overflow: hidden;
  &::after { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; box-shadow: inset 1px 1px 0 #ffffff35; }
  h3 { font-family: Arial, sans-serif; font-size: 21px; line-height: 1.2; font-weight: 700; margin: 10px 0 3px; color: inherit; }
  p { margin: 12px 0; font-size: 12px; line-height: 1.5; color: inherit; }
  .preview-portrait { object-fit: cover; border-radius: 50%; background: white; border: 4px solid #0d1117; box-shadow: 2px 4px 9px #0004, inset 0 0 0 1px #fff5; }
  .profile-cover { width: 100%; height: 105px; display: block; }
  .account-handle { font-size: 14px; color: #9198a1; }
  footer { margin: 0 18px; padding: 11px 0 13px; border-top: 1px solid #ffffff25; font-size: 10px; overflow-wrap: anywhere; color: #9caec1; }
  footer span { color: #4499ed; } footer small { display: block; margin-top: 4px; font-size: 9px; }
  .github-bar { display: flex; align-items: center; gap: 7px; background: #010409; padding: 9px 16px; border-bottom: 1px solid #30363d; font-weight: bold; }
  .github-bar img { width: 23px; height: 23px; object-fit: contain; } .github-bar span { margin-left: auto; color: #9198a1; font-size: 10px; font-weight: normal; }
  .github-body { padding: 18px 22px 0; } .github-body .preview-portrait { width: 148px; height: 148px; display: block; margin: 0 auto 16px; border: 1px solid #6e7681; }
  .github-body .account-handle span { font-size: 12px; color: inherit; } .github-overview { padding: 10px 0; border-bottom: 2px solid #f78166; } .github-overview span { margin-left: 18px; color: #9198a1; }
  &.native-linkedin { background: #fff; color: #191919; border-color: #d4d1cb; box-shadow: 3px 4px 0 #dedbd5, 6px 8px 0 #a8adb4, 12px 22px 40px #0006; }
  .linkedin-body, .x-body { padding: 0 18px 15px; position: relative; }
  .linkedin-body .preview-portrait, .x-body .preview-portrait { margin-top: -40px; position: relative; }
  .linkedin-body .preview-portrait { border-color: #fff; }
  .linkedin-brand { position: absolute; right: 20px; top: 15px; font-size: 20px; background: #0a66c2; color: white; font-weight: bold; padding: 0 3px; border-radius: 2px; }
  .linkedin-headline { margin: 6px 0 !important; } .linkedin-location { color: #666; font-size: 11px; }
  .linkedin-organizations { display: flex; gap: 12px; flex-wrap: wrap; margin: 14px 0; font-size: 10px; font-weight: bold; } .linkedin-organizations span { color: #191919; display: flex; align-items: center; gap: 5px; } .linkedin-organizations img { width: 24px; height: 24px; object-fit: contain; }
  .linkedin-connections { color: #0a66c2; font-size: 12px; } &.native-linkedin footer { color: #666; border-color: #ddd; }
  &.native-x { background: #000; border-color: #38444d; color: #e7e9ea; } .x-body .preview-portrait { border-color: #000; } .x-brand { position: absolute; right: 20px; top: 16px; font-size: 27px; color: #e7e9ea; }
  .x-mention { color: #1d9bf0; } .x-meta { color: #71767b; font-size: 11px; line-height: 1.8; }
  &.native-resume { background: #e4e7ec; color: #181818; border-color: #cbd1db; box-shadow: 3px 4px 0 #c8cdd5, 6px 8px 0 #959fac, 12px 22px 40px #0006; }
  .document-bar { padding: 9px 16px; background: #f8fafd; color: #414854; font-size: 11px; font-weight: bold; } .document-bar span { float: right; font-weight: normal; color: #657084; }
  .resume-paper { margin: 14px 15px 10px; background: #fff; color: #111; padding: 17px; box-shadow: 1px 2px 0 #c5c9d1, 3px 5px 0 #fff, 5px 8px 12px #0002; font-family: Georgia, serif; }
  .resume-paper h3 { font: bold 20px Georgia, serif; margin: 0; text-align: center; } .resume-role { text-align: center; font: 8px Arial, sans-serif; margin: 5px 0 13px; letter-spacing: 1px; }
  .resume-paper :is(p, strong, ul, li, h4) { font-family: Georgia, serif; } .resume-paper span { color: inherit; }
  .resume-paper h4 { font-size: 12px; font-weight: normal; border-bottom: 1px solid #555; margin: 12px 0 6px; padding-bottom: 3px; }
  .resume-paper p, .resume-paper strong, .resume-paper ul { font-size: 10px; line-height: 1.4; } .resume-paper p { margin: 5px 0; } .resume-paper ul { list-style: disc; padding-left: 13px; margin-bottom: 0; } .resume-paper li + li { margin-top: 4px; } .resume-location { float: right; font-weight: normal; }
  &.native-resume footer { color: #536071; border-color: #c4ccd8; }
  @media (prefers-reduced-motion: reduce) { transform: none; }
`;
