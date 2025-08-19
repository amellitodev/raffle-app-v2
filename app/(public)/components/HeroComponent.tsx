
export default function HeroComponent() {
	return (
		<>
			<div className="hero max-w-5xl mx-auto">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="w-full md:w-1/2 flex justify-center">
						<img
							src="./rifaHero.png"
							alt="Rifas Don Carlos Hero"
							className="w-full md:max-w-sm rounded-lg shadow-2xl "
						/>
						</div>
					<div>
						<div className="w-2/3">

						<h1 className="text-5xl font-bold">Rifas Don Carlos!</h1>
						<p className="py-6 ">
							Esta es tu gran oportunidad ¡Participa en las emocionantes rifas de Don
							Carlos y gana increíbles premios! tenemos rifas semanales con premios de
							hasta $10,000.
						</p>
                        <button className="btn btn-primary rounded-md">Participa ya!</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
