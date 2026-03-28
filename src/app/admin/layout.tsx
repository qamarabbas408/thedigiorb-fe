'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CustomToaster, { showToast } from '@/components/CustomToaster';
import { 
  PanelLeftClose, 
  PanelLeft, 
  LogOut, 
  LayoutDashboard, 
  Briefcase, 
  Tags, 
  Settings, 
  BarChart3, 
  Users, 
  MessageSquare, 
  Mail, 
  ExternalLink, 
  Hexagon,
  Lock,
  Sparkles
} from 'lucide-react';

const scrollbarStyles = `
  .scrollbar-dark::-webkit-scrollbar {
    width: 6px;
  }
  .scrollbar-dark::-webkit-scrollbar-track {
    background: transparent;
  }
  .scrollbar-dark::-webkit-scrollbar-thumb {
    background: #475569;
    border-radius: 3px;
  }
  .scrollbar-dark::-webkit-scrollbar-thumb:hover {
    background: #64748b;
  }
  
  .scrollbar-light::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .scrollbar-light::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }
  .scrollbar-light::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
  .scrollbar-light::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
  
  .scrollbar-dark {
    scrollbar-width: thin;
    scrollbar-color: #475569 transparent;
  }
  .scrollbar-light {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 #f1f5f9;
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  .animate-shimmer {
    animation: shimmer 2s infinite linear;
    background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
    background-size: 1000px 100%;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
`;

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard', color: 'from-blue-500 to-cyan-500' },
  { href: '/admin/projects', icon: Briefcase, label: 'Projects', color: 'from-violet-500 to-purple-500' },
  { href: '/admin/categories', icon: Tags, label: 'Categories', color: 'from-pink-500 to-rose-500' },
  { href: '/admin/services', icon: Settings, label: 'Services', color: 'from-amber-500 to-orange-500' },
  { href: '/admin/stats', icon: BarChart3, label: 'Stats', color: 'from-emerald-500 to-teal-500' },
  { href: '/admin/team', icon: Users, label: 'Team', color: 'from-indigo-500 to-blue-500' },
  { href: '/admin/testimonials', icon: MessageSquare, label: 'Testimonials', color: 'from-cyan-500 to-sky-500' },
  { href: '/admin/contacts', icon: Mail, label: 'Contacts', color: 'from-red-500 to-pink-500' },
  { href: '/admin/settings', icon: Settings, label: 'Settings', color: 'from-slate-500 to-gray-500' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    
    if (password === adminPassword) {
      localStorage.setItem('adminAuthenticated', 'true');
      setIsAuthenticated(true);
      showToast.success('Welcome back! Login successful.');
    } else {
      showToast.error('Invalid password. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
    showToast.success('Logged out successfully');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
          </div>
          <p className="mt-4 text-sm text-gray-600 font-medium">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <CustomToaster />
        <style jsx global>{scrollbarStyles}</style>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-md border border-white/20">
            <div className="mb-8 text-center">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Hexagon className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                Admin Portal
              </h1>
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                Portfolio Management System
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="text-left">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-500" />
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder="Enter your secure password"
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-300 bg-gray-50 focus:bg-white"
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="flex items-center justify-center gap-2">
                  Secure Login
                  <ExternalLink className="w-4 h-4" />
                </span>
              </button>
            </form>

            {/* <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <p className="text-sm text-blue-800 text-center">
                <span className="font-semibold">Development Mode:</span> Use <code className="bg-blue-100 px-2 py-1 rounded text-xs">admin123</code>
              </p>
            </div> */}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <CustomToaster />
      <style jsx global>{scrollbarStyles}</style>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`fixed top-2 z-50  rounded bg-gradient-to-br from-blue-600 to-purple-600 transition-all duration-300 hover:scale-105 active:scale-95 ${
            sidebarOpen ? 'left-64' : 'left-16'
          }`}
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {sidebarOpen ? (
            <PanelLeftClose className=" text-white" size={36} />
          ) : (
            <PanelLeft className=" text-white" size={36} />
          )}
        </button>

        {/* Sidebar */}
        <aside 
          className={`bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white flex flex-col fixed h-screen z-40 transition-all duration-300 shadow-2xl ${
            sidebarOpen ? 'w-72' : 'w-20'
          }`}
        >
          {/* Header */}
          <div className={`px-6 py-6 border-b border-slate-700/50 flex items-center gap-3 ${sidebarOpen ? 'justify-start' : 'justify-center'}`}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Hexagon className="w-6 h-6 text-white" />
              </div>
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="text-lg font-bold whitespace-nowrap bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  DigitalOrbit
                </span>
                <span className="text-xs text-slate-400">Admin Dashboard</span>
              </div>
            )}
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 scrollbar-dark px-3">
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const isHovered = hoveredItem === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    } ${sidebarOpen ? '' : 'justify-center px-3'}`}
                    title={!sidebarOpen ? item.label : undefined}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                    )}
                    
                    {/* Icon with gradient background on hover */}
                    <div className={`relative flex-shrink-0 ${isActive || isHovered ? 'scale-110' : ''} transition-transform duration-200`}>
                      {!isActive && isHovered && (
                        <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-lg blur opacity-50`}></div>
                      )}
                      <item.icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-white' : ''}`} />
                    </div>
                    
                    {sidebarOpen && (
                      <span className={`font-medium ${isActive ? 'text-white' : ''}`}>
                        {item.label}
                      </span>
                    )}
                    
                    {/* Hover arrow */}
                    {sidebarOpen && isHovered && !isActive && (
                      <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-slate-700/50"></div>

            {/* View Site Link */}
            <Link
              href="/"
              target="_blank"
              onMouseEnter={() => setHoveredItem('view-site')}
              onMouseLeave={() => setHoveredItem(null)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-200 border border-transparent hover:border-emerald-500/30 ${
                sidebarOpen ? '' : 'justify-center px-3'
              }`}
              title={!sidebarOpen ? 'View Site' : undefined}
            >
              <ExternalLink className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">View Live Site</span>}
            </Link>
          </nav>
          
          {/* Logout Button */}
          <div className={`px-3 py-4 border-t border-slate-700/50 bg-slate-900/50 ${sidebarOpen ? '' : 'flex justify-center'}`}>
            <button
              onClick={handleLogout}
              className={`group flex items-center gap-3 px-4 py-3 text-slate-400 border border-slate-700 rounded-xl hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-200 ${
                sidebarOpen ? 'w-full justify-start' : 'justify-center px-3'
              }`}
              title={!sidebarOpen ? 'Logout' : undefined}
            >
              <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </aside>
        
        {/* Main Content */}
        <main 
          className={`flex-1 overflow-y-auto scrollbar-light transition-all duration-300 ${
            sidebarOpen ? 'ml-72' : 'ml-20'
          }`}
        >
          <div className="min-h-full">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}