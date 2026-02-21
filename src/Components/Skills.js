import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../styles/Layouts";
import Title from "../Components/Title";
import AnimatedSection from "./AnimatedSection";
import SkillSphere from "./SkillSphere";
import "./styles.css";

const skillsSections = [
  {
    heading: "Core Technologies",
    categories: [
      {
        label: "Languages & Processing",
        items: ["Python", "SQL", "Java", "PySpark", "REST APIs", "JavaScript", "React", "Linux", "GenAI", "AI/ML", "A/B Testing"],
      },
      {
        label: "Databases",
        items: ["MySQL", "SQL Server (T-SQL)", "Stored Procedures", "PostgreSQL", "Oracle", "MongoDB", "DynamoDB"],
      },
    ],
  },
  {
    heading: "Data & Big Data",
    categories: [
      {
        label: "Data Warehousing & Tools",
        items: ["Snowflake", "Redshift", "BigQuery", "Databricks", "Delta Lake", "Apache Beam", "dbt"],
      },
      {
        label: "Big Data & Ecosystems",
        items: ["Hadoop", "HDFS", "MapReduce", "Hive", "HBase", "SparkSQL", "Spark", "Airflow", "Presto", "Spark Streaming", "Kafka", "Flink"],
      },
    ],
  },
  {
    heading: "Cloud Platforms",
    categories: [
      {
        label: "AWS",
        items: ["S3", "Lambda", "EMR", "SageMaker", "Glue", "SNS", "SQS", "IAM", "ECS", "EKS", "Step Functions"],
      },
      {
        label: "Azure",
        items: ["Microsoft Fabric", "Data Lake Gen2", "Data Factory", "Synapse Analytics", "Azure Functions", "Azure SQL", "Logic Apps"],
      },
      {
        label: "Snowflake & GCP",
        items: ["Snow Pipe", "Snow Pro", "Clustering", "Materialized Views", "dbt", "Cloud Composer", "Cloud Run", "Pub/Sub", "IAM", "GCS"],
      },
    ],
  },
  {
    heading: "Architecture & Engineering",
    categories: [
      {
        label: "Data Architecture",
        items: ["ELT/ETL Design", "Data Modeling", "Data Lakes", "Lakehouses", "Object Storage", "Data Quality", "Governance"],
      },
      {
        label: "DevOps",
        items: ["Terraform", "CloudFormation", "Docker", "Kubernetes", "Azure DevOps", "CI/CD", "Git", "Azure Monitor"],
      },
    ],
  },
  {
    heading: "Tools & Practices",
    categories: [
      {
        label: "Visualization",
        items: ["Tableau", "Power BI", "Looker", "QuickSight"],
      },
      {
        label: "Consulting",
        items: ["Technical Design", "Requirements Gathering", "Documentation", "Client-Facing Communication", "Estimation"],
      },
      {
        label: "Methodologies",
        items: ["SDLC", "Agile (Scrum)", "Jira", "Confluence", "Trello", "Root Cause Analysis"],
      },
    ],
  },
];

function Skills({ theme }) {
  return (
    <SkillsStyled>
      <AnimatedSection>
        <Title title={"Skills"} span={"skills"} />
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <div className="sphere-wrapper">
          <SkillSphere theme={theme} />
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
                        <span key={item} className="chip">
                          {item}
                        </span>
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
            <a
              href="https://leetcode.com/u/mallikarjun09/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={`https://leetcard.jacoblin.cool/mallikarjun09?theme=${
                  theme === "light-theme" ? "light" : "dark"
                }&font=Gowun%20Batang&ext=heatmap&border=0`}
                alt="LeetCode stats for mallikarjun09"
                className="leetcode-img"
              />
            </a>
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
      margin-top: 2.5rem;
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
    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .skill-card {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
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
    cursor: default;
    &:hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
      background: rgba(var(--primary-color-rgb), 0.08);
      transform: translateY(-1px);
    }
  }

  .leetcode-section {
    margin-top: 3rem;
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
