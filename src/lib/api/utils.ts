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
    const value = result[field];
    
    if (!value) continue;
    
    if (Array.isArray(value)) {
      result[field] = value.map((img: string) => processImageUrl(img)) as any;
    } else if (typeof value === 'string') {
      result[field] = processImageUrl(value) as any;
    }
  }
  
  return result;
};
