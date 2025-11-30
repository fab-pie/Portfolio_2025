"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import PageArrows from "../../components/PageArrows";

export default function ProjectsPage() {
  const projects = [
    {
      title: "OKSI",
      desc: "Une montre qui communique vos données biologiques par des LEDs et un buzzer",
      image: "/images/OKSI_project_picture.jpg",
    },
    {
      title: "TAALOS",
      desc: "Une tourelle DIY, transportable et économique, pour suivre des drones et des fusées",
      image: "/images/TAALOS_project_picture.jpg",
    },
    {
      title: "ModalPlayground",
      desc: "Outil collaboratif pour prototyper des expériences haptiques spatiales avec tracking UWB",
      image: "/images/modalplayground_project_picture.jpg",
    },
  ];

  function ProjectCard({ p }: { p: { title: string; desc: string; image?: string } }) {
    const [pressed, setPressed] = useState(false);
    const slug = p.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
    const img = p.image ?? `/images/${slug}_project_picture.jpg`;

    return (
      <Link
        href={`/projects/${slug}`}
        aria-label={`${p.title} — en savoir plus`}
        className="w-full flex justify-center group"
      >
        <div
          className="relative rounded-2xl overflow-hidden border border-gray-700 bg-gray-800
                       w-[90vw] md:w-[85vw] lg:w-[80vw] max-w-[1400px] mx-auto
                       flex flex-col transition-transform active:scale-95 focus-within:ring-0"
          onPointerDown={() => setPressed(true)}
          onPointerUp={() => setPressed(false)}
          onPointerLeave={() => setPressed(false)}
          onPointerCancel={() => setPressed(false)}
          onTouchEnd={() => setPressed(false)}
        >
          {/* image section (en haut) - contenant l'overlay */}
          <div className="relative w-full h-[55vh] md:h-[75vh]">
            <Image src={img} alt={p.title} fill className="object-cover" />

            {/* overlay : transparent par défaut, s'assombrit au hover (group-hover) et encore plus en press/drag */}
            <div
              className={
                "absolute left-0 right-0 bottom-0 p-4 md:p-6 bg-transparent transition-colors duration-200 ease-in-out group-hover:bg-gray-900/60 " +
                (pressed ? "bg-gray-900/80" : "")
              }
            >
              <h2 className="text-xl md:text-3xl font-extrabold text-white mb-1">{p.title}</h2>
              <p className="text-gray-200 text-sm md:text-base mb-3">{p.desc}</p>

              <div>
                <span className="inline-block text-sm text-gray-300/90 font-medium">Cliquez pour en savoir plus →</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <main className="min-h-screen flex flex-col pt-32 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">Mes Projets</h1>

      <div className="flex flex-col gap-20">
        {projects.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>

      <PageArrows />
    </main>
  );
}
