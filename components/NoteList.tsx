'use client';
import React from 'react';
import { Note } from './NoteEditor';

interface Props {
  notes: Note[];
  currentId: string | null;
  onSelect: (note: Note) => void;
  onNew: () => void;
}

export default function NoteList({ notes, currentId, onSelect, onNew }: Props) {
  return (
    <div className="w-64 border-r h-screen overflow-y-auto p-4 flex flex-col gap-2 bg-gray-50 dark:bg-gray-900">
      <button
        className="mb-4 px-3 py-2 bg-green-600 text-white rounded"
        onClick={onNew}
      >
        New Note
      </button>
      {notes.map((n) => (
        <div
          key={n.id}
          onClick={() => onSelect(n)}
          className={`cursor-pointer p-2 rounded ${
            currentId === n.id ? 'bg-gray-300 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-800'
          }`}
        >
          {n.title || 'Untitled'}
        </div>
      ))}
    </div>
  );
}
