'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Settings {
  company_name: string;
  company_email: string;
  company_phone: string;
  company_address: string;
  company_description: string;
  logo_type: 'image' | 'text';
  logo_image: string;
  favicon: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  instagram_url: string;
}

interface SettingsContextType {
  settings: Settings;
  loading: boolean;
}

const defaultSettings: Settings = {
  company_name: 'DigitalOrbit',
  company_email: 'support@digitalorbit.org',
  company_phone: '+92 311 1588908',
  company_address: '',
  company_description: 'Building innovative digital solutions for your business.',
  logo_type: 'text',
  logo_image: '',
  favicon: '',
  facebook_url: '#',
  twitter_url: '#',
  linkedin_url: '#',
  instagram_url: '#'
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  loading: true
});

export function useSettings() {
  return useContext(SettingsContext);
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(prev => ({ ...prev, ...data }));
      })
      .catch(err => console.error('Failed to fetch settings:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}
