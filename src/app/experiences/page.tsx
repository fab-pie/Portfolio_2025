"use client";

import Link from "next/link";
import Image from "next/image";
import PageArrows from "../../components/PageArrows";

export default function StagesPage() {
  const stages = [
    {
      title: "Mines de Saint-Étienne",
      slug: "mines",
      desc: "Stage réalisé en 2025 aux Mines de Saint-Étienne",
      image: "/images/mines_st.png",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col pt-32 px-4">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Stages</h1>
      </div>
      <div className="flex flex-col gap-12">
        {stages.map((s) => (
          <StageCard key={s.slug} s={s} />
        ))}
      </div>

      <PageArrows />
    </main>
  );
}

function StageCard({ s }: { s: { title: string; desc: string; image: string; slug: string } }) {
  return (
    <Link href={`/experiences/${s.slug}`} aria-label={`${s.title} — en savoir plus`} className="w-full flex justify-center group">
      <div
        className={`relative rounded-2xl overflow-hidden border border-gray-700 bg-gray-800
                     w-[90vw] md:w-[85vw] lg:w-[80vw] max-w-[1400px] mx-auto
                     flex flex-col transition-transform active:scale-95 focus-within:ring-0`}
      >
        <div className="relative w-full h-[55vh] md:h-[75vh]">
          <Image src={s.image} alt={s.title} fill className="object-cover" />

          <div className="absolute left-0 right-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-black/70 to-transparent">
            <h2 className="text-xl md:text-3xl font-extrabold text-white mb-1">{s.title}</h2>
            <p className="text-gray-200 text-sm md:text-base mb-3">{s.desc}</p>
            <span className="inline-block text-sm text-gray-300/90 font-medium">Cliquez pour en savoir plus →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
