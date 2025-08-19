import { CalendarIcon } from "./icons/icons";

type Props = {
    date: string;
}

export default function  DateDisplay ({date}: Props) {
        	// Format the raffle date
	const formattedDate = new Date(date).toLocaleString("es-ES", {
		dateStyle: "long",
		timeStyle: "short",
		hour12: true,
	});

      return (
        <>
          {/* // Format the raffle date */}
			<span className="flex gap-2 align-middle items-center text-sm">
				<CalendarIcon className="size-4 text-yellow-400 stroke-2" /> {formattedDate}
			</span>
        </>
      );
    };
    