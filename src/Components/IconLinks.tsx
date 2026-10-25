import type { SvgIconComponent } from "@mui/icons-material";
import ExternalLink from "./ExternalLink";
import ProfileLinkPreview, { type ProfilePreviewDetails } from "./ProfileLinkPreview";

interface IconLink {
  key: string;
  href?: string;
  label: string;
  Icon?: SvgIconComponent;
  image?: string;
  className?: string;
  preview?: ProfilePreviewDetails;
}

function IconLinks({ links }: { links: readonly IconLink[] }) {
  return <>{links.map(({ key, href, label, Icon, image, className, preview }) => {
    if (!href) return null;
    const link = <ExternalLink key={key} href={href} aria-label={label} className={className}>
      {image ? <img className="social-art" src={image} alt="" width="48" height="48" /> : Icon ? <Icon /> : null}
    </ExternalLink>;
    return preview ? <ProfileLinkPreview key={key} label={label} href={href} {...preview}>{link}</ProfileLinkPreview> : link;
  })}</>;
}

export default IconLinks;
