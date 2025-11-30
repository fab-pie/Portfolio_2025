import Image from "next/image";

export default function TaalosPage() {
  return (
    <section className="pt-32 px-6 pb-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">TAALOS</h1>
        <p className="text-center text-gray-400 mb-8">Proteus Group • 2025-2026</p>
        <p className="text-center text-sm text-gray-500 mb-12">Chef de Projet</p>

        <div className="space-y-8 text-gray-300">
          {/* Image + Description côte-à-côte */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <div className="grid gap-6 md:grid-cols-2 items-start">
              <div className="relative w-full rounded-lg overflow-hidden h-64 md:h-[420px] lg:h-[520px]">
                <Image src="/images/taalos.jpg" alt="TAALOS" fill className="object-contain" />
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-2 text-white">À Propos du Projet</h2>
                <p className="leading-relaxed text-gray-300">
                  TAALOS est une tourelle de suivi automatique de drones développée au sein de Proteus Group, 
                  l&apos;association de défense de l&apos;ESILV. En tant que chef de projet, j&apos;ai coordonné la conception
                  et la réalisation d&apos;un système pan/tilt capable de suivre des drones jusqu&apos;à 2000 mètres de distance.
                  Le projet combine mécanique, électronique, vision par ordinateur et algorithmes de contrôle avancés
                  pour créer une solution DIY transportable et économique.
                </p>
              </div>
            </div>
          </div>

          {/* Caractéristiques Techniques */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white">Caractéristiques Techniques</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Système de Détection</h3>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  <li>OpenCV pour traitement d'image</li>
                  <li>YOLOv11 pour détection de drones</li>
                  <li>Caméra haute résolution</li>
                  <li>Portée jusqu'à 2000 mètres</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Système Mécanique</h3>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  <li>Axe pan/tilt motorisé</li>
                  <li>Structure imprimée en 3D</li>
                  <li>Conception modulaire</li>
                  <li>Transportable et économique</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Électronique</h3>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  <li>Alimentation des moteurs optimisée</li>
                  <li>Gestion multi-caméras</li>
                  <li>Circuits custom pour le contrôle</li>
                  <li>Système d'énergie embarqué</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Contrôle Avancé</h3>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  <li>Correction PID</li>
                  <li>Filtres de Kalman</li>
                  <li>Asservissement temps réel</li>
                  <li>Prédiction de trajectoire</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Processus de Développement */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white">Processus de Développement</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">1. Conception Mécanique</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Design 3D de la structure complète</li>
                  <li>Optimisation pour l'impression 3D</li>
                  <li>Système pan/tilt avec roulements précis</li>
                  <li>Châssis modulaire et réparable</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">2. Système Électronique</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Création du système d'alimentation des moteurs</li>
                  <li>Intégration multi-caméras</li>
                  <li>Circuits de contrôle custom</li>
                  <li>Gestion de l'énergie pour longue autonomie</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">3. Vision par Ordinateur</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Implémentation d'OpenCV pour le traitement d'image</li>
                  <li>Entraînement et intégration de YOLOv8</li>
                  <li>Détection et classification de drones</li>
                  <li>Optimisation pour le temps réel</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">4. Algorithmes de Contrôle</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Correction PID pour mouvements fluides</li>
                  <li>Filtres de Kalman pour prédiction de trajectoire</li>
                  <li>Compensation des mouvements parasites</li>
                  <li>Calibration automatique</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">5. Assemblage & Tests</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Assemblage complet de la tourelle</li>
                  <li>Tests sur le terrain</li>
                  <li>Itérations et améliorations</li>
                  <li>Documentation technique</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white">Technologies</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h3 className="font-semibold text-white mb-2">Vision & IA</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>OpenCV</li>
                  <li>YOLOv8</li>
                  <li>Python</li>
                  <li>Computer Vision</li>
                  <li>Deep Learning</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Mécanique & Électronique</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Impression 3D</li>
                  <li>CAO 3D</li>
                  <li>Moteurs pas-à-pas</li>
                  <li>Circuits électroniques</li>
                  <li>Alimentation optimisée</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Contrôle</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Algorithmes PID</li>
                  <li>Filtres de Kalman</li>
                  <li>Asservissement</li>
                  <li>Temps réel</li>
                  <li>Prédiction de trajectoire</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Compétences & Management */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white">Compétences Développées</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Techniques</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">OpenCV</span>
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">YOLOv8</span>
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">PID</span>
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Kalman</span>
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">CAO 3D</span>
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Électronique</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Management</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Gestion d'équipe</span>
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Coordination</span>
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Planning</span>
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Leadership</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
