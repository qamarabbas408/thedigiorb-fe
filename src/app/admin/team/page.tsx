'use client';

import { useState, useEffect } from 'react';
import { showToast } from '@/components/CustomToaster';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  instagram_url: string;
  display_order: number;
  status: string;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: '',
    role: '',
    bio: '',
    image: '',
    facebook_url: '#',
    twitter_url: '#',
    linkedin_url: '#',
    instagram_url: '#',
    display_order: 0,
    status: 'active'
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/team');
      const data = await res.json();
      setMembers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
      setFormData(member);
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        role: '',
        bio: '',
        image: '',
        facebook_url: '#',
        twitter_url: '#',
        linkedin_url: '#',
        instagram_url: '#',
        display_order: members.length + 1,
        status: 'active'
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMember(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingMember) {
        await fetch(`/api/team/${editingMember.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await fetch('/api/team', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      closeModal();
      fetchMembers();
      showToast.success(editingMember ? 'Team member updated successfully!' : 'Team member created successfully!');
    } catch (error) {
      console.error('Failed to save team member:', error);
      showToast.error('Failed to save team member. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    
    try {
      await fetch(`/api/team/${id}`, { method: 'DELETE' });
      fetchMembers();
      showToast.success('Team member deleted successfully!');
    } catch (error) {
      console.error('Failed to delete team member:', error);
      showToast.error('Failed to delete team member. Please try again.');
    }
  };

  const handleChange = (key: keyof TeamMember, value: string | number) => {
    setFormData(prev => ({ ...prev, [key]: value }));
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
        <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
        <p className="text-gray-600">Manage your team section</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">All Team Members ({members.length})</h2>
          <button 
            onClick={() => openModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <i className="bi bi-plus"></i>
            Add Team Member
          </button>
        </div>
        
        {members.length === 0 ? (
          <div className="p-12 text-center">
            <i className="bi bi-people text-5xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No team members yet</h3>
            <p className="text-gray-500 mb-4">Add your team members to showcase your team</p>
            <button 
              onClick={() => openModal()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Team Member
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {members.map((member) => (
              <div key={member.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-200 relative">
                  <img
                    src={member.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop';
                    }}
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button 
                      onClick={() => openModal(member)}
                      className="p-2 bg-white rounded-full shadow hover:bg-blue-50 transition-colors"
                    >
                      <i className="bi bi-pencil text-blue-600"></i>
                    </button>
                    <button 
                      onClick={() => handleDelete(member.id)}
                      className="p-2 bg-white rounded-full shadow hover:bg-red-50 transition-colors"
                    >
                      <i className="bi bi-trash text-red-600"></i>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 text-sm mb-2">{member.role}</p>
                  {member.bio && (
                    <p className="text-gray-500 text-sm line-clamp-2">{member.bio}</p>
                  )}
                </div>
              </div>
            ))}
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
                  {editingMember ? 'Edit Team Member' : 'Add Team Member'}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => handleChange('name', e.target.value)}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={e => handleChange('role', e.target.value)}
                      placeholder="CEO"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                    <input
                      type="number"
                      value={formData.display_order}
                      onChange={e => handleChange('display_order', parseInt(e.target.value) || 0)}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={e => handleChange('bio', e.target.value)}
                    placeholder="Short bio..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setUploading(true);
                        const formDataUpload = new FormData();
                        formDataUpload.append('file', file);
                        formDataUpload.append('folder', 'team');
                        try {
                          const res = await fetch('/api/upload', {
                            method: 'POST',
                            body: formDataUpload,
                          });
                          const data = await res.json();
                          if (data.url) {
                            handleChange('image', data.url);
                          }
                        } catch (err) {
                          console.error('Upload failed', err);
                        }
                        setUploading(false);
                      }
                    }}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-lg" />
                  )}
                  {uploading && <p className="text-sm text-blue-600 mt-2">Uploading...</p>}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Social Links</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Facebook</label>
                      <input
                        type="url"
                        value={formData.facebook_url}
                        onChange={e => handleChange('facebook_url', e.target.value)}
                        placeholder="https://facebook.com/..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Twitter</label>
                      <input
                        type="url"
                        value={formData.twitter_url}
                        onChange={e => handleChange('twitter_url', e.target.value)}
                        placeholder="https://twitter.com/..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">LinkedIn</label>
                      <input
                        type="url"
                        value={formData.linkedin_url}
                        onChange={e => handleChange('linkedin_url', e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Instagram</label>
                      <input
                        type="url"
                        value={formData.instagram_url}
                        onChange={e => handleChange('instagram_url', e.target.value)}
                        placeholder="https://instagram.com/..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      />
                    </div>
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
                    {editingMember ? 'Update' : 'Add Member'}
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
