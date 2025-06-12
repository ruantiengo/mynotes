'use client';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export interface Note {
  id?: string;
  title: string;
  content: string;
}

interface Props {
  note: Note | null;
  onSave: (note: Note) => void;
  onDelete: (id: string) => void;
}

export default function NoteEditor({ note, onSave, onDelete }: Props) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
  }, [note]);

  if (!note) {
    return <div className="flex-1 p-4">Select or create a note</div>;
  }

  return (
    <div className="flex-1 flex flex-col p-4 gap-4">
      <input
        className="border p-2 rounded text-lg font-semibold"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        className="border p-2 rounded flex-1 font-mono"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your markdown here..."
      />
      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => onSave({ ...note, title, content })}
        >
          Save
        </button>
        {note.id && (
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={() => onDelete(note.id!)}
          >
            Delete
          </button>
        )}
      </div>
      <div className="prose max-w-none mt-4 overflow-auto">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
