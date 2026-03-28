'use client';

import { useState, useEffect } from 'react';
import { showToast } from '@/components/CustomToaster';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  featured: boolean;
  displayOrder: number;
  status: string;
}

const iconOptions = [
  { value: 'bi-lightbulb', label: 'Light Bulb' },
  { value: 'bi-code-slash', label: 'Code' },
  { value: 'bi-phone', label: 'Phone' },
  { value: 'bi-palette', label: 'Palette' },
  { value: 'bi-cart', label: 'Cart' },
  { value: 'bi-cloud', label: 'Cloud' },
  { value: 'bi-megaphone', label: 'Megaphone' },
  { value: 'bi-graph-up-arrow', label: 'Analytics' },
  { value: 'bi-shield-check', label: 'Security' },
  { value: 'bi-speedometer2', label: 'Speed' },
  { value: 'bi-people', label: 'People' },
  { value: 'bi-envelope', label: 'Email' },
  { value: 'bi-gear', label: 'Settings' },
  { value: 'bi-briefcase', label: 'Briefcase' },
  { value: 'bi-rocket', label: 'Rocket' },
  { value: 'bi-award', label: 'Award' },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    description: '',
    icon: 'bi-lightbulb',
    featured: false,
    displayOrder: 0,
    status: 'published'
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData(service);
    } else {
      setEditingService(null);
      setFormData({
        title: '',
        description: '',
        icon: 'bi-lightbulb',
        featured: false,
        displayOrder: services.length + 1,
        status: 'published'
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingService) {
        await fetch(`/api/services/${editingService.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      closeModal();
      fetchServices();
      showToast.success(editingService ? 'Service updated successfully!' : 'Service created successfully!');
    } catch (error) {
      console.error('Failed to save service:', error);
      showToast.error('Failed to save service. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
      await fetch(`/api/services/${id}`, { method: 'DELETE' });
      fetchServices();
      showToast.success('Service deleted successfully!');
    } catch (error) {
      console.error('Failed to delete service:', error);
      showToast.error('Failed to delete service. Please try again.');
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
        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
        <p className="text-gray-600">Manage your service offerings</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">All Services ({services.length})</h2>
          <button 
            onClick={() => openModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <i className="bi bi-plus"></i>
            Add Service
          </button>
        </div>
        
        {services.length === 0 ? (
          <div className="p-12 text-center">
            <i className="bi bi-gear text-5xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No services yet</h3>
            <p className="text-gray-500 mb-4">Add your first service to showcase your offerings</p>
            <button 
              onClick={() => openModal()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Service
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Icon</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className={`bi ${service.icon} text-blue-600 text-lg`}></i>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{service.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {service.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{service.displayOrder}</span>
                    </td>
                    <td className="px-6 py-4">
                      {service.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                          <i className="bi bi-star-fill"></i> Featured
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        service.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => openModal(service)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          onClick={() => handleDelete(service.id)}
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
              className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-light"
              onClick={e => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h3>
                <button 
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <i className="bi bi-x-lg text-xl"></i>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      required
                      placeholder="e.g., Web Development"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the service..."
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
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
                </div>

                <div className="mt-4 flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Featured Service</span>
                  </label>
                  
                  <div className="flex-1">
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
                    {editingService ? 'Update Service' : 'Add Service'}
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
