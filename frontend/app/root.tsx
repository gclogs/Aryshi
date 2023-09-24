import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from './tailwind.css'
import Header from "./components/base/Header";
import Footer from "./components/base/Footer";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Aryshi",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    }
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="h-full flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
