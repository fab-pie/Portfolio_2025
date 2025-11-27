export default function DefinspacePage() {
  return (
    <section className="pt-32">
      <div className="max-w-3xl mx-auto text-center relative">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Definspace</h1>

        <p className="text-gray-300 mb-4">
          Definspace — Hackathon de 24 heures pour développer une solution de surveillance optronique de l'orbite basse
          depuis l'espace, avec une constellation de nanosatellites équipé de caméra qui envoie ces images à un satellite
          principale en orbite géostationnaire. Puis le satellite géostationnaire l'envoie aux stations aux sols afin de 
          traiter les images, puis de triangulé à l'aide des différents satellites pour obtenir une vision 3D de l'espace.
          Ensuite, on augmente le nombre de frame par seconde par frame differencing, puis on utilse des algrithmes de 
          détections et tracking d'images tels que des CNN ou DQN afin d'observer une cible en particulier. J'ai travaillé 
          avec 4 autres étudiants de l'association Proteus, association de défense de l'ESILV. Hugo Hajdarevic, Guillain Le
          Cocguen, Nathan Truong et Fawzi Elghazoui. Nous avions était qualifié pour les demi-finales nationales, ayant lieu
          le 28/11/2025.
          <br /><br /><br /><br />
        </p>
        {/* simple texte 'Plus de détails' en bas à droite */}
        <div className="absolute bottom-4 right-2 text-sm text-gray-400">(Plus de détails disponibles sur demande)</div>
      </div>
    </section>
  );
}
