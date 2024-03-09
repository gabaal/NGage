import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto mt-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
      <p className="text-lg mb-4">Could not find the requested post. </p>
      <Link href="/">
        <span className="text-blue-500 hover:underline cursor-pointer">Return to the homepage</span>
      </Link>
    </div>
  );
}
