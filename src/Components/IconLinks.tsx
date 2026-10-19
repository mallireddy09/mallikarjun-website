import type { SvgIconComponent } from "@mui/icons-material";
import ExternalLink from "./ExternalLink";

interface IconLink {
  key: string;
  href?: string;
  label: string;
  Icon?: SvgIconComponent;
  image?: string;
  className?: string;
}

function IconLinks({ links }: { links: readonly IconLink[] }) {
  return <>{links.map(({ key, href, label, Icon, image, className }) => href ? (
    <ExternalLink key={key} href={href} aria-label={label} className={className}>
      {image ? <img className="social-art" src={image} alt="" width="48" height="48" /> : Icon ? <Icon /> : null}
    </ExternalLink>
  ) : null)}</>;
}

export default IconLinks;
