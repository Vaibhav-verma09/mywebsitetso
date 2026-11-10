import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center font-serif text-3xl text-gold mb-6">
        404
      </div>
      <h1 className="font-serif text-3xl sm:text-4xl text-ink mb-3">
        Page Not Found
      </h1>
      <p className="text-muted text-sm max-w-md mb-8">
        The destination you are looking for does not exist or has been relocated within the portfolio.
      </p>
      <Link href="/" className="btn-solid-gold text-xs">
        Return to Portfolio
      </Link>
    </div>
  );
}
