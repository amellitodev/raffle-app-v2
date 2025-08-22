"use client";

import { useEffect, useState } from "react";

interface PaymentMethod {
	type: string;
	entityName: string;
	accountNumber: string;
	phoneNumber: string;
	email: string;
	sellerId: string;
}

const paymentTypes = [
	{ value: "banco", label: "Banco" },
	{ value: "pago_movil", label: "Pago movil" },
	{ value: "zelle", label: "Zelle" },
	{ value: "crypto", label: "Crypto" },
];
const emptyMethod: PaymentMethod = {
	type: "banco",
	entityName: "",
	accountNumber: "",
	phoneNumber: "",
	email: "",
	sellerId: "",
};
export default function PaymentMethodInput() {
	const [paymentMethod, setPaymentMethod] = useState([{ ...emptyMethod }]);
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("banco");

	// Function to add a new payment method
	const addMethod = () => {
		if (paymentMethod.length >= 4) {
			alert("No puedes agregar más de 4 métodos de pago");
			return;
		}
		setPaymentMethod([...paymentMethod, { ...emptyMethod }]);
	};

	const deleteMethod = (index: number) => {
		if (paymentMethod.length <= 1) {
			alert("Debes tener al menos un método de pago");
			return;
		}
		const updatedMethods = paymentMethod.filter((_, i) => i !== index);
		setPaymentMethod(updatedMethods);
	};

	const handleChange = (index: number, field: keyof PaymentMethod, value: string) => {
		const updatedMethods = [...paymentMethod];
		updatedMethods[index][field] = value;
		setPaymentMethod(updatedMethods);
	};

	useEffect(() => {
		console.log("🚀 ~ PaymentMethodInput ~ paymentMethod:", paymentMethod);
		console.log("🚀 ~ PaymentMethodInput ~ selectedPaymentMethod:", selectedPaymentMethod);
	}, [paymentMethod, selectedPaymentMethod]);

	return (
		<>
			<div className="">
				<input
					className="input w-full"
					type="text"
					name="paymentMethod"
					placeholder="Método de pago"
					value={JSON.stringify(paymentMethod)}
					hidden
					readOnly
				/>
				<div className="flex justify-between py-2">

				<p>Método de pago: </p>
				<button
					type="button"
					className="btn btn-success rounded-md w-1/4"
					onClick={addMethod}
					>
					Agregar método de pago
				</button>
					</div>

				{paymentMethod.map((method, index) => {
					return (
						<div className="flex flex-col gap-4 mb-2" key={index}>
							<select
								className="select cursor-pointer w-full"
								name="paymentMethod"
								id="paymentMethod"
								onChange={(e) => setSelectedPaymentMethod(e.target.value)}
							>
								{paymentTypes.map((type) => (
									<option key={type.value} value={type.value}>
										{type.label}
									</option>
								))}
							</select>

							{/* método de pago es banco */}
							{selectedPaymentMethod === "banco" && (
								<>
									<input
										className="input w-full"
										type="text"
										name={`bankName_${index}`}
										placeholder="Nombre del banco"
										id={`bankName_${index}`}
										onChange={(e) =>
											handleChange(index, "entityName", e.target.value)
										}
									/>
									<input
										className="input w-full"
										type="text"
										name={`accountNumber_${index}`}
										id={`accountNumber_${index}`}
										placeholder="Número de cuenta"
										onChange={(e) =>
											handleChange(index, "accountNumber", e.target.value)
										}
									/>
									<input
										className="input w-full"
										type="text"
										name={`sellerId_${index}`}
										id={`sellerId_${index}`}
										placeholder="Número de cédula"
										onChange={(e) =>
											handleChange(index, "sellerId", e.target.value)
										}
									/>
									<input
										className="input w-full"
										type="text"
										name={`phoneNumber_${index}`}
										id={`phoneNumber_${index}`}
										placeholder="Número de teléfono"
										onChange={(e) =>
											handleChange(index, "phoneNumber", e.target.value)
										}
									/>
									<input
										className="input w-full"
										type="text"
										name={`email_${index}`}
										id={`email_${index}`}
										placeholder="Correo electrónico"
										onChange={(e) =>
											handleChange(index, "email", e.target.value)
										}
									/>
								</>
							)}

							{/* Método de pago es pago movil */}
							{selectedPaymentMethod === "pago_movil" && (
								<>
									<input
										className="input w-full"
										type="text"
										name={`bankName_${index}`}
										placeholder="Nombre del banco"
										id={`bankName_${index}`}
										onChange={(e) =>
											handleChange(index, "entityName", e.target.value)
										}
									/>

									<input
										className="input w-full"
										type="text"
										name={`sellerId_${index}`}
										id={`sellerId_${index}`}
										placeholder="Número de cédula"
										onChange={(e) =>
											handleChange(index, "sellerId", e.target.value)
										}
									/>
									<input
										className="input w-full"
										type="text"
										name={`phoneNumber_${index}`}
										id={`phoneNumber_${index}`}
										placeholder="Número de teléfono"
										onChange={(e) =>
											handleChange(index, "phoneNumber", e.target.value)
										}
									/>
								</>
							)}

							{/* Métodos de pago para zelle o crypto */}
							{(selectedPaymentMethod === "zelle" ||
								selectedPaymentMethod === "crypto") && (
								<input
									className="input w-full"
									type="text"
									name={`email_${index}`}
									id={`email_${index}`}
									placeholder="Correo electrónico"
									onChange={(e) => handleChange(index, "email", e.target.value)}
								/>
							)}
							<div className="flex justify-end">

							<button
								type="button"
								className="btn btn-error btn-soft w-1/4 rounded-md"
								onClick={() => deleteMethod(index)}
								>
								Eliminar
							</button>
								</div>
						</div>
					);
				})}
			</div>
		</>
	);
}
