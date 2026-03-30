import { CONTENT_URL } from './ApiConstants';

export const processImageUrl = (imagePath: string | undefined | null): string => {
  if (!imagePath) return '';
  
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  return `${CONTENT_URL}${imagePath}`;
};

export const processImageUrls = <T extends Record<string, any>>(
  item: T,
  imageFields: (keyof T)[]
): T => {
  const result = { ...item };
  
  for (const field of imageFields) {
    if (result[field] && typeof result[field] === 'string') {
      result[field] = processImageUrl(result[field]) as any;
    }
  }
  
  return result;
};
