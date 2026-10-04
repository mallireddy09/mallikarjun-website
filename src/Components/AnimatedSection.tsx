import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";

/**
 * Wrapper component that reveals children with a smooth animation on scroll.
 * Usage: <AnimatedSection><YourContent /></AnimatedSection>
 */
type AnimatedSectionProps = React.HTMLAttributes<HTMLDivElement> & { delay?: number };

function AnimatedSection({ children, className = "", delay = 0, ...props }: AnimatedSectionProps) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
      {...props}
    >
      {children}
    </div>
  );
}

export default AnimatedSection;
