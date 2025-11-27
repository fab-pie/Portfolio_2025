import PageArrows from "../components/PageArrows";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <section>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Portfolio 2025
        </h1>
        <p className="text-lg text-gray-300 max-w-xl mx-auto">
          Projets, expériences et hackathons marquants de mon année.
        </p>
      </section>
      <PageArrows />
    </main>
  );
}