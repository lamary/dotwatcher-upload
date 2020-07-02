import React from "react";
import Link from "next/link";

const links = [
  {
    href: "/races",
    label: "Races",
  },
  {
    href: "/profiles",
    label: "Users / Profiles",
  },
  {
    href: "https://dotwatcher.cc/results",
    label: "Dotwatcher live results",
  },
].map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link href="/">
          <a className="link blue underline">Home</a>
        </Link>
      </li>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <a className="link blue underline" href={href}>
            {label}
          </a>
        </li>
      ))}
    </ul>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif;
        color: #111111;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
    `}</style>
  </nav>
);

export default Nav;
