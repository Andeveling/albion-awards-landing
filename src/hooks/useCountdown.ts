import { parse, tzDate } from "@formkit/tempo";
import { useEffect, useState } from "react";
import { LAUNCH_DATE, TIMEZONE } from "../config/constants";
import type { TimeLeft } from "../types/countdown";

/**
 * Custom hook for managing countdown timer
 * @returns Countdown state with time left and expired status
 */
export function useCountdown() {
	const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
	const [isExpired, setIsExpired] = useState(false);

	useEffect(() => {
		// Parse target date in Bogotá timezone
		const targetDate = parse(LAUNCH_DATE, "YYYY-MM-DDTHH:mm:ssZ", TIMEZONE);

		const calculateTimeLeft = (): TimeLeft | null => {
			const now = tzDate(new Date(), TIMEZONE);
			const diff = Math.floor((targetDate.getTime() - now.getTime()) / 1000);

			// If countdown has expired
			if (diff <= 0) {
				setIsExpired(true);
				return {
					days: 0,
					hours: 0,
					minutes: 0,
					seconds: 0,
				};
			}

			// Calculate days, hours, minutes, seconds
			const days = Math.floor(diff / 86400); // 86400 seconds in a day
			const hours = Math.floor((diff % 86400) / 3600); // 3600 seconds in an hour
			const minutes = Math.floor((diff % 3600) / 60); // 60 seconds in a minute
			const seconds = Math.floor(diff % 60);

			return {
				days,
				hours,
				minutes,
				seconds,
			};
		};

		// Initial calculation
		setTimeLeft(calculateTimeLeft());

		// Update every second
		const interval = setInterval(() => {
			const newTimeLeft = calculateTimeLeft();
			setTimeLeft(newTimeLeft);

			// Clear interval when expired
			if (
				newTimeLeft &&
				newTimeLeft.days === 0 &&
				newTimeLeft.hours === 0 &&
				newTimeLeft.minutes === 0 &&
				newTimeLeft.seconds === 0
			) {
				clearInterval(interval);
			}
		}, 1000);

		// Cleanup on unmount
		return () => clearInterval(interval);
	}, []);

	return { timeLeft, isExpired, targetDate: LAUNCH_DATE };
}
