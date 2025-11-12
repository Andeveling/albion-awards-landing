/**
 * Email validation utilities
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates an email address format
 * @param email - The email address to validate
 * @returns true if the email is valid, false otherwise
 */
export function validateEmail(email: string): boolean {
	if (!email || typeof email !== "string") {
		return false;
	}

	const trimmedEmail = email.trim();

	if (trimmedEmail.length === 0 || trimmedEmail.length > 255) {
		return false;
	}

	return EMAIL_REGEX.test(trimmedEmail);
}

/**
 * Sanitizes an email address by trimming whitespace and converting to lowercase
 * @param email - The email address to sanitize
 * @returns The sanitized email address
 */
export function sanitizeEmail(email: string): string {
	return email.trim().toLowerCase();
}
