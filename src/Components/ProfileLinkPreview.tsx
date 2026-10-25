import { useLayoutEffect, useRef, useState, type ReactElement } from "react";
import { Tooltip, type TooltipProps } from "@mui/material";
import styled from "styled-components";
import ProfilePagePreview, { type ProfileKind } from "./ProfilePagePreview";
import { HOVER_PREVIEW_QUERY } from "../styles/media";
import useHeroPreviewRegion from "../hooks/useHeroPreviewRegion";

export interface ProfilePreviewDetails {
  kind: ProfileKind;
  handle: string;
}

export default function ProfileLinkPreview({ label, href, kind, handle, children }: ProfilePreviewDetails & {
  label: string; href: string; children: ReactElement;
}) {
  const [open, setOpen] = useState(false);
  const region = useHeroPreviewRegion(open);
  const destination = new URL(href);
  const displayUrl = label === "Resume" ? destination.hostname : `${destination.hostname}${destination.pathname.replace(/\/$/, "")}`;
  return <PreviewTooltip open={open && region !== null} onOpen={event => {
    if (event.type === "focus" || window.matchMedia(HOVER_PREVIEW_QUERY).matches) setOpen(true);
  }} onClose={event => {
    setOpen(false);
    if (event.type === "keydown") event.stopPropagation();
  }} describeChild disableTouchListener disableInteractive enterDelay={200} leaveDelay={0} placement="top-start"
    TransitionProps={{ timeout: { enter: 120, exit: 0 } }}
    slotProps={{ popper: {
      anchorEl: region ? { getBoundingClientRect: () => new DOMRect(region.left, region.top + region.height, region.width, 0) } : undefined,
      popperOptions: { strategy: "fixed" },
      modifiers: [{ name: "flip", enabled: false }, { name: "preventOverflow", options: { altAxis: true, tether: false, padding: 16 } }],
    } }}
    title={<FittedProfilePreview maxWidth={(region?.width ?? 370) - 16} maxHeight={(region?.height ?? 600) - 16}>
      <ProfilePagePreview kind={kind} handle={handle} displayUrl={displayUrl} />
    </FittedProfilePreview>}>
    {children}
  </PreviewTooltip>;
}

function FittedProfilePreview({ maxWidth, maxHeight, children }: { maxWidth: number; maxHeight: number; children: ReactElement }) {
  const content = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 354, height: 550 });
  useLayoutEffect(() => {
    const element = content.current;
    if (!element) return;
    const measure = () => setSize(current => {
      const next = { width: element.offsetWidth, height: element.offsetHeight };
      return current.width === next.width && current.height === next.height ? current : next;
    });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const scale = Math.min(1, maxWidth / Math.max(1, size.width), maxHeight / Math.max(1, size.height));
  return <div className="profile-preview-bounds" style={{ position: "relative", width: size.width * scale, height: size.height * scale }}>
    <div ref={content} style={{ position: "absolute", top: 0, left: 0, width: "max-content", transform: `scale(${scale})`, transformOrigin: "top left" }}>{children}</div>
  </div>;
}

const PreviewTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)`
  z-index: 10;
  pointer-events: none;
  && .MuiTooltip-tooltip { max-width: none; margin: 0; padding: 8px; border: none; border-radius: 0; background: transparent; box-shadow: none; pointer-events: none; }
`;
