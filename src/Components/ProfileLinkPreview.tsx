import { cloneElement, useId, useLayoutEffect, useRef, useState, type ComponentPropsWithRef, type ReactElement } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, Tooltip, type TooltipProps } from "@mui/material";
import { useForkRef } from "@mui/material/utils";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ExternalLink from "./ExternalLink";
import styled from "styled-components";
import ProfilePagePreview, { type ProfileKind } from "./ProfilePagePreview";
import { HOVER_PREVIEW_QUERY } from "../styles/media";
import useHeroPreviewRegion from "../hooks/useHeroPreviewRegion";

export interface ProfilePreviewDetails {
  kind: ProfileKind;
  handle: string;
}

export default function ProfileLinkPreview({ label, href, kind, handle, children }: ProfilePreviewDetails & {
  label: string; href: string; children: ReactElement<ComponentPropsWithRef<"a">>;
}) {
  const [open, setOpen] = useState(false);
  const [touchOpen, setTouchOpen] = useState(false);
  const titleId = useId();
  const pointerType = useRef("");
  const anchor = useRef<HTMLAnchorElement>(null);
  const handleRef = useForkRef(children.props.ref, anchor);
  const region = useHeroPreviewRegion(open, anchor.current);
  const destination = new URL(href);
  const displayUrl = label === "Resume" ? destination.hostname : `${destination.hostname}${destination.pathname.replace(/\/$/, "")}`;
  return <><PreviewTooltip open={open && region !== null} onOpen={() => {
    if (!touchOpen && window.matchMedia(HOVER_PREVIEW_QUERY).matches) setOpen(true);
  }} onClose={event => {
    setOpen(false);
    if (event.type === "keydown") event.stopPropagation();
  }} describeChild disableTouchListener disableInteractive enterDelay={200} leaveDelay={0} placement="top-start"
    slotProps={{ transition: { timeout: { enter: 120, exit: 0 } }, popper: {
      anchorEl: region ? { getBoundingClientRect: () => new DOMRect(region.left, region.top + region.height, region.width, 0) } : undefined,
      popperOptions: { strategy: "fixed" },
      modifiers: [{ name: "flip", enabled: false }, { name: "preventOverflow", options: { altAxis: true, tether: false, padding: 16 } }],
    } }}
    title={<FittedProfilePreview maxWidth={(region?.width ?? 370) - 16} maxHeight={(region?.height ?? 600) - 16}>
      <ProfilePagePreview kind={kind} handle={handle} displayUrl={displayUrl} />
    </FittedProfilePreview>}>
    {cloneElement(children, {
      ref: handleRef,
      onPointerDown: (event: React.PointerEvent) => { pointerType.current = event.pointerType; },
      onClick: (event: React.MouseEvent) => {
        if (pointerType.current === "touch" || !window.matchMedia(HOVER_PREVIEW_QUERY).matches) {
          event.preventDefault();
          setOpen(false);
          setTouchOpen(true);
        }
        pointerType.current = "";
      },
      "aria-haspopup": "dialog",
    })}
  </PreviewTooltip>
    <TouchPreview open={touchOpen} onClose={() => setTouchOpen(false)} aria-labelledby={titleId} maxWidth="xs" fullWidth>
      <DialogTitle id={titleId}>{label} preview<IconButton aria-label="Close preview" onClick={() => setTouchOpen(false)} autoFocus><CloseRoundedIcon /></IconButton></DialogTitle>
      <DialogContent><ProfilePagePreview kind={kind} handle={handle} displayUrl={displayUrl} touch />
        <ExternalLink className="open-profile" href={href}>Open {label} ↗</ExternalLink>
      </DialogContent>
    </TouchPreview>
  </>;
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

const TouchPreview = styled(Dialog)`
  .MuiDialog-paper { margin: 16px; width: calc(100% - 32px); max-height: calc(100dvh - 32px); background: var(--background-dark-color); color: var(--white-color); border-radius: 20px; }
  .MuiDialogTitle-root { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 12px 16px; }
  .MuiIconButton-root { color: inherit; }
  .MuiDialogContent-root { padding: 8px 16px 20px; overscroll-behavior: contain; }
  .native-preview { width: 100%; box-shadow: none; }
  .open-profile { display: block; margin-top: 18px; padding: 12px; text-align: center; border-radius: 10px; background: var(--primary-color); color: var(--background-dark-color); font-weight: 700; }
`;
