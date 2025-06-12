import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { v4 as uuid } from "uuid";
import path from "path";

interface Note {
  id: string;
  title: string;
  content: string;
}

const DB_PATH = path.join(process.cwd(), "notes.json");

export async function GET() {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  const note = (await request.json()) as Omit<Note, "id">;
  const newNote: Note = { ...note, id: uuid() };
  let notes: Note[] = [];
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    notes = JSON.parse(data) as Note[];
  } catch {
    notes = [];
  }
  notes.push(newNote);
  await fs.writeFile(DB_PATH, JSON.stringify(notes, null, 2));
  return NextResponse.json(newNote, { status: 201 });
}

export async function PUT(request: Request) {
  const note = (await request.json()) as Note;
  let notes: Note[] = [];
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    notes = JSON.parse(data) as Note[];
  } catch {
    notes = [];
  }
  notes = notes.map((n) => (n.id === note.id ? note : n));
  await fs.writeFile(DB_PATH, JSON.stringify(notes, null, 2));
  return NextResponse.json(note);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  let notes: Note[] = [];
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    notes = JSON.parse(data) as Note[];
  } catch {
    notes = [];
  }
  notes = notes.filter((n) => n.id !== id);
  await fs.writeFile(DB_PATH, JSON.stringify(notes, null, 2));
  return NextResponse.json({});
}
