import React from "react";

function BrandMark({ decorative = false, ...props }) {
  return (
    <img
      {...props}
      src={`${process.env.PUBLIC_URL || ""}/brand-mr-squared.svg`}
      alt={decorative ? "" : "MR² — Mallikarjun Reddy"}
      width="1200"
      height="630"
    />
  );
}

export default BrandMark;
