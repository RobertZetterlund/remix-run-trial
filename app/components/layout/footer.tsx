export const Footer = () => (
  <footer className="p-4 shadow md:flex md:items-center md:justify-between md:p-6 bg-emerald-600">
    <span className="text-sm text-gray-100 sm:text-center ">
      <a href="https://robertzetterlund.github.io/" className="hover:underline">
        Robert Zetterlund
      </a>
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-100 sm:mt-0">
      <li>
        <a
          href="mailto:robert.zetterlund@outlook.com"
          className="hover:underline"
        >
          Contact
        </a>
      </li>
    </ul>
  </footer>
);
