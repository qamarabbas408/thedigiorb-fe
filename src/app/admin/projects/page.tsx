'use client';

import { useState, useEffect } from 'react';
import { showToast } from '@/components/CustomToaster';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  categoryId: string;
  year: string;
  technologies: string[];
  description: string;
  image: string;
  gallery: string[];
  featured: boolean;
  client: string;
  url: string;
  status: string;
}

interface Category {
  id: string;
  name: string;
  filter_class: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    subtitle: '',
    categoryId: '',
    year: new Date().getFullYear().toString(),
    technologies: [],
    description: '',
    image: '',
    gallery: [],
    featured: false,
    client: '',
    url: '',
    status: 'published'
  });
  const [techInput, setTechInput] = useState('');
  const [galleryInput, setGalleryInput] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, categoriesRes] = await Promise.all([
        fetch('/api/portfolio/projects'),
        fetch('/api/portfolio/categories')
      ]);
      const projectsData = await projectsRes.json();
      const categoriesData = await categoriesRes.json();
      setProjects(Array.isArray(projectsData) ? projectsData : []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData(project);
      setTechInput(project.technologies?.join(', ') || '');
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        subtitle: '',
        categoryId: categories[0]?.id || '',
        year: new Date().getFullYear().toString(),
        technologies: [],
        description: '',
        image: '',
        gallery: [],
        featured: false,
        client: '',
        url: '',
        status: 'published'
      });
      setTechInput('');
    }
    setGalleryInput('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
  };

  const addGalleryImage = () => {
    if (galleryInput.trim()) {
      setFormData(prev => ({
        ...prev,
        gallery: [...(prev.gallery || []), galleryInput.trim()]
      }));
      setGalleryInput('');
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      technologies: techInput.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (editingProject) {
        await fetch(`/api/portfolio/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData)
        });
      } else {
        await fetch('/api/portfolio/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData)
        });
      }
      closeModal();
      fetchData();
      showToast.success(editingProject ? 'Project updated successfully!' : 'Project created successfully!');
    } catch (error) {
      console.error('Failed to save project:', error);
      showToast.error('Failed to save project. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await fetch(`/api/portfolio/projects/${id}`, { method: 'DELETE' });
      fetchData();
      showToast.success('Project deleted successfully!');
    } catch (error) {
      console.error('Failed to delete project:', error);
      showToast.error('Failed to delete project. Please try again.');
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
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <p className="text-gray-600">Manage your portfolio projects</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">All Projects ({projects.length})</h2>
          <button 
            onClick={() => openModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <i className="bi bi-plus"></i>
            Add Project
          </button>
        </div>
        
        {projects.length === 0 ? (
          <div className="p-12 text-center">
            <i className="bi bi-briefcase text-5xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No projects yet</h3>
            <p className="text-gray-500 mb-4">Add your first project to showcase your work</p>
            <button 
              onClick={() => openModal()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Project
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gallery</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={project.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop'}
                        alt={project.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{project.title}</div>
                      {project.subtitle && (
                        <div className="text-sm text-gray-500">{project.subtitle}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.categoryId === 'web-design' ? 'bg-blue-100 text-blue-800' :
                        project.categoryId === 'mobile-design' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {categories.find(c => c.id === project.categoryId)?.name || project.categoryId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2">
                        {project.gallery?.slice(0, 3).map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt=""
                            className="w-8 h-8 rounded-full border-2 border-white object-cover"
                          />
                        ))}
                        {(project.gallery?.length || 0) > 3 && (
                          <span className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                            +{project.gallery.length - 3}
                          </span>
                        )}
                        {(!project.gallery || project.gallery.length === 0) && (
                          <span className="text-xs text-gray-400">No gallery</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                          <i className="bi bi-star-fill"></i> Featured
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => openModal(project)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          onClick={() => handleDelete(project.id)}
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
                  {editingProject ? 'Edit Project' : 'Add New Project'}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      required
                      placeholder="e.g., BookNStay"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="e.g., Hotel Booking Platform"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      value={formData.categoryId}
                      onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={e => setFormData({ ...formData, year: e.target.value })}
                      placeholder="e.g., 2024"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                    <input
                      type="text"
                      value={formData.client}
                      onChange={e => setFormData({ ...formData, client: e.target.value })}
                      placeholder="Client name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma-separated)</label>
                  <input
                    type="text"
                    value={techInput}
                    onChange={e => setTechInput(e.target.value)}
                    placeholder="e.g., ReactJS, Laravel, MySQL"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the project..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">External Image URL (Unsplash/Pexels)</label>
                  <input
                    type="url"
                    value={formData.image?.startsWith('http') ? formData.image : ''}
                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Paste an Unsplash or Pexels URL</p>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Main Image (upload)</label>
                  {formData.image && !formData.image.startsWith('http') ? (
                    <div className="relative inline-block">
                      <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-gray-200" />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                      >
                        <i className="bi bi-x text-xs"></i>
                      </button>
                    </div>
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploading(true);
                          const formDataUpload = new FormData();
                          formDataUpload.append('file', file);
                          formDataUpload.append('folder', 'portfolio');
                          try {
                            const res = await fetch('/api/upload', {
                              method: 'POST',
                              body: formDataUpload,
                            });
                            const data = await res.json();
                            if (data.url) {
                              setFormData(prev => ({ ...prev, image: data.url }));
                            }
                          } catch (err) {
                            console.error('Upload failed', err);
                          }
                          setUploading(false);
                        }
                      }}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  )}
                  {uploading && <p className="text-sm text-blue-600 mt-2">Uploading...</p>}
                  {formData.image && !formData.image.startsWith('http') && (
                    <label
                      htmlFor="main-image-upload"
                      className="ml-3 inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      Change Image
                    </label>
                  )}
                  <input
                    id="main-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setUploading(true);
                        const formDataUpload = new FormData();
                        formDataUpload.append('file', file);
                        formDataUpload.append('folder', 'portfolio');
                        try {
                          const res = await fetch('/api/upload', {
                            method: 'POST',
                            body: formDataUpload,
                          });
                          const data = await res.json();
                          if (data.url) {
                            setFormData(prev => ({ ...prev, image: data.url }));
                          }
                        } catch (err) {
                          console.error('Upload failed', err);
                        }
                        setUploading(false);
                      }
                    }}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Images</label>
                  <input
                    id="gallery-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={async (e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        setUploading(true);
                        for (let i = 0; i < files.length; i++) {
                          const file = files[i];
                          const formDataUpload = new FormData();
                          formDataUpload.append('file', file);
                          formDataUpload.append('folder', 'portfolio');
                          try {
                            const res = await fetch('/api/upload', {
                              method: 'POST',
                              body: formDataUpload,
                            });
                            const data = await res.json();
                            if (data.url) {
                              setFormData(prev => ({ 
                                ...prev, 
                                gallery: [...(prev.gallery || []), data.url] 
                              }));
                            }
                          } catch (err) {
                            console.error('Upload failed', err);
                          }
                        }
                        setUploading(false);
                        e.target.value = '';
                      }
                    }}
                    className="hidden"
                  />
                  <div className="flex gap-2">
                    <label
                      htmlFor="gallery-upload"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <i className="bi bi-plus-lg"></i>
                      {uploading ? 'Uploading...' : 'Add Images'}
                    </label>
                    {formData.gallery && formData.gallery.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, gallery: [] }))}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <i className="bi bi-trash"></i> Clear All
                      </button>
                    )}
                  </div>
                  {formData.gallery && formData.gallery.length > 0 && (
                    <div className="mt-3 grid grid-cols-4 gap-3">
                      {formData.gallery.map((img, index) => (
                        <div key={index} className="relative">
                          <img src={img} alt="" className="w-full h-24 object-cover rounded-lg border border-gray-200" />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                          >
                            <i className="bi bi-x text-xs"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    {formData.gallery?.length || 0} image(s) selected • Click image to remove
                  </p>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project URL</label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={e => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="mt-4 flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Featured Project</span>
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
                    {editingProject ? 'Update Project' : 'Add Project'}
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
