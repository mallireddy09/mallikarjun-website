export const PIPELINE_EXAMPLES = {
  events: {
    title: "Events",
    definition: "An event records something that happened at a point in time, such as a click, a purchase, or a sensor reading.",
    format: "An activity and its event payload",
    example: {
      kind: "event",
      action: "Product added to cart",
      time: "14:30:00 UTC",
      payload: '{\n  "event": "cart.item_added",\n  "user_id": "U-204",\n  "product_id": "P-301",\n  "quantity": 1,\n  "at": "2026-10-25T14:30:00Z"\n}',
    },
  },
  api: {
    title: "APIs",
    definition: "An API is an interface that lets software request data or actions from another system.",
    format: "A weather request and response",
    example: {
      kind: "api",
      method: "GET",
      endpoint: "/api/weather?city=Austin",
      status: "200 OK",
      response: '{\n  "city": "Austin",\n  "temperature_c": 24,\n  "condition": "Sunny"\n}',
    },
  },
  databases: {
    title: "Databases",
    definition: "A database organizes data in forms such as tables or documents so it can be queried and updated.",
    format: "A relational table",
    example: {
      kind: "table",
      name: "customers",
      columns: ["ID", "Name", "City"],
      rows: [["C-017", "Mallikarjun", "Austin"], ["C-028", "Reddy", "New York"], ["C-041", "Mananth", "San Francisco"]],
      query: "SELECT name, city FROM customers;",
    },
  },
  ingestion: {
    title: "Ingestion",
    definition: "Ingestion brings data from sources such as apps, APIs, and files into a platform, in batches or streams.",
    format: "Sources flowing into a landing zone",
    example: {
      kind: "ingestion",
      sources: ["App events", "API feeds", "CSV files"],
      destination: "Raw landing zone",
      path: "raw / incoming /",
      status: "1,240 records received",
      note: "Collect first; transform in the next stage.",
    },
  },
  processing: {
    title: "Stream + process",
    definition: "Processing cleans, combines, enriches, or calculates results from data, continuously or in batches.",
    format: "A transformation, before and after",
    example: {
      kind: "processing",
      before: [['temperature', '"24.5"'], ['unit', '"c"']],
      after: [['temperature_c', '24.5'], ['unit', '"C"']],
      steps: ["Convert text to a number", "Standardize field names and units"],
    },
  },
  trusted: {
    title: "Trusted data",
    definition: "Trusted data is validated, consistent, documented, and kept current so teams can use it confidently.",
    format: "A quality-checked dataset",
    example: {
      kind: "quality",
      dataset: "customers_clean",
      records: "1,240 rows",
      freshness: "Updated 2 minutes ago",
      checks: ["Customer IDs are unique", "Required fields are present", "Email formats are valid"],
      owner: "Owner: Customer Data team",
    },
  },
  analytics: {
    title: "Analytics",
    definition: "Analytics explores and interprets data through dashboards, reports, and analysis to understand trends and support decisions.",
    format: "A sales dashboard with metrics and a chart",
    example: {
      kind: "analytics",
      title: "Sales dashboard",
      period: "Last 7 days",
      metrics: [{ label: "Revenue", value: "$98,650" }, { label: "Orders", value: "1,240" }],
      series: [{ day: "Mon", value: 120 }, { day: "Tue", value: 145 }, { day: "Wed", value: 130 }, { day: "Thu", value: 180 }, { day: "Fri", value: 165 }, { day: "Sat", value: 230 }, { day: "Sun", value: 270 }],
      insight: "Weekend orders account for about 40% of the week.",
    },
  },
  ai: {
    title: "AI / ML",
    definition: "AI performs tasks such as understanding or generating content; ML learns patterns from data to classify or predict.",
    format: "An AI assistant and an ML prediction",
    example: {
      kind: "ai",
      prompt: "Summarize these product reviews.",
      answer: "Customers like the battery life but want faster charging.",
      features: ["120 km distance", "Ground shipping", "Warehouse A"],
      learning: "Past deliveries → trained model",
      prediction: "Estimated delivery: 2 days",
    },
  },
} as const;

export type PipelineStageId = keyof typeof PIPELINE_EXAMPLES;
export type PipelineExample = typeof PIPELINE_EXAMPLES[PipelineStageId]["example"];
