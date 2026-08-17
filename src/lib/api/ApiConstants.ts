const isDev = process.env.NODE_ENV === 'development';

export const API_BASE_URL = isDev 
  ? (process.env.NEXT_PUBLIC_API_URL_DEV || 'http://localhost:8000/api/v1')
  : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const CONTENT_URL = isDev 
  ? (process.env.NEXT_PUBLIC_CONTENT_URL_DEV || 'http://localhost:8000')
  : process.env.NEXT_PUBLIC_CONTENT_URL || 'http://localhost:8000';