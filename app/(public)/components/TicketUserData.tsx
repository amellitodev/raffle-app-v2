export default function TicketUserData() {
	return (
		<>
			<section className="flex flex-col gap-2">
				<div className="flex flex-col gap-1">
					<label className="text-xs" htmlFor="buyerName">
						Tu nombre completo
					</label>
					<input
						className="input rounded-md w-full text-slate-950 bg-slate-200 validator"
						type="text"
						name="buyerName"
						id="buyerName"
						placeholder="Ej: Juan Pérez"
						required
						pattern="^\p{L}[\p{L}0-9\- ]*$"
						minLength={3}
						maxLength={30}
						title="Only letters, numbers or dash"
					/>

					<p className="text-[10px] validator-hint -mt-1">
						Debe contener entre 3 y 30 caracteres
					</p>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-xs" htmlFor="buyerId">
						Tu número de cédula
					</label>
					<input
						className="input rounded-md w-full text-slate-950 bg-slate-200 validator tabular-nums"
						type="text"
						name="buyerId"
						id="buyerId"
						placeholder="Ej: 12345678"
						required
						pattern="[0-9]*"
						minLength={6}
						maxLength={8}
					/>
					<p className="validator-hint -mt-1">Debe tener al menos 6 dígitos</p>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-xs" htmlFor="buyerEmail">
						Tu dirección email
					</label>
					<input
						className="input rounded-md w-full text-slate-950 bg-slate-200 validator"
						type="email"
						name="buyerEmail"
						id="buyerEmail"
						placeholder="Ej: juanperez@gmail.com"
					/>
					<p className="validator-hint -mt-1">Ingrese un email valido</p>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-xs" htmlFor="buyerPhone">
						Tu número de teléfono
					</label>
					<input
						className="input rounded-md w-full text-slate-950 bg-slate-200 validator tabular-nums"
						type="tel"
						name="buyerPhone"
						id="buyerPhone"
						placeholder="Ej: 04123344556"
						required
						pattern="[0-9]*"
						minLength={10}
						maxLength={14}
						title="Debe tener 14 dígitos"
					/>
					<p className="validator-hint -mt-1">Debe tener al menos 10 dígitos</p>
				</div>
			</section>
		</>
	);
}
