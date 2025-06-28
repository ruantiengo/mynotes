import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { v4 as uuid } from "uuid";
import path from "path";

interface Session {
  id: string;
  date: string; // ISO date string
  start: string; // HH:mm
  end: string;   // HH:mm
}

const DB_PATH = path.join(process.cwd(), "sessions.json");

export async function GET() {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  const session = (await request.json()) as Omit<Session, "id">;
  const newSession: Session = { ...session, id: uuid() };
  let sessions: Session[] = [];
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    sessions = JSON.parse(data) as Session[];
  } catch {
    sessions = [];
  }
  sessions.push(newSession);
  await fs.writeFile(DB_PATH, JSON.stringify(sessions, null, 2));
  return NextResponse.json(newSession, { status: 201 });
}
