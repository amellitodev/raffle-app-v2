
export default function HeroComponent() {
	return (
		<>
			<div className="hero min-h-96">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<img
						src="./rifaHero.png"
						className="max-w-sm rounded-lg shadow-2xl "
					/>
					<div>
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
		</>
	);
}
