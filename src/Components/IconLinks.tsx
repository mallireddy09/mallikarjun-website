import type { SvgIconComponent } from "@mui/icons-material";
import ExternalLink from "./ExternalLink";

export interface IconLink {
  key: string;
  href?: string;
  label: string;
  Icon: SvgIconComponent;
  className?: string;
}

function IconLinks({ links }: { links: readonly IconLink[] }) {
  return <>{links.map(({ key, href, label, Icon, className }) => href ? (
    <ExternalLink key={key} href={href} aria-label={label} className={className}>
      <Icon />
    </ExternalLink>
  ) : null)}</>;
}

export default IconLinks;
