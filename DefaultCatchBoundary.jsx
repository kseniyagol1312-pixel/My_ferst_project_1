// DefaultCatchBoundary.jsx
// Самодостаточный экран ошибки для TanStack Router / TanStack Start.
// Нужны только: react и @tanstack/react-router. Стили — Tailwind (если Tailwind нет,
// кнопки просто будут без оформления, но всё будет работать).
//
// Подключение:
//   import { DefaultCatchBoundary } from "./DefaultCatchBoundary";
//   const router = createRouter({ routeTree, defaultErrorComponent: DefaultCatchBoundary });

import { ErrorComponent, Link, rootRouteId, useMatch, useRouter } from "@tanstack/react-router";

const baseBtn =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50";
const primaryBtn = `${baseBtn} bg-neutral-900 text-white hover:bg-neutral-800`;
const outlineBtn = `${baseBtn} border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100`;

export function DefaultCatchBoundary({ error }) {
  const router = useRouter();
  const isRoot = useMatch({ strict: false, select: (state) => state.id === rootRouteId });

  console.error(error);

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 py-24">
      <ErrorComponent error={error} />
      <div className="flex gap-2">
        <button type="button" className={outlineBtn} onClick={() => router.invalidate()}>
          Try again
        </button>
        {isRoot ? (
          <Link to="/" className={primaryBtn}>
            Home
          </Link>
        ) : (
          <button type="button" className={primaryBtn} onClick={() => router.history.back()}>
            Go back
          </button>
        )}
      </div>
    </div>
  );
}

export default DefaultCatchBoundary;
