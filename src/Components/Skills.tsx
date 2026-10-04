import type { ThemeProps } from "../types/portfolio";
import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../styles/Layouts";
import Title from "../Components/Title";
import AnimatedSection from "./AnimatedSection";
import SkillSphere from "./SkillSphere";
import skillsSections from "../data/skills";
import { PROFILE } from "../data/profile";
import ExternalLink from "./ExternalLink";
import { glassCard } from "../styles/shared";
import "./styles.css";

function Skills({ theme }: ThemeProps) {
  const leetcodeTheme = theme === "light-theme" ? "light" : "dark";

  return (
    <SkillsStyled>
      <Title title="Skills" span="skills" animated />

      <AnimatedSection delay={0.05}>
        <div className="sphere-wrapper">
          <SkillSphere />
        </div>
      </AnimatedSection>

      <InnerLayout>
        {skillsSections.map((section, sIdx) => (
          <div key={section.heading} className="skills-section">
            <AnimatedSection delay={0.06 * sIdx}>
              <h3 className="section-heading">{section.heading}</h3>
            </AnimatedSection>
            <div className="skills-grid">
              {section.categories.map((category, cIdx) => (
                <AnimatedSection
                  key={category.label}
                  delay={0.06 * sIdx + 0.05 * cIdx}
                >
                  <div className="skill-card">
                    <h4 className="card-label">{category.label}</h4>
                    <div className="chip-list">
                      {category.items.map((item) => (
                        <ExternalLink
                          key={item.label}
                          className="chip"
                          href={item.url}
                          title={`${item.label} documentation (opens in a new tab)`}
                        >
                          {item.label}
                        </ExternalLink>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        ))}

        <AnimatedSection delay={0.35}>
          <div className="leetcode-section">
            <span className="section-label">LeetCode Profile</span>
            <ExternalLink href={PROFILE.leetcode}>
              <img
                src={`https://leetcard.jacoblin.cool/mallikarjun09?theme=${leetcodeTheme}&font=Gowun%20Batang&ext=heatmap&border=0`}
                alt={`LeetCode stats for ${PROFILE.name}`}
                className="leetcode-img"
              />
            </ExternalLink>
          </div>
        </AnimatedSection>
      </InnerLayout>
    </SkillsStyled>
  );
}

const SkillsStyled = styled.section`
  .sphere-wrapper {
    display: flex;
    justify-content: center;
    margin: 2rem 0 0;
    @media screen and (max-width: 700px) {
      margin: 1rem 0 0;
    }
  }

  .skills-section {
    &:not(:first-child) {
      margin-top: 1.5rem;
    }
  }

  .section-heading {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--white-color);
    margin-bottom: 1.2rem;
    padding-bottom: 0.6rem;
    border-bottom: 2px solid var(--border-color);
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 60px;
      height: 2px;
      background: var(--gradient-primary);
      border-radius: 2px;
    }
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    @media screen and (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .skill-card {
    ${glassCard}
    padding: 1.4rem 1.5rem;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    &:hover {
      border-color: var(--primary-color);
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(var(--primary-color-rgb), 0.1);
    }
    .card-label {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--primary-color);
      font-weight: 700;
      margin-bottom: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      &::before {
        content: "";
        display: inline-block;
        width: 3px;
        height: 14px;
        border-radius: 2px;
        background: var(--gradient-primary);
        flex-shrink: 0;
      }
    }
  }

  .chip-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .chip {
    display: inline-block;
    padding: 0.35rem 0.85rem;
    font-size: 0.82rem;
    font-weight: 500;
    border-radius: 50px;
    border: 1px solid var(--border-color);
    color: var(--font-light-color);
    background: transparent;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;
    &:hover, &:focus-visible {
      border-color: var(--primary-color);
      color: var(--primary-color);
      background: rgba(var(--primary-color-rgb), 0.08);
      transform: translateY(-1px);
      text-decoration: underline;
    }
  }

  .leetcode-section {
    margin-top: 1.75rem;
    .section-label {
      display: inline-block;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--primary-color);
      font-weight: 700;
      margin-bottom: 1.2rem;
    }
    .leetcode-img {
      display: block;
      max-width: 100%;
      border-radius: 12px;
    }
  }
`;

export default Skills;
