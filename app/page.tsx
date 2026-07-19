import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Work from "@/components/site/Work";
import Thinking from "@/components/site/Thinking";
import About from "@/components/site/About";
import Contact from "@/components/site/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Thinking />
        <About />
        <Contact />
      </main>
    </>
  );
}
