export default function MinesStagePage() {
  return (
    <section className="pt-32 px-6 pb-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Stage — Mines de Saint-Étienne</h1>
        <p className="text-center text-gray-400 mb-8">Assistant Enseignant-Chercheur • 4 mois • 2025</p>
        
        <div className="text-center mb-12">
          <a 
            href="/experiences/mines/Rapport de stage Fabien PIERETTI A4_compressed-1.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-white font-semibold"
          >
            📄 Télécharger le rapport de stage complet
          </a>
        </div>

        <div className="space-y-8 text-gray-300">
          {/* Introduction */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white">Mission Principale</h2>
            <p className="leading-relaxed">
              Stage d'accompagnement de doctorants et post-doctorants dans leurs travaux de recherche en bioélectronique. 
              Mon rôle consistait à apporter mon expertise en électronique et conception pour compléter leurs compétences 
              en chimie et science des matériaux, en créant des prototypes fonctionnels pour leurs recherches.
            </p>
          </div>

          {/* Projet 1 */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white">Projet 1 : T-shirt Intelligent pour le Suivi de l'Autisme</h2>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-white">Contexte</h3>
              <p className="leading-relaxed">
                Collaboration avec Matias Ignacio Ceballos Hernandez (doctorant chilien) sur l'étude des comportements 
                autistiques et l'évaluation du niveau de stress. L'objectif était de créer un t-shirt portable capable 
                de collecter des données biologiques en temps réel (ECG, mouvement, température, respiration) sans 
                perturber les enfants autistes.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-white">Réalisations Techniques</h3>
              <ul className="list-disc ml-5 space-y-2">
                <li><strong>Système d'acquisition multi-capteurs BLE :</strong> Développement complet d'un système 
                collectant 17 canaux de données simultanés à 10 Hz (2 IMU × 6 axes + 2 températures + timestamp)</li>
                <li><strong>Capteurs IMU (ICM20948) :</strong> Double IMU pour la détection de mouvement via I2C, 
                avec analyse de Fourier pour identifier les patterns (1-2 Hz marche, 2-4 Hz course, ~10 Hz tremblements)</li>
                <li><strong>Température corporelle :</strong> Capteur TMP117 haute précision (±0.1°C) via I2C</li>
                <li><strong>Communication sans fil :</strong> BLE (10-20× plus économe que WiFi/Bluetooth) avec ESP32-C3</li>
                <li><strong>Pipeline de données :</strong> Arduino → BLE → Python/Pandas → CSV avec horodatage</li>
                <li><strong>Filtre ECG :</strong> Conception de filtres passe-bas (150 Hz), passe-haut (0.5 Hz), 
                notch (50 Hz), amplificateur instrumental et circuit Right Leg Drive</li>
                <li><strong>PCB flexible (66mm × 23mm) :</strong> Intégration complète avec batterie Li-ion (1500 mAh, 
                charge ~2.5h), circuits de protection (DW01A + FS8205A), régulateur LDO (MIC5219 3.3V), port USB</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-white">Technologies</h3>
              <p className="leading-relaxed text-sm">
                •<strong>Hardware:</strong> ESP32-C3-WROOM-32, ICM20948, TMP117, TP4057, DW01A, FS8205A, MIC5219 • 
                <strong>Software:</strong> Arduino IDE, Python, Pandas, KiCad • 
                <strong>Protocoles:</strong> I2C, SPI, BLE
              </p>
            </div>
          </div>

          {/* Projet 2 */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white">Projet 2 : Matrice d'Électrodes EMG Haute Densité</h2>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-white">Contexte</h3>
              <p className="leading-relaxed">
                Collaboration avec Wei-Ting Ting (post-doctorante taïwanaise) dans le cadre d'un contrat avec l'Université 
                de Nice. Création d'une matrice d'électrodes flexible haute densité pour l'électromyographie (EMG) du bras, 
                comme alternative au HD2240520 de Novobioelectronica.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-white">Spécifications & Réalisations</h3>
              <ul className="list-disc ml-5 space-y-2">
                <li><strong>Matrice 13×12 électrodes</strong> avec espacement de 8mm (initialement 29×13, ajusté aux 
                contraintes de photolithographie max 10.5cm × 10.5cm)</li>
                <li><strong>Conception Klayout :</strong> Design sub-10 microns de précision avec tracés de 200 µm de 
                largeur et 250 µm d'espacement</li>
                <li><strong>PCB connecteur rigide (KiCad) :</strong> Format HD04MM1606 avec 96 électrodes, 78% d'utilisation 
                des pads, double face symétrique</li>
                <li><strong>Impédance ciblée :</strong> 10-200,000 Ohms, plage de fréquence EMG 20-500 Hz (filtre notch 50 Hz)</li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-white">Fabrication en Salle Blanche</h3>
              <p className="text-sm leading-relaxed mb-2">
                Processus complet de nanofabrication réalisé en salles blanches ISO Classe 100/1000/10000 :
              </p>
              <ol className="list-decimal ml-5 space-y-1 text-sm">
                <li>Dépôt de Parylène (5 µm) sur substrat de verre</li>
                <li>Spin coating de photorésine SP1813 à 2500 RPM</li>
                <li>Recuit doux à 115°C, exposition UV 365 nm</li>
                <li>Évaporation métallique : 5 nm chrome + 120 nm or (0.8g utilisé)</li>
                <li>Lift-off à l'acétone</li>
                <li>Encapsulation Parylène (5 µm supplémentaire)</li>
                <li>Seconde photolithographie (masque négatif, UV 405 nm)</li>
                <li>Gravure plasma RIE à l'oxygène pour ouverture des fenêtres</li>
                <li>Dépôt PEDOT:PSS par spin coating ou électropolymérisation (+0.6V)</li>
                <li>Libération mécanique avec couche sacrificielle</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-white">Technologies</h3>
              <p className="leading-relaxed text-sm">
                <strong>Logiciels:</strong> Klayout, KiCad • 
                <strong>Procédés:</strong> Photolithographie, évaporation d'or, gravure plasma RIE, spin coating, 
                dépôt Parylène, électropolymérisation PEDOT:PSS • 
                <strong>Caractérisation prévue:</strong> Impédancemétrie (1 kHz), voltampérométrie cyclique, 
                mesure de bruit, profilométrie
              </p>
            </div>
          </div>

          {/* Compétences & Résultats */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white">Compétences Développées</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-semibold text-white mb-2">Électronique & Design</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Conception PCB flexible et rigide</li>
                  <li>Intégration de capteurs (I2C, SPI)</li>
                  <li>Gestion d'énergie (Li-ion, protection)</li>
                  <li>Communication sans fil BLE</li>
                  <li>Filtrage de signaux biomédicaux</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Nanofabrication</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Photolithographie (précision sub-10µm)</li>
                  <li>Évaporation métallique (or, chrome)</li>
                  <li>Gravure plasma RIE</li>
                  <li>Dépôt de polymères (Parylène, PEDOT:PSS)</li>
                  <li>Travail en salle blanche ISO 100/1000</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Programmation & Analyse</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Arduino/ESP32 (acquisition temps réel)</li>
                  <li>Python (Pandas, traitement de signaux)</li>
                  <li>Analyse de Fourier</li>
                  <li>Pipeline de données BLE</li>
                  <li>Logging et visualisation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Recherche & Collaboration</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Gestion de projet autonome</li>
                  <li>Collaboration interdisciplinaire</li>
                  <li>Travail en équipe internationale</li>
                  <li>Communication technique en anglais</li>
                  <li>Documentation scientifique</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Impact */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white">Impact & Perspectives</h2>
            <p className="leading-relaxed">
              Ce stage m'a permis de découvrir la bioélectronique au-delà des organes artificiels et du monitoring 
              basique. J'ai pu comprendre la différence entre technologies invasives et non-invasives, et me familiariser 
              avec les parcours de recherche (doctorat, post-doctorat). Cette expérience a confirmé mon intérêt pour 
              poursuivre des études doctorales en génie biomédical, potentiellement à l'international, en combinant 
              électronique, matériaux et applications médicales.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
