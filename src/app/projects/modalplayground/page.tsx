export default function ModalPlaygroundPage() {
  return (
    <section className="pt-32 px-6 pb-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">ModalPlayground</h1>
        <p className="text-center text-gray-400 mb-8">Recherche • Projet Collaboratif</p>

        <div className="space-y-8 text-gray-300">
          {/* Images du Projet */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <img src="/images/modalplayground_device.jpg" alt="Dispositif haptique" className="w-full h-full object-cover" />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <img src="/images/modalplayground_interface.jpg" alt="Interface utilisateur" className="w-full h-full object-cover" />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <img src="/images/modalplayground_demo.jpg" alt="Démonstration" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Description Principale */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white">À Propos du Projet</h2>
            <p className="leading-relaxed">
              ModalPlayground est un outil collaboratif pour prototyper des expériences haptiques spatiales et multi-modales. 
              Chaque utilisateur porte un dispositif haptique capable de délivrer des vibrations et des signaux thermiques 
              (chauffage ou refroidissement). Les positions des utilisateurs sont suivies avec la technologie Ultra-Wideband (UWB) 
              pour fournir un retour haptique basé sur la localisation. Cela permet à chaque utilisateur de définir des zones 
              haptiques, soit en les dessinant sur une carte de l'espace via un smartphone, soit en utilisant leur corps comme 
              un "pinceau" pour créer des zones en se déplaçant.
            </p>
          </div>

          {/* Fonctionnalités Clés */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white">Fonctionnalités Principales</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Retour Haptique Multi-Modal</h3>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  <li>Vibrations contrôlables</li>
                  <li>Signaux thermiques (chaud/froid)</li>
                  <li>Feedback basé sur la position</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Suivi de Position UWB</h3>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  <li>Localisation ultra-précise</li>
                  <li>Tracking en temps réel</li>
                  <li>Technologie Ultra-Wideband</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Création de Zones Interactive</h3>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  <li>Dessin sur carte via smartphone</li>
                  <li>Création par mouvement corporel</li>
                  <li>Zones personnalisables</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Collaboration Multi-Utilisateurs</h3>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  <li>Expériences partagées</li>
                  <li>Synchronisation temps réel</li>
                  <li>Zones collaboratives</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white">Technologies</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h3 className="font-semibold text-white mb-2">Hardware</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Dispositifs haptiques</li>
                  <li>Capteurs UWB</li>
                  <li>Modules thermiques</li>
                  <li>Moteurs vibratoires</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Localisation</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Ultra-Wideband (UWB)</li>
                  <li>Tracking en temps réel</li>
                  <li>Triangulation spatiale</li>
                  <li>Calibration automatique</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Interface</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Application smartphone</li>
                  <li>Interface web</li>
                  <li>Visualisation cartographique</li>
                  <li>Outils de dessin interactifs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
