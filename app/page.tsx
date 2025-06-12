'use client';
import { useEffect, useState, useCallback } from 'react';
import NoteList from '../components/NoteList';
import NoteEditor, { Note } from '../components/NoteEditor';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [current, setCurrent] = useState<Note | null>(null);

  const fetchNotes = useCallback(async () => {
    const res = await fetch('/api/notes');
    const data = await res.json();
    setNotes(data);
    if (current) {
      const updated = data.find((n: Note) => n.id === current.id);
      setCurrent(updated || null);
    }
  }, [current]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSave = async (note: Note) => {
    if (note.id) {
      await fetch('/api/notes', { method: 'PUT', body: JSON.stringify(note) });
    } else {
      await fetch('/api/notes', { method: 'POST', body: JSON.stringify(note) });
    }
    fetchNotes();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/notes?id=${id}`, { method: 'DELETE' });
    if (current?.id === id) setCurrent(null);
    fetchNotes();
  };

  return (
    <div className="flex h-screen">
      <NoteList
        notes={notes}
        currentId={current?.id || null}
        onSelect={(n) => setCurrent(n)}
        onNew={() => setCurrent({ title: '', content: '' })}
      />
      <NoteEditor note={current} onSave={handleSave} onDelete={handleDelete} />
    </div>
  );
}
