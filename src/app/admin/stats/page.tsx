'use client';

import { useState, useEffect } from 'react';
import { showToast } from '@/components/CustomToaster';

interface Stat {
  id: string;
  section: string;
  label: string;
  value: string;
  icon: string;
  displayOrder: number;
  status: string;
}

const sections = [
  { value: 'hero', label: 'Hero Section' },
  { value: 'about', label: 'About Section' },
  { value: 'services', label: 'Services Section' },
  { value: 'why_us', label: 'Why Us Section' },
  { value: 'contact', label: 'Contact Section' },
  { value: 'portfolio_details', label: 'Portfolio Details' },
  { value: 'service_details', label: 'Service Details' },
];

const iconOptions = [
  { value: 'bi-briefcase', label: 'Briefcase' },
  { value: 'bi-heart', label: 'Heart' },
  { value: 'bi-calendar', label: 'Calendar' },
  { value: 'bi-people', label: 'People' },
  { value: 'bi-award', label: 'Award' },
  { value: 'bi-check-circle', label: 'Check Circle' },
  { value: 'bi-emoji-smile', label: 'Smile' },
  { value: 'bi-graph-up', label: 'Graph Up' },
  { value: 'bi-megaphone', label: 'Megaphone' },
  { value: 'bi-graph-up-arrow', label: 'Growth' },
  { value: 'bi-headset', label: 'Headset' },
  { value: 'bi-folder', label: 'Folder' },
  { value: 'bi-server', label: 'Server' },
  { value: 'bi-person', label: 'Person' },
  { value: 'bi-star', label: 'Star' },
  { value: 'bi-lightning', label: 'Lightning' },
];

export default function StatsPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState('hero');
  const [showModal, setShowModal] = useState(false);
  const [editingStat, setEditingStat] = useState<Stat | null>(null);
  const [formData, setFormData] = useState<Partial<Stat>>({
    label: '',
    value: '',
    icon: 'bi-briefcase',
    displayOrder: 0,
    status: 'published'
  });

  useEffect(() => {
    fetchStats();
  }, [selectedSection]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/stats?section=${selectedSection}`);
      const data = await res.json();
      setStats(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (stat?: Stat) => {
    if (stat) {
      setEditingStat(stat);
      setFormData(stat);
    } else {
      setEditingStat(null);
      setFormData({
        label: '',
        value: '',
        icon: 'bi-briefcase',
        displayOrder: stats.length + 1,
        status: 'published'
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingStat(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const payload = {
        ...formData,
        section: selectedSection
      };
      
      if (editingStat) {
        await fetch(`/api/stats/${editingStat.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch('/api/stats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      closeModal();
      fetchStats();
      showToast.success(editingStat ? 'Stat updated successfully!' : 'Stat created successfully!');
    } catch (error) {
      console.error('Failed to save stat:', error);
      showToast.error('Failed to save stat. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this stat?')) return;
    
    try {
      await fetch(`/api/stats/${id}`, { method: 'DELETE' });
      fetchStats();
      showToast.success('Stat deleted successfully!');
    } catch (error) {
      console.error('Failed to delete stat:', error);
      showToast.error('Failed to delete stat. Please try again.');
    }
  };

  const getSectionLabel = (section: string) => {
    return sections.find(s => s.value === section)?.label || section;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Stats Management</h1>
        <p className="text-gray-600">Manage statistics displayed across your website</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Section
        </label>
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          {sections.map(section => (
            <option key={section.value} value={section.value}>
              {section.label}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            {getSectionLabel(selectedSection)} Stats ({stats.length})
          </h2>
          <button 
            onClick={() => openModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <i className="bi bi-plus"></i>
            Add Stat
          </button>
        </div>
        
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading stats...</p>
          </div>
        ) : stats.length === 0 ? (
          <div className="p-12 text-center">
            <i className="bi bi-bar-chart text-5xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No stats yet</h3>
            <p className="text-gray-500 mb-4">Add stats for this section</p>
            <button 
              onClick={() => openModal()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Stat
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Icon</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Label</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stats.sort((a, b) => a.displayOrder - b.displayOrder).map((stat) => (
                  <tr key={stat.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{stat.displayOrder}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className={`bi ${stat.icon} text-blue-600 text-lg`}></i>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{stat.label}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 bg-green-100 text-green-800 rounded text-sm font-medium">
                        {stat.value}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        stat.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {stat.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => openModal(stat)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          onClick={() => handleDelete(stat.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto" onClick={closeModal}>
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={closeModal}></div>
            <div 
              className="relative bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto scrollbar-light"
              onClick={e => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingStat ? 'Edit Stat' : 'Add New Stat'}
                </h3>
                <button 
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <i className="bi bi-x-lg text-xl"></i>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Label *</label>
                    <input
                      type="text"
                      value={formData.label}
                      onChange={e => setFormData({ ...formData, label: e.target.value })}
                      required
                      placeholder="e.g., Projects Delivered"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Value *</label>
                    <input
                      type="text"
                      value={formData.value}
                      onChange={e => setFormData({ ...formData, value: e.target.value })}
                      required
                      placeholder="e.g., 150+ or 98%"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                    <select
                      value={formData.icon}
                      onChange={e => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      {iconOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className={`bi ${formData.icon} text-blue-600 text-lg`}></i>
                      </div>
                      <span className="text-xs text-gray-500">Preview</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                    <input
                      type="number"
                      value={formData.displayOrder}
                      onChange={e => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button 
                    type="button" 
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingStat ? 'Update Stat' : 'Add Stat'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
