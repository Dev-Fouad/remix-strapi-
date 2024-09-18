import { MetaFunction, LinksFunction, json, LoaderFunction } from "@vercel/remix";
import { Analytics } from '@vercel/analytics/react';

// import compiled styles
import styles from "./styles/app.css";

import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";

// import site header component
import SiteHeader from "./components/SiteHeader";
import { getUserData } from "./utils/session.server";

type LoaderData = {
  userData: Awaited<ReturnType<typeof getUserData>>;
};

// add links to site head
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

// add environment variables to loader
export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    userData: await getUserData(request),
  });
};

import type { HeadersFunction } from '@vercel/remix';
 
export const headers: HeadersFunction = () => ({
  'Cache-Control': 's-maxage=1, stale-while-revalidate=59',
});
 
export const config = { runtime: 'edge' };

export function Layout({ children }: { children: React.ReactNode }) {
  
  const { userData } = useLoaderData() as LoaderData;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
      <main className="site-main">
      <SiteHeader user={userData?.user} />
      {children}
        <ScrollRestoration />
        <Scripts />
      </main>
      <Analytics />

      </body>
    </html>
  );
}


export default function App() {
  return <Outlet />;
}
