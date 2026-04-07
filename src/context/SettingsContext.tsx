'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSettings } from '@/hooks';

interface Settings {
  company_name: string;
  company_email: string;
  company_phone: string;
  company_address: string;
  company_description: string;
  logo_type: 'image' | 'text';
  logo_image: string;
  logo_text: string;
  favicon: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  instagram_url: string;
  show_phone: boolean;
}

interface SettingsContextType {
  settings: Settings | undefined;
  loading: boolean;
  error: Error | null;
}

const defaultSettings: Settings = {
  company_name: 'DigitalOrbit',
  company_email: 'support@thedigiorb.com',
  company_phone: '+92 311 1588908',
  company_address: '',
  company_description: 'Building innovative digital solutions for your business.',
  logo_type: 'text',
  logo_image: '',
  logo_text: '',
  favicon: '',
  facebook_url: '#',
  twitter_url: '#',
  linkedin_url: '#',
  instagram_url: '#',
  show_phone: true
};

const parseSettings = (data: any): Settings => {
  return {
    ...defaultSettings,
    ...data,
    show_phone: data?.show_phone === true || data?.show_phone === '1' || data?.show_phone === 1,
  };
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  loading: true,
  error: null
});

export function useSettingsContext() {
  return useContext(SettingsContext);
}

// Keep original export name for backward compatibility
export { useSettingsContext as useSettings };

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, error } = useSettings();
  
  const settings = data ? parseSettings(data) : defaultSettings;
  
  return (
    <SettingsContext.Provider value={{ 
      settings, 
      loading: isLoading,
      error 
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export { defaultSettings };
