import Header from "@/components/layout/header";
import SEO from "@/components/ui/seo";
import { demo_paths } from "@/lib/constants";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <SEO
        title="Vaishnav's Lab | Experimental projects & demos"
        description="Welcome to the Lab's homepage."
      />
      <div className="space-y-10">
        <Header />

        <p>
          Welcome to Lab! This is a collection of experimental projects and
          demos showcasing various technologies and concepts.
        </p>

        <div>
          <ul>
            {demo_paths.map((demo) => (
              <li key={demo.path} className="text-base font-serif">
                <Link href={demo.path} className="link-hover font-medium">
                  {demo.label}
                </Link>
                <p className="text-sm text-zinc-600">{demo.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
