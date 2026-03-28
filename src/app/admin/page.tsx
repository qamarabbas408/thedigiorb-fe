'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  categoryId: string;
  featured: boolean;
  status: string;
}

interface Category {
  id: string;
  name: string;
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const publishedProjects = projects.filter(p => p.status === 'published').length;
  const featuredProjects = projects.filter(p => p.featured).length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to the DigitalOrbit Portfolio Management System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-4">
            <i className="bi bi-briefcase"></i>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{projects.length}</h3>
          <p className="text-gray-600 text-sm">Total Projects</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl mb-4">
            <i className="bi bi-check-circle"></i>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{publishedProjects}</h3>
          <p className="text-gray-600 text-sm">Published</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-xl mb-4">
            <i className="bi bi-star"></i>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{featuredProjects}</h3>
          <p className="text-gray-600 text-sm">Featured</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-xl mb-4">
            <i className="bi bi-folder"></i>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{categories.length}</h3>
          <p className="text-gray-600 text-sm">Categories</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Recent Projects</h2>
            <Link 
              href="/admin/projects" 
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {projects.length === 0 ? (
              <div className="p-6 text-center">
                <i className="bi bi-inbox text-4xl text-gray-300 mb-3"></i>
                <h3 className="text-gray-700 font-medium">No projects yet</h3>
                <p className="text-gray-500 text-sm">Add your first project</p>
              </div>
            ) : (
              projects.slice(0, 5).map((project) => (
                <div key={project.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <span className="font-medium text-gray-900">{project.title}</span>
                    <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      project.categoryId === 'web-design' ? 'bg-blue-100 text-blue-800' :
                      project.categoryId === 'mobile-design' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {categories.find(c => c.id === project.categoryId)?.name || project.categoryId}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
            <Link 
              href="/admin/categories" 
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Manage
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {categories.length === 0 ? (
              <div className="p-6 text-center">
                <i className="bi bi-tags text-4xl text-gray-300 mb-3"></i>
                <h3 className="text-gray-700 font-medium">No categories yet</h3>
                <p className="text-gray-500 text-sm">Create categories</p>
              </div>
            ) : (
              categories.map((category) => (
                <div key={category.id} className="px-6 py-4 flex items-center justify-between">
                  <span className="font-medium text-gray-900">{category.name}</span>
                  <span className="text-gray-500 text-sm">
                    {projects.filter(p => p.categoryId === category.id).length} projects
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
