import React from "react";

const ExternalLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(function ExternalLink({ children, ...props }, ref) {
  return (
    <a {...props} ref={ref} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
});

export default ExternalLink;
