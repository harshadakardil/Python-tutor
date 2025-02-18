// src/pages/LessonPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChatWindow } from '../components/ui/ChatWindow';
import { CodeEditor } from '../components/ui/CodeEditor';
import { Lesson } from '@/types';

export const LessonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    fetch(`/api/lessons/${id}`)
      .then(res => res.json())
      .then(data => setLesson(data));
  }, [id]);

  if (!lesson) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChatWindow />
        <CodeEditor />
      </div>
    </div>
  );
};