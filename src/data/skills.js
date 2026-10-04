const skill = (label, url) => ({ label, url });

const skillsSections = [
  {
    heading: "Core Technologies",
    categories: [
      {
        label: "Languages",
        items: [
          skill("Python", "https://docs.python.org/3/"),
          skill("SQL", "https://www.postgresql.org/docs/current/tutorial-sql.html"),
          skill("JavaScript", "https://tc39.es/ecma262/"),
        ],
      },
      {
        label: "Frameworks & Web",
        items: [
          skill("PySpark", "https://spark.apache.org/docs/latest/api/python/"),
          skill("React", "https://react.dev/learn"),
          skill("REST APIs", "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design"),
        ],
      },
      {
        label: "AI & Machine Learning",
        items: [
          skill("GenAI", "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/overview"),
          skill("AI/ML", "https://developers.google.com/machine-learning/crash-course"),
          skill("A/B Testing", "https://firebase.google.com/docs/ab-testing/ab-concepts"),
        ],
      },
    ],
  },
  {
    heading: "Data & Big Data",
    categories: [
      {
        label: "Data Warehousing & Lakehouse",
        items: [
          skill("Snowflake", "https://docs.snowflake.com/en/"),
          skill("Databricks", "https://docs.databricks.com/aws/en/"),
          skill("Redshift", "https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html"),
          skill("Delta Lake", "https://docs.delta.io/latest/index.html"),
        ],
      },
      {
        label: "Big Data & Ecosystems",
        items: [
          skill("Spark", "https://spark.apache.org/docs/latest/"),
          skill("SparkSQL", "https://spark.apache.org/docs/latest/sql-programming-guide.html"),
          skill("Spark Streaming", "https://spark.apache.org/docs/latest/streaming-programming-guide.html"),
          skill("Apache Flink", "https://nightlies.apache.org/flink/flink-docs-stable/"),
          skill("Hadoop", "https://hadoop.apache.org/docs/stable/"),
          skill("HDFS", "https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/HdfsUserGuide.html"),
          skill("MapReduce", "https://hadoop.apache.org/docs/stable/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html"),
          skill("Hive", "https://hive.apache.org/docs/latest/"),
          skill("HBase", "https://hbase.apache.org/book.html"),
          skill("Presto", "https://prestodb.github.io/docs/current/"),
        ],
      },
      {
        label: "Databases & Search Engines",
        items: [
          skill("PostgreSQL", "https://www.postgresql.org/docs/current/"),
          skill("MySQL", "https://dev.mysql.com/doc/refman/8.4/en/"),
          skill("MongoDB", "https://www.mongodb.com/docs/"),
          skill("Elasticsearch", "https://www.elastic.co/docs/reference/elasticsearch"),
          skill("OpenSearch", "https://docs.opensearch.org/latest/"),
        ],
      },
    ],
  },
  {
    heading: "Data Pipelines & Orchestration",
    categories: [
      {
        label: "Transformation & Workflow",
        items: [
          skill("Dataform", "https://docs.cloud.google.com/dataform/docs"),
          skill("dbt", "https://docs.getdbt.com/docs/introduction"),
          skill("Apache Airflow", "https://airflow.apache.org/docs/apache-airflow/stable/"),
          skill("Kafka", "https://kafka.apache.org/documentation/"),
          skill("Pub/Sub", "https://docs.cloud.google.com/pubsub/docs"),
        ],
      },
    ],
  },
  {
    heading: "Cloud Platforms",
    categories: [
      {
        label: "AWS",
        items: [
          skill("S3", "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"),
          skill("Lambda", "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html"),
          skill("EMR", "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html"),
          skill("SageMaker", "https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html"),
          skill("Glue", "https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html"),
          skill("Step Functions", "https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html"),
          skill("ECS", "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html"),
          skill("EKS", "https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html"),
          skill("SNS", "https://docs.aws.amazon.com/sns/latest/dg/welcome.html"),
          skill("SQS", "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html"),
          skill("AWS IAM", "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html"),
        ],
      },
      {
        label: "GCP",
        items: [
          skill("BigQuery", "https://docs.cloud.google.com/bigquery/docs"),
          skill("Cloud Composer", "https://docs.cloud.google.com/composer/docs"),
          skill("Cloud Run", "https://docs.cloud.google.com/run/docs"),
          skill("GCS", "https://docs.cloud.google.com/storage/docs"),
          skill("GCP IAM", "https://docs.cloud.google.com/iam/docs"),
        ],
      },
      {
        label: "Azure",
        items: [
          skill("Microsoft Fabric", "https://learn.microsoft.com/en-us/fabric/"),
          skill("Data Factory", "https://learn.microsoft.com/en-us/azure/data-factory/"),
          skill("Synapse Analytics", "https://learn.microsoft.com/en-us/azure/synapse-analytics/"),
          skill("Data Lake Gen2", "https://learn.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction"),
        ],
      },
    ],
  },
  {
    heading: "Architecture & DevOps",
    categories: [
      {
        label: "Data Architecture",
        items: [
          skill("Data Lakes", "https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html"),
          skill("Lakehouses", "https://docs.databricks.com/aws/en/lakehouse/"),
          skill("ETL/ELT Design", "https://learn.microsoft.com/en-us/azure/architecture/data-guide/relational-data/etl"),
          skill("Data Modeling", "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema"),
          skill("Object Storage", "https://docs.cloud.google.com/storage/docs/introduction"),
          skill("Data Quality", "https://docs.cloud.google.com/dataplex/docs/use-auto-data-quality"),
          skill("Data Governance", "https://learn.microsoft.com/en-us/purview/data-governance-overview"),
        ],
      },
      {
        label: "DevOps & CI/CD",
        items: [
          skill("Linux", "https://docs.kernel.org/"),
          skill("Terraform", "https://developer.hashicorp.com/terraform/docs"),
          skill("Docker", "https://docs.docker.com/"),
          skill("Kubernetes", "https://kubernetes.io/docs/"),
          skill("Git", "https://git-scm.com/docs"),
          skill("Azure DevOps", "https://learn.microsoft.com/en-us/azure/devops/?view=azure-devops"),
          skill("CI/CD", "https://learn.microsoft.com/en-us/azure/devops/pipelines/overview?view=azure-devops"),
        ],
      },
      {
        label: "Observability & Monitoring",
        items: [
          skill("Grafana", "https://grafana.com/docs/grafana/latest/"),
          skill("Kibana", "https://www.elastic.co/docs/explore-analyze"),
          skill("Azure Monitor", "https://learn.microsoft.com/en-us/azure/azure-monitor/overview"),
        ],
      },
    ],
  },
  {
    heading: "Tools & Practices",
    categories: [
      {
        label: "Visualization & BI",
        items: [
          skill("Tableau", "https://help.tableau.com/current/pro/desktop/en-us/default.htm"),
          skill("Power BI", "https://learn.microsoft.com/en-us/power-bi/"),
        ],
      },
      {
        label: "Methodologies & Management",
        items: [
          skill("SDLC", "https://aws.amazon.com/what-is/sdlc/"),
          skill("Agile (Scrum)", "https://scrumguides.org/scrum-guide.html"),
          skill("Jira", "https://support.atlassian.com/jira-software-cloud/"),
          skill("Confluence", "https://support.atlassian.com/confluence-cloud/"),
          skill("Trello", "https://support.atlassian.com/trello/"),
        ],
      },
    ],
  },
];

export default skillsSections;
