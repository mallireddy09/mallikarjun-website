import React from "react";
import ExternalLink from "./ExternalLink";

function IconLinks({ links }) {
  return links.map(({ key, href, label, Icon, className }) => href ? (
    <ExternalLink key={key} href={href} aria-label={label} className={className}>
      <Icon />
    </ExternalLink>
  ) : null);
}

export default IconLinks;
