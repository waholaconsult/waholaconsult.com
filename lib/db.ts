import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "db.json");

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  views: number;
  reads: number;
}

export interface Lead {
  id: string;
  type: "contact" | "career";
  name: string;
  email: string;
  message: string;
  position?: string;
  portfolio?: string;
  timestamp: string;
  status: "new" | "contacted" | "closed";
}

export interface Subscriber {
  id: string;
  email: string;
  timestamp: string;
  status: string;
}

export interface Database {
  posts: BlogPost[];
  leads: Lead[];
  subscribers: Subscriber[];
  analytics: {
    views: Record<string, number>;
  };
}

export function readDb(): Database {
  try {
    if (!fs.existsSync(dbPath)) {
      fs.mkdirSync(path.dirname(dbPath), { recursive: true });
      const defaultDb: Database = {
        posts: [],
        leads: [],
        subscribers: [],
        analytics: { views: {} }
      };
      fs.writeFileSync(dbPath, JSON.stringify(defaultDb, null, 2), "utf8");
      return defaultDb;
    }
    const data = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database:", error);
    return {
      posts: [],
      leads: [],
      subscribers: [],
      analytics: { views: {} }
    };
  }
}

export function writeDb(data: Database): boolean {
  try {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing database:", error);
    return false;
  }
}
