import awsPdf from "../assets/certificates/zuitt-aws-fundamentals.pdf";
import awsPreview from "../assets/certificates/zuitt-aws-fundamentals.webp";
import blockchain from "../assets/certificates/blockchain-workshop.png";
import blockchainPreview from "../assets/certificates/blockchain-workshop.webp";
export type Certificate = { id: string; title: string; issuer: string; date: string; dateLabel: string; description: string; preview: string; original: string; filename: string; kind: string };
export const certificates: Certificate[] = [
  { id: "zuitt-aws", title: "AWS Fundamentals", issuer: "Zuitt Learning Institute Incorporated", date: "2026-05-21", dateLabel: "May 21, 2026", description: "27-hour elective course covering EC2, DynamoDB, S3, Lambda, API Gateway and serverless deployment. Course dates: January 15–March 13, 2026.", preview: awsPreview, original: awsPdf, filename: "Henry-Alicoben-Zuitt-AWS-Fundamentals.pdf", kind: "Course completion" },
  { id: "blockchain", title: "Code & Conquer: Understanding Blockchain", issuer: "System Developers Alliance · PHINMA University of Pangasinan", date: "2026-01-19", dateLabel: "January 19, 2026", description: "Workshop exploring the Sui ecosystem, Move programming language and smart contracts.", preview: blockchainPreview, original: blockchain, filename: "Henry-Alicoben-Blockchain-Workshop.png", kind: "Workshop achievement" },
];

