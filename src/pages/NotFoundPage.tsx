import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

export function NotFoundPage() {
  const error = useRouteError();
  const isCrash = error != null && !(isRouteErrorResponse(error) && error.status === 404);

  return (
    <section className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-start justify-center px-6 pt-24">
      <p className="font-display text-7xl font-light italic text-saffron-400">{isCrash ? 'Oops' : '404'}</p>
      <h1 className="mt-4 font-display text-4xl font-normal text-parchment-100">
        {isCrash ? 'This page hit a snag.' : 'This road isn’t on the map.'}
      </h1>
      <p className="mt-3 max-w-md text-parchment-200/60">
        {isCrash
          ? 'Something went wrong while loading it. Head back home and try again.'
          : 'The page you followed doesn’t exist. Start from the atlas or pick a destination.'}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/explore" className="btn-primary">
          Open the atlas
        </Link>
        <Link to="/" className="btn-ghost">
          Go home
        </Link>
      </div>
    </section>
  );
}
