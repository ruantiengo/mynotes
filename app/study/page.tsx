'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Session {
  id: string;
  date: string;
  start: string;
  end: string;
}

export default function StudyPage() {
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [sessions, setSessions] = useState<Session[]>([]);

  const fetchSessions = async () => {
    const res = await fetch('/api/sessions');
    const data = await res.json();
    setSessions(data);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const addSession = async () => {
    if (!date || !start || !end) return;
    await fetch('/api/sessions', {
      method: 'POST',
      body: JSON.stringify({ date, start, end }),
    });
    setDate('');
    setStart('');
    setEnd('');
    fetchSessions();
  };

  const dayTotals: Record<string, number> = {};
  sessions.forEach((s) => {
    const startDate = new Date(`${s.date}T${s.start}`);
    const endDate = new Date(`${s.date}T${s.end}`);
    const hours = (endDate.getTime() - startDate.getTime()) / 3600000;
    const key = format(new Date(s.date), 'yyyy-MM-dd');
    dayTotals[key] = (dayTotals[key] || 0) + hours;
  });

  const labels = Object.keys(dayTotals).sort();
  const data = {
    labels,
    datasets: [
      {
        label: 'Horas por dia',
        data: labels.map((l) => dayTotals[l]),
        backgroundColor: '#7c3aed',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 to-purple-800 text-white flex flex-col items-center py-10 space-y-6">
      <h1 className="text-2xl font-bold">Registro de Estudos</h1>
      <div className="bg-purple-900/40 p-6 rounded-xl shadow-neumorphism text-white space-y-4 w-80">
        <div className="space-y-2">
          <Label htmlFor="date">Data</Label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="start">Início</Label>
          <Input id="start" type="time" value={start} onChange={(e) => setStart(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end">Fim</Label>
          <Input id="end" type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
        </div>
        <Button className="w-full" onClick={addSession}>Adicionar</Button>
      </div>
      <div className="w-full max-w-xl">
        <Bar data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>
    </div>
  );
}
