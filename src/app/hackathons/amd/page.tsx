export default function AmdPage() {
	return (
		<section className="pt-32">
			<div className="max-w-3xl mx-auto text-center relative">
				<h1 className="text-3xl md:text-4xl font-bold mb-6">AMD Robotics Hackathon — Paris</h1>

				<p className="text-gray-300 mb-4">
					J'ai participé au <a className="text-blue-400 underline hover:text-blue-300" href="https://amdroboticshackathon.datamonsters.com/" target="_blank" rel="noreferrer">AMD Robotics Hackathon</a> à Paris.
					Avec mon équipe (Victor Ranguin, Lucas Jourdet et Léo Guérin), nous avons obtenu la <strong>3ème place</strong>.
				</p>

				<p className="text-gray-300 mb-4">
					Notre projet (dépôt disponible sur <a className="text-blue-400 underline hover:text-blue-300" href="https://github.com/leogue/AMD_Robotics_Hackathon_2025_LeCoup_De_Pouce" target="_blank" rel="noreferrer">GitHub</a>) consiste en un dispositif utilisant le robot de Hugging Face le robot <em>lerobot S101</em> — permettant d'entraîner un robot par téléopération.
					Nous avons développé une solution visant à aider les chirurgiens à obtenir rapidement leurs instruments pendant une opération.
				</p>

				<p className="text-gray-300 mb-6">
					Le dispositif combine la téléopération pour démonstrations/enseignements et des mécanismes d'assistance pour la distribution d'outils chirurgicaux. Ce projet a été développé en 48 heures dans l'esprit du hackathon : prototypage rapide et validation terrain.
					<br /><br /><br /><br />
				</p>

				<div className="mt-6 flex justify-center">
					<a
						href="https://github.com/leogue/AMD_Robotics_Hackathon_2025_LeCoup_De_Pouce"
						target="_blank"
						rel="noreferrer"
						className="px-4 py-2 bg-white text-black rounded-md font-medium"
					>
						Voir le projet sur GitHub
					</a>
				</div>

				<div className="absolute bottom-4 right-2 text-sm text-gray-400">(En cours de rédaction)</div>
			</div>
		</section>
	);
}
