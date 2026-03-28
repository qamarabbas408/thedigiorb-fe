'use client';

import { useState, useEffect } from 'react';
import { showToast } from '@/components/CustomToaster';

interface Category {
  id: string;
  name: string;
  slug: string;
  filterClass: string;
  icon: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
    icon: 'bi-folder'
  });

  const iconOptions = [
    'bi-globe', 'bi-phone', 'bi-palette', 'bi-ui-checks',
    'bi-laptop', 'bi-tablet', 'bi-code-slash', 'bi-pie-chart',
    'bi-cart', 'bi-building', 'bi-briefcase', 'bi-camera',
    'bi-music-note', 'bi-film', 'bi-gamepad', 'bi-heart'
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/portfolio/categories');
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData(category);
    } else {
      setEditingCategory(null);
      setFormData({ name: '', icon: 'bi-folder' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingCategory) {
        await fetch('/api/portfolio/categories', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: editingCategory.id })
        });
      } else {
        await fetch('/api/portfolio/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      closeModal();
      fetchCategories();
      showToast.success(editingCategory ? 'Category updated successfully!' : 'Category created successfully!');
    } catch (error) {
      console.error('Failed to save category:', error);
      showToast.error('Failed to save category. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    try {
      await fetch(`/api/portfolio/categories?id=${id}`, { method: 'DELETE' });
      fetchCategories();
      showToast.success('Category deleted successfully!');
    } catch (error) {
      console.error('Failed to delete category:', error);
      showToast.error('Failed to delete category. Please try again.');
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
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <p className="text-gray-600">Manage project categories</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">All Categories ({categories.length})</h2>
          <button 
            onClick={() => openModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <i className="bi bi-plus"></i>
            Add Category
          </button>
        </div>
        
        {categories.length === 0 ? (
          <div className="p-12 text-center">
            <i className="bi bi-tags text-5xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No categories yet</h3>
            <p className="text-gray-500 mb-4">Create categories to organize your projects</p>
            <button 
              onClick={() => openModal()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Category
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Icon</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Filter Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <i className={`bi ${category.icon} text-2xl text-blue-600`}></i>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{category.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <code className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">{category.slug}</code>
                    </td>
                    <td className="px-6 py-4">
                      <code className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">{category.filterClass}</code>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => openModal(category)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          onClick={() => handleDelete(category.id)}
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
              <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h3>
                <button 
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <i className="bi bi-x-lg text-xl"></i>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g., Web Design"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <select
                    value={formData.icon}
                    onChange={e => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon}>
                        {icon.replace('bi-', '').replace(/-/g, ' ')}
                      </option>
                    ))}
                  </select>
                  <div className="mt-3 text-3xl">
                    <i className={`bi ${formData.icon}`}></i>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
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
                    {editingCategory ? 'Update Category' : 'Add Category'}
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
