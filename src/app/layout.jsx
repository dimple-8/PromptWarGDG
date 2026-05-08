import './globals.css';

export const metadata = {
  title: 'Wanderlust AI | Next-Gen Travel Planning',
  description: 'Dynamically create personalized trips based on preferences, budget, and live travel insights.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>
        {children}
      </body>
    </html>
  );
}
