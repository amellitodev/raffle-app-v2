import { CalendarIcon } from "./icons/icons";

type Props = {
    date: string;
	className?: string;
}

export default function  DateDisplay ({date, className}: Props) {
        	// Format the raffle date
	const formattedDate = new Date(date).toLocaleString("es-ES", {
		dateStyle: "long",
		// timeStyle: "short",
		hour12: true,
	});

      return (
        <>
          {/* // Format the raffle date */}
			<span className={`flex gap-2 align-middle items-center  ${className}`}>
				<CalendarIcon className="size-4 text-slate-950 stroke-2" /> {formattedDate}
			</span>
        </>
      );
    };
    