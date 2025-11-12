import { API_BASE_URL } from "../config/constants";

/**
 * API client configuration
 */
export interface ApiConfig {
	baseURL: string;
	headers?: Record<string, string>;
}

/**
 * Default API configuration
 */
const defaultConfig: ApiConfig = {
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
};

/**
 * Generic API error class
 */
export class ApiError extends Error {
	statusCode?: number;
	errorCode?: string;

	constructor(message: string, statusCode?: number, errorCode?: string) {
		super(message);
		this.name = "ApiError";
		this.statusCode = statusCode;
		this.errorCode = errorCode;
	}
}

/**
 * Makes a fetch request with error handling
 * @param endpoint - The API endpoint (relative to base URL)
 * @param options - Fetch options
 * @returns The parsed JSON response
 */
export async function apiFetch<T>(
	endpoint: string,
	options: RequestInit = {},
): Promise<T> {
	const url = `${defaultConfig.baseURL}${endpoint}`;

	const config: RequestInit = {
		...options,
		headers: {
			...defaultConfig.headers,
			...options.headers,
		},
	};

	try {
		const response = await fetch(url, config);

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new ApiError(
				errorData.message || `HTTP ${response.status}: ${response.statusText}`,
				response.status,
				errorData.error_code,
			);
		}

		return await response.json();
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}

		// Network or parsing error
		throw new ApiError(
			error instanceof Error ? error.message : "An unknown error occurred",
			undefined,
			"NETWORK_ERROR",
		);
	}
}

/**
 * Makes a POST request
 * @param endpoint - The API endpoint
 * @param data - The data to send
 * @returns The parsed JSON response
 */
export async function apiPost<T, D = unknown>(
	endpoint: string,
	data: D,
): Promise<T> {
	return apiFetch<T>(endpoint, {
		method: "POST",
		body: JSON.stringify(data),
	});
}

/**
 * Makes a GET request
 * @param endpoint - The API endpoint
 * @returns The parsed JSON response
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
	return apiFetch<T>(endpoint, {
		method: "GET",
	});
}
