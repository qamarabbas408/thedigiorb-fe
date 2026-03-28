'use client';

import { useState, useEffect } from 'react';
import { showToast } from '@/components/CustomToaster';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  featured: boolean;
  status: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    content: '',
    rating: 5,
    image: '',
    featured: false,
    status: 'published'
  });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await fetch(`/api/testimonials/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      
      setShowModal(false);
      resetForm();
      fetchTestimonials();
      showToast.success(editingId ? 'Testimonial updated successfully!' : 'Testimonial created successfully!');
    } catch (error) {
      console.error('Failed to save testimonial:', error);
      showToast.error('Failed to save testimonial. Please try again.');
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      name: testimonial.name,
      title: testimonial.title || '',
      company: testimonial.company || '',
      content: testimonial.content,
      rating: testimonial.rating || 5,
      image: testimonial.image || '',
      featured: testimonial.featured || false,
      status: testimonial.status || 'published'
    });
    setEditingId(testimonial.id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      await fetch(`/api/testimonials/${deleteId}`, { method: 'DELETE' });
      setDeleteId(null);
      fetchTestimonials();
      showToast.success('Testimonial deleted successfully!');
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
      showToast.error('Failed to delete testimonial. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      company: '',
      content: '',
      rating: 5,
      image: '',
      featured: false,
      status: 'published'
    });
    setEditingId(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-600 mt-1">Manage client testimonials</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <i className="bi bi-plus-lg"></i>
          Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <i className="bi bi-chat-quote text-6xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No testimonials yet</h3>
          <p className="text-gray-500 mb-6">Start by adding your first testimonial</p>
          <button
            onClick={openAddModal}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Add First Testimonial
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Client</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Company</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Content</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Rating</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{testimonial.name}</p>
                        {testimonial.title && (
                          <p className="text-sm text-gray-500">{testimonial.title}</p>
                        )}
                      </div>
                      {testimonial.featured && (
                        <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">
                          <i className="bi bi-star-fill mr-1"></i>
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{testimonial.company || '-'}</td>
                  <td className="px-6 py-4">
                    <p className="text-gray-700 line-clamp-2 max-w-md">{testimonial.content}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i
                          key={star}
                          className={`bi ${star <= testimonial.rating ? 'bi-star-fill text-amber-400' : 'bi-star text-gray-300'}`}
                        ></i>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      testimonial.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {testimonial.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(testimonial)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        onClick={() => setDeleteId(testimonial.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-light z-[10000]" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? 'Edit Testimonial' : 'Add Testimonial'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Sarah K."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title / Position
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="IT Director"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="RetailCorp"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Testimonial Content *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="What the client said about your service..."
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1 text-2xl hover:scale-110 transition-transform"
                      >
                        <i className={`${star <= formData.rating ? 'bi-star-fill text-amber-400' : 'bi-star text-gray-300'}`}></i>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured testimonial</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {editingId ? 'Update' : 'Add'} Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]" onClick={() => setDeleteId(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 z-[10000]" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-exclamation-triangle text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Testimonial?</h3>
              <p className="text-gray-600 mb-6">This action cannot be undone.</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-5 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
