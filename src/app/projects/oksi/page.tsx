export default function OksiPage() {
  return (
    <section className="pt-32 px-6 pb-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">OKSI</h1>
        <p className="text-center text-gray-400 mb-8">Projet R&D • 2024-2025</p>
        <p className="text-center text-sm text-gray-500 mb-12">Montre de course connectée</p>

        <div className="space-y-8 text-gray-300">
          {/* Vidéo de Démonstration */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white text-center">Démonstration</h2>
            <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
              <video 
                controls 
                className="w-full"
                preload="metadata"
              >
                <source src="/videos/OKSI_demo.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </div>
          </div>

          {/* Images du Projet */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white text-center">Galerie</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 text-center">PCB</h3>
                <div className="space-y-4">
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <img src="/images/PCB_top.jpg" alt="PCB OKSI - Dessus" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <img src="/images/PCB_bottom.jpg" alt="PCB OKSI - Dessous" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 text-center">WebApp</h3>
                <div className="relative rounded-lg overflow-hidden" style={{height: 'calc(32rem + 1rem)'}}>
                  <img src="/images/OKSI_app.jpg" alt="Application OKSI" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* Description Principale */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white">À Propos du Projet</h2>
            <p className="leading-relaxed">
              OKSI est une montre de course connectée innovante développée dans le cadre d'un projet de R&D. 
              Le projet est né d'une analyse approfondie des montres existantes sur le marché et des principales 
              blessures chez les coureurs, afin d'orienter un design innovant et pertinent qui répond aux besoins 
              réels des sportifs. L'objectif est de créer un dispositif portable capable de communiquer des 
              informations vitales via des LEDs et un buzzer, tout en collectant et analysant les données 
              biométriques du coureur.
            </p>
          </div>

          {/* Fonctionnalités Principales */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white">Fonctionnalités Principales</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Capteurs Biométriques</h3>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  <li>Accéléromètre pour analyse de mouvement</li>
                  <li>GPS pour suivi de parcours</li>
                  <li>Capteur cardiaque (I2C)</li>
                  <li>Analyse en temps réel</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Retour Utilisateur</h3>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  <li>LEDs pour notifications visuelles</li>
                  <li>Moteurs vibrants</li>
                  <li>Buzzer pour alertes sonores</li>
                  <li>Interface sans écran</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Connectivité</h3>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  <li>Bluetooth Low Energy (BLE)</li>
                  <li>Application mobile dédiée</li>
                  <li>Interface web pour visualisation</li>
                  <li>Synchronisation automatique</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Design Modulaire</h3>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  <li>Modules interchangeables</li>
                  <li>Batterie rechargeable</li>
                  <li>Conçu pour la réparabilité</li>
                  <li>Composants standardisés</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Processus de Développement */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white">Processus de Développement</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">1. Analyse & Conception</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Étude des montres existantes sur le marché</li>
                  <li>Analyse des principales blessures chez les coureurs</li>
                  <li>Conception 3D sur OnShape</li>
                  <li>Design innovant et pertinent</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">2. Prototypage</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Impression 3D du boîtier</li>
                  <li>Tests de différents matériaux</li>
                  <li>Optimisation de l'ergonomie</li>
                  <li>Itérations rapides</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">3. Électronique</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Réalisation des circuits imprimés avec KiCad</li>
                  <li>Optimisation de la taille de la PCB</li>
                  <li>Soudure manuelle des composants SMD</li>
                  <li>Tests de composants alternatifs pour réduire les coûts</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">4. Firmware & Software</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Développement du firmware Arduino</li>
                  <li>Gestion des capteurs via I2C</li>
                  <li>Communication BLE avec l'application mobile</li>
                  <li>Application web Node.js pour visualisation des données</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">5. Industrialisation</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Optimisation des coûts de production</li>
                  <li>Premiers contacts avec des usines</li>
                  <li>Préparation pour une future production</li>
                  <li>Documentation technique complète</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technologies Utilisées */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white">Technologies</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h3 className="font-semibold text-white mb-2">Hardware</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>PCB custom (KiCad)</li>
                  <li>Accéléromètre</li>
                  <li>Module GPS</li>
                  <li>Capteur cardiaque I2C</li>
                  <li>LEDs RGB</li>
                  <li>Moteurs vibrants</li>
                  <li>Batterie Li-ion</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Software</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Arduino (Firmware)</li>
                  <li>BLE (Communication)</li>
                  <li>Node.js (Backend)</li>
                  <li>HTML/CSS/JavaScript (Web)</li>
                  <li>Application mobile</li>
                  <li>Git (Version control)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Design & Prototypage</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>OnShape (CAO 3D)</li>
                  <li>Impression 3D</li>
                  <li>KiCad (PCB Design)</li>
                  <li>Soudure SMD</li>
                  <li>Tests matériaux</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Compétences Développées */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white">Compétences Développées</h2>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">R&D</span>
              <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Modélisation 3D</span>
              <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">KiCad</span>
              <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Arduino</span>
              <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">BLE</span>
              <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Node.js</span>
              <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Prototypage</span>
              <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Entrepreneuriat</span>
              <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Git & Collaboration</span>
              <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">PCB Design</span>
              <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Soudure SMD</span>
              <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Communication I2C</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
