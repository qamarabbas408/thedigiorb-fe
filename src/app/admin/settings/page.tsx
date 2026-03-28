'use client';

import { useState, useEffect, useRef } from 'react';
import { showToast } from '@/components/CustomToaster';

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

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    company_name: '',
    company_email: '',
    company_phone: '',
    company_address: '',
    company_description: '',
    logo_type: 'text',
    logo_image: '',
    favicon: '',
    facebook_url: '',
    twitter_url: '',
    linkedin_url: '',
    instagram_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setSettings(prev => ({ 
        ...prev, 
        ...data,
        logo_type: data.logo_type || 'text',
        logo_image: data.logo_image || '',
        favicon: data.favicon || ''
      }));
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: keyof Settings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleLogoTypeChange = (type: 'image' | 'text') => {
    setSettings(prev => ({ ...prev, logo_type: type }));
  };

  const handleImageUpload = async (file: File, field: 'logo_image' | 'favicon') => {
    setUploading(field);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      const data = await res.json();
      
      if (res.ok && data.url) {
        handleChange(field, data.url);
        showToast.success('Image uploaded successfully!');
      } else {
        showToast.error(data.error || 'Failed to upload image');
      }
    } catch (error) {
      showToast.error('Failed to upload image');
    } finally {
      setUploading(null);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file, 'logo_image');
    }
  };

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file, 'favicon');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (res.ok) {
        showToast.success('Settings saved successfully!');
      } else {
        showToast.error('Failed to save settings');
      }
    } catch (error) {
      showToast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-600">Manage your site information</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Logo & Branding Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Logo & Branding</h2>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Logo Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Logo Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="logo_type"
                    checked={settings.logo_type === 'text'}
                    onChange={() => handleLogoTypeChange('text')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Text Logo</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="logo_type"
                    checked={settings.logo_type === 'image'}
                    onChange={() => handleLogoTypeChange('image')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Image Logo</span>
                </label>
              </div>
            </div>

            {/* Image Logo Upload */}
            {settings.logo_type === 'image' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Logo (PNG, SVG, JPG)
                </label>
                <div className="flex items-start gap-4">
                  <div className="w-48 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                    {settings.logo_image ? (
                      <img src={settings.logo_image} alt="Logo" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <span className="text-gray-400 text-sm">No logo uploaded</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/png,image/svg+xml,image/jpeg,image/webp"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      disabled={uploading === 'logo_image'}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {uploading === 'logo_image' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-upload"></i>
                          {settings.logo_image ? 'Replace Logo' : 'Upload Logo'}
                        </>
                      )}
                    </button>
                    <p className="text-xs text-gray-500 mt-2">Recommended: 200x60px for best results</p>
                  </div>
                </div>
              </div>
            )}

            {/* Favicon Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Favicon (Browser Icon)
              </label>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                  {settings.favicon ? (
                    <img src={settings.favicon} alt="Favicon" className="w-full h-full object-contain" />
                  ) : (
                    <i className="bi bi-globe text-gray-400 text-2xl"></i>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    ref={faviconInputRef}
                    type="file"
                    accept="image/png,image/x-icon,image/svg+xml"
                    onChange={handleFaviconChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => faviconInputRef.current?.click()}
                    disabled={uploading === 'favicon'}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {uploading === 'favicon' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-upload"></i>
                        {settings.favicon ? 'Replace Favicon' : 'Upload Favicon'}
                      </>
                    )}
                  </button>
                  <p className="text-xs text-gray-500 mt-2">Recommended: 32x32px or 48x48px PNG</p>
                </div>
              </div>
            </div>

            {/* Logo Preview */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
              <div className="flex items-center gap-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  {settings.logo_type === 'image' && settings.logo_image ? (
                    <img src={settings.logo_image} alt="Logo Preview" className="h-10 w-auto" />
                  ) : (
                    <span className="text-2xl font-bold text-gray-800">{settings.company_name || 'Company Name'}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {settings.favicon ? (
                    <img src={settings.favicon} alt="Favicon Preview" className="w-6 h-6" />
                  ) : (
                    <div className="w-6 h-6 bg-blue-600 rounded"></div>
                  )}
                  <span className="text-sm text-gray-500">Browser Tab</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Information Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Company Information</h2>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={settings.company_name}
                  onChange={(e) => handleChange('company_name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={settings.company_email}
                  onChange={(e) => handleChange('company_email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={settings.company_phone}
                  onChange={(e) => handleChange('company_phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={settings.company_address}
                  onChange={(e) => handleChange('company_address', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={settings.company_description}
                onChange={(e) => handleChange('company_description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Social Media Links</h2>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                <input
                  type="url"
                  value={settings.facebook_url}
                  onChange={(e) => handleChange('facebook_url', e.target.value)}
                  placeholder="https://facebook.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Twitter/X URL</label>
                <input
                  type="url"
                  value={settings.twitter_url}
                  onChange={(e) => handleChange('twitter_url', e.target.value)}
                  placeholder="https://twitter.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  value={settings.linkedin_url}
                  onChange={(e) => handleChange('linkedin_url', e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                <input
                  type="url"
                  value={settings.instagram_url}
                  onChange={(e) => handleChange('instagram_url', e.target.value)}
                  placeholder="https://instagram.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <i className="bi bi-check-lg"></i>
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
