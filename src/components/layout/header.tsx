import { app_paths } from "@/lib/constants";
import Link from "next/link";

interface HeaderProps {
  subpage?: string;
}

const Header = (props: HeaderProps) => {
  const { subpage } = props;

  return (
    <header className="w-full">
      <h1 className="text-lg font-serif font-medium">
        <Link className="link-hover" href={app_paths.vaishnavs}>
          vaishnavs
        </Link>{" "}
        /{" "}
        <Link className="link-hover text-base" href={app_paths.home}>
          Lab&rsquo;s
        </Link>{" "}
        {subpage ? (
          <span className="text-base text-gray-500">/ {subpage}</span>
        ) : null}
      </h1>
    </header>
  );
};

export default Header;
