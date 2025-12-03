const footer_links = [
  {
    label: "peerlist",
    link: "https://peerlist.io/vaishnavs",
  },
  {
    label: "github",
    link: "https://github.com/vaishnavme",
  },
  {
    label: "twitter",
    link: "https://x.com/vaishnavs0",
  },
];

const Footer = () => {
  return (
    <footer className="flex items-center justify-between w-full gap-x-4 mx-auto max-w-xl py-6 text-gray-500">
      <p className="text-xs font-medium">© {new Date().getFullYear()}</p>

      <div className="flex items-center gap-x-4">
        {footer_links.map((social) => (
          <a
            key={social.label}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 font-serif text-sm hover:text-stone-900 underline-offset-2 hover:underline"
          >
            {social.label}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
