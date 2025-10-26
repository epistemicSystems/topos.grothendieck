import React, { useState } from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold">What is a Category?</h1>
        <p className="text-gray-400">Grothendieck Explorable Explanations</p>
      </header>

      <main className="container mx-auto p-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="text-lg text-gray-700">
            Welcome to this interactive exploration...
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Interactive Exploration</h2>
          {/* Add interactive components here */}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Exercises</h2>
          {/* Add assessment components here */}
        </section>
      </main>
    </div>
  );
}
