export default function EdthPage() {
  return (
    <section className="pt-32">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">EDTH <br/> (European Defense Tech Hackathon)</h1>

        <p className="text-gray-300 mb-4">
          Edth — Hackathon de 48 heures pour développer des solutions applicapbles en Ukraine pour lutter contre l'invasion Russe.
          J'ai travaillé avec Léo Guerrin, Paul Herbiniere et Pierrick Arnaud, 3 membres de l'association Proteus, association de défense de l'ESILV.
          Nous avons crée une tourelle automatisée avec des composants simples dont je disposais afin de tracker des drones optiquement.
          J'ai réaliser tout le circuit éléctrique, les commandes du moteur ainsi que les impressions 3D pour la structure et les autres
          membres se sont occupés de la partie computer vision afin de détecter et suivre les drones. Ce hackathon a aussi servi de base à
          pour le projet TAALOS que je dirige actuellement avec Proteus.
        </p>

        {/* Video player: fichier placé dans public/video/ (nom de fichier contient un espace -> encodé en %20) */}
        <div className="mt-6 flex justify-center">
          <video
            controls
            className="w-full max-w-lg rounded-md border border-gray-700 bg-black"
            aria-label="Lecture de la démo Edth"
          >
            <source src="/video/edth%20demo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
