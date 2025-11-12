/**
 * Request payload for email submission
 */
export interface EmailSubmissionRequest {
  email: string
}

/**
 * Response from email submission API
 */
export interface EmailSubmissionResponse {
  success: boolean
  message: string
  error_code?: 'INVALID_EMAIL' | 'EMAIL_EXISTS' | 'MISSING_FIELD' | 'RATE_LIMIT_EXCEEDED' | 'INTERNAL_ERROR'
}

/**
 * State for email form
 */
export interface EmailFormState {
  email: string
  isSubmitting: boolean
  isSubmitted: boolean
  error: string | null
}
