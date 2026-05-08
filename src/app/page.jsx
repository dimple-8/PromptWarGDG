import TripPlannerClient from '@/components/TripPlannerClient';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
          Wanderlust AI
        </h1>
        <nav className="flex gap-4">
          <button className="px-4 py-2 rounded-full border border-slate-800 hover:bg-slate-800 transition text-sm">Saved Trips</button>
          <button className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 transition text-white text-sm font-medium shadow-[0_0_15px_rgba(37,99,235,0.5)]">Sign In</button>
        </nav>
      </header>
      
      <TripPlannerClient />
    </main>
  );
}
