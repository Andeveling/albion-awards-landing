import { format } from "@formkit/tempo";
import type { TimeLeft } from "../types/countdown";

/**
 * Formatea un número a dos dígitos (agrega cero a la izquierda si es necesario)
 */
export function padZero(num: number): string {
	return num.toString().padStart(2, "0");
}

/**
 * Formatea el objeto timeLeft para mostrarlo
 */
export function formatTimeLeft(timeLeft: TimeLeft) {
	return {
		days: timeLeft.days.toString(),
		hours: padZero(timeLeft.hours),
		minutes: padZero(timeLeft.minutes),
		seconds: padZero(timeLeft.seconds),
	};
}

/**
 * Indica si se deben mostrar días en el countdown
 */
export function shouldShowDays(timeLeft: TimeLeft): boolean {
	return timeLeft.days > 0;
}

/**
 * Formatea una fecha usando Tempo en español y zona horaria Bogotá
 * Usa FormatOptions con estilos de fecha/hora para evitar problemas con tokens
 */
export function formatDate(date: Date): string {
	return format({
		date,
		format: { date: "long", time: "medium" },
		locale: "es-CO",
		tz: "America/Bogota",
	});
}
