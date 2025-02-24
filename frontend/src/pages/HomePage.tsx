// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

export const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Python Tutor: Interactive Learning Platform</h1>
        
        <div className="prose mb-8">
          <p>
            Welcome to Python Tutor, your comprehensive learning platform for mastering Python programming.
            Our interactive environment combines intelligent tutoring with hands-on coding practice to
            provide an effective learning experience for programmers of all levels.
          </p>
          <p>
            Get started with personalized lessons, receive real-time feedback, and track your progress
            as you advance through carefully crafted programming concepts and exercises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/lesson/1">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Start Learning</h3>
              <p>Begin your Python journey with interactive lessons</p>
            </Card>
          </Link>
          
          <Link to="/config">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Customize Experience</h3>
              <p>Configure your learning environment</p>
            </Card>
          </Link>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Python Tutor?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Interactive Learning</h3>
              <p>Real-time code execution and instant feedback</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Personalized Tutoring</h3>
              <p>AI-powered assistance tailored to your level</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Structured Curriculum</h3>
              <p>Carefully designed lessons and exercises</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Safe Environment</h3>
              <p>Secure code execution and learning space</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};