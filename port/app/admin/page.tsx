'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  LayoutDashboard,
  FolderGit2,
  Image as ImageIcon,
  Mail,
  Palette,
  User,
  Settings,
  KeyRound,
  LogOut,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  Search,
  ArrowLeft,
  Loader2,
  Lock
} from 'lucide-react';
import { Project, MediaItem, ContactEnquiry, Service, Profile, SiteSettings } from '@/lib/types';

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'media' | 'enquiries' | 'services' | 'profile' | 'settings' | 'security'>('overview');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard Data State
  const [loadingData, setLoadingData] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  // Notifications
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modals
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);

  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [newMedia, setNewMedia] = useState({ title: '', kind: 'image', category: 'Education', url: '' });

  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);

  // Security Form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Search in enquiries
  const [enquirySearch, setEnquirySearch] = useState('');

  // Check initial authentication and fetch data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const adminFetch = (url: string, options: RequestInit = {}) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('vaibhav_admin_token') : null;
    const headers = new Headers(options.headers || {});
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return fetch(url, { ...options, headers });
  };

  const fetchDashboardData = async () => {
    setLoadingData(true);
    try {
      // Test admin access by requesting enquiries
      const enqRes = await adminFetch('/api/admin/enquiries');
      if (enqRes.status === 401) {
        setIsAuthenticated(false);
        setLoadingData(false);
        return;
      }

      setIsAuthenticated(true);
      const enqData = await enqRes.json();
      setEnquiries(enqData.enquiries || []);

      // Fetch projects
      const projRes = await adminFetch('/api/admin/projects');
      const projData = await projRes.json();
      setProjects(projData.projects || []);

      // Fetch media
      const medRes = await adminFetch('/api/admin/media');
      const medData = await medRes.json();
      setMedia(medData.media || []);

      // Fetch services
      const servRes = await adminFetch('/api/admin/services');
      const servData = await servRes.json();
      setServices(servData.services || []);

      // Fetch profile
      const profRes = await adminFetch('/api/admin/profile');
      const profData = await profRes.json();
      setProfile(profData.profile || null);

      // Fetch settings
      const setRes = await adminFetch('/api/admin/settings');
      const setData = await setRes.json();
      setSettings(setData.settings || null);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      if (data.token) {
        localStorage.setItem('vaibhav_admin_token', data.token);
      }

      setIsAuthenticated(true);
      setLoginPassword('');
      fetchDashboardData();
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : 'Invalid credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('vaibhav_admin_token');
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
  };

  // -------------------------------------------------------------
  // Project Actions
  // -------------------------------------------------------------
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.description) return;

    try {
      const isEditing = !!editingProject.id;
      const url = '/api/admin/projects';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await adminFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save project.');

      setNotice({ type: 'success', message: `Project "${editingProject.title}" saved successfully!` });
      setProjectModalOpen(false);
      setEditingProject(null);
      fetchDashboardData();
    } catch (err: unknown) {
      setNotice({ type: 'error', message: err instanceof Error ? err.message : 'Save error.' });
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await adminFetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete project');
      setNotice({ type: 'success', message: `Project "${title}" deleted.` });
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      setNotice({ type: 'error', message: err instanceof Error ? err.message : 'Delete error.' });
    }
  };

  // -------------------------------------------------------------
  // Media Actions
  // -------------------------------------------------------------
  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedia.title || !newMedia.url) return;

    try {
      const res = await adminFetch('/api/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMedia),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not add media.');

      setNotice({ type: 'success', message: `Media "${newMedia.title}" added to gallery!` });
      setMediaModalOpen(false);
      setNewMedia({ title: '', kind: 'image', category: 'Education', url: '' });
      fetchDashboardData();
    } catch (err: unknown) {
      setNotice({ type: 'error', message: err instanceof Error ? err.message : 'Media error.' });
    }
  };

  const handleDeleteMedia = async (id: string, title: string) => {
    if (!confirm(`Delete media item "${title}"?`)) return;

    try {
      const res = await adminFetch(`/api/admin/media?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete media');
      setNotice({ type: 'success', message: `Media deleted.` });
      setMedia((prev) => prev.filter((m) => m.id !== id));
    } catch (err: unknown) {
      setNotice({ type: 'error', message: err instanceof Error ? err.message : 'Delete error.' });
    }
  };

  // -------------------------------------------------------------
  // Enquiry Actions
  // -------------------------------------------------------------
  const handleUpdateEnquiryStatus = async (id: string, status: 'new' | 'read' | 'completed' | 'spam') => {
    try {
      const res = await adminFetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error('Status update failed');
      setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
      setNotice({ type: 'success', message: `Enquiry status updated to ${status}.` });
    } catch (err: unknown) {
      setNotice({ type: 'error', message: err instanceof Error ? err.message : 'Error.' });
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm('Permanently delete this enquiry?')) return;
    try {
      const res = await adminFetch(`/api/admin/enquiries?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      setNotice({ type: 'success', message: 'Enquiry removed.' });
    } catch (err: unknown) {
      setNotice({ type: 'error', message: err instanceof Error ? err.message : 'Error.' });
    }
  };

  // -------------------------------------------------------------
  // Service Actions
  // -------------------------------------------------------------
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title || !editingService?.shortDescription) return;

    try {
      const isEditing = !!editingService.id;
      const url = '/api/admin/services';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await adminFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save service.');

      setNotice({ type: 'success', message: `Service "${editingService.title}" saved successfully!` });
      setServiceModalOpen(false);
      setEditingService(null);
      fetchDashboardData();
    } catch (err: unknown) {
      setNotice({ type: 'error', message: err instanceof Error ? err.message : 'Error saving service.' });
    }
  };

  const handleDeleteService = async (id: string, title: string) => {
    if (!confirm(`Delete service "${title}"?`)) return;
    try {
      const res = await adminFetch(`/api/admin/services?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete service');
      setServices((prev) => prev.filter((s) => s.id !== id));
      setNotice({ type: 'success', message: 'Service removed.' });
    } catch (err: unknown) {
      setNotice({ type: 'error', message: err instanceof Error ? err.message : 'Error.' });
    }
  };

  // -------------------------------------------------------------
  // Profile Update
  // -------------------------------------------------------------
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      const res = await adminFetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error('Failed to update profile');
      setNotice({ type: 'success', message: 'Profile information updated successfully!' });
    } catch (err: unknown) {
      setNotice({ type: 'error', message: err instanceof Error ? err.message : 'Profile save error.' });
    }
  };

  // -------------------------------------------------------------
  // Settings Update
  // -------------------------------------------------------------
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      const res = await adminFetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Failed to update site settings');
      setNotice({ type: 'success', message: 'Website settings and metadata saved!' });
    } catch (err: unknown) {
      setNotice({ type: 'error', message: err instanceof Error ? err.message : 'Settings save error.' });
    }
  };

  // -------------------------------------------------------------
  // Password Change
  // -------------------------------------------------------------
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setNotice({ type: 'error', message: 'New passwords do not match.' });
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await adminFetch('/api/admin/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Password update failed.');

      setNotice({ type: 'success', message: 'Admin password successfully changed!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: unknown) {
      setNotice({ type: 'error', message: err instanceof Error ? err.message : 'Error.' });
    } finally {
      setPasswordLoading(false);
    }
  };

  // =============================================================
  // RENDER: LOGIN FORM IF NOT AUTHENTICATED
  // =============================================================
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6 relative overflow-hidden">
        <div className="orb-glow-1" />
        <div className="w-full max-w-md bg-surface-1 border border-lineGold/50 rounded-3xl p-8 relative z-10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full border border-gold/60 flex items-center justify-center text-gold font-serif italic text-2xl mx-auto mb-4 bg-surface-2 shadow-lg">
              V
            </div>
            <h1 className="font-serif text-2xl text-ink">Admin Management Access</h1>
            <p className="text-xs text-muted mt-1">Authorized site administration only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-dim font-semibold mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="vermavaibhav710@gmail.com"
                className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-3 text-sm text-ink focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-dim font-semibold mb-1">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-3 text-sm text-ink focus:outline-none"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="btn-solid-gold w-full !py-3 text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              <span>Authenticate Session</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-line text-center">
            <Link href="/" className="text-xs text-dim hover:text-gold flex items-center justify-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Loading initial authentication check
  if (isAuthenticated === null || loadingData) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center text-gold">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // =============================================================
  // RENDER: FULL ADMIN DASHBOARD
  // =============================================================
  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-surface-1 border-r border-line flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-line flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center text-gold font-serif italic">
                V
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm text-ink font-semibold">Admin Panel</span>
                <span className="text-[10px] text-gold uppercase tracking-wider">TSO Groups</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'overview' ? 'bg-gold text-black font-semibold shadow-sm' : 'text-muted hover:bg-surface-2 hover:text-ink'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'projects' ? 'bg-gold text-black font-semibold shadow-sm' : 'text-muted hover:bg-surface-2 hover:text-ink'
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Projects ({projects.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'media' ? 'bg-gold text-black font-semibold shadow-sm' : 'text-muted hover:bg-surface-2 hover:text-ink'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Media Studio ({media.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('enquiries')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'enquiries' ? 'bg-gold text-black font-semibold shadow-sm' : 'text-muted hover:bg-surface-2 hover:text-ink'
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>Enquiries</span>
              </div>
              {enquiries.filter((e) => e.status === 'new').length > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500 text-white font-bold">
                  {enquiries.filter((e) => e.status === 'new').length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'services' ? 'bg-gold text-black font-semibold shadow-sm' : 'text-muted hover:bg-surface-2 hover:text-ink'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Services ({services.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'profile' ? 'bg-gold text-black font-semibold shadow-sm' : 'text-muted hover:bg-surface-2 hover:text-ink'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile Settings</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'settings' ? 'bg-gold text-black font-semibold shadow-sm' : 'text-muted hover:bg-surface-2 hover:text-ink'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Website Settings</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'security' ? 'bg-gold text-black font-semibold shadow-sm' : 'text-muted hover:bg-surface-2 hover:text-ink'
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>Security &amp; Password</span>
            </button>
          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-line space-y-2">
          <Link
            href="/"
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-dim hover:text-ink rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Toast Notice */}
        {notice && (
          <div
            className={`p-4 rounded-xl mb-6 flex items-center justify-between text-xs ${
              notice.type === 'success'
                ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/50 border border-rose-500/40 text-rose-300'
            }`}
          >
            <span>{notice.message}</span>
            <button
              type="button"
              onClick={() => setNotice(null)}
              className="text-xs underline ml-4 hover:opacity-80"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB A: OVERVIEW */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-3xl text-ink">Dashboard Overview</h2>
              <p className="text-muted text-sm mt-1">Real-time status of your portfolio, active projects, and client submissions.</p>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-surface-1 border border-line">
                <span className="text-xs uppercase tracking-wider text-dim block mb-1">Total Projects</span>
                <span className="font-serif text-3xl text-ink">{projects.length}</span>
                <span className="text-[11px] text-gold mt-1 block">
                  {projects.filter((p) => p.isFeatured).length} Featured
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-surface-1 border border-line">
                <span className="text-xs uppercase tracking-wider text-dim block mb-1">Active Prototypes</span>
                <span className="font-serif text-3xl text-status-proto">
                  {projects.filter((p) => p.status === 'proto').length}
                </span>
                <span className="text-[11px] text-muted mt-1 block">Live Demos connected</span>
              </div>

              <div className="p-6 rounded-2xl bg-surface-1 border border-line">
                <span className="text-xs uppercase tracking-wider text-dim block mb-1">Gallery Pieces</span>
                <span className="font-serif text-3xl text-gold">{media.length}</span>
                <span className="text-[11px] text-muted mt-1 block">TSO Groups Works</span>
              </div>

              <div className="p-6 rounded-2xl bg-surface-1 border border-line">
                <span className="text-xs uppercase tracking-wider text-dim block mb-1">New Enquiries</span>
                <span className="font-serif text-3xl text-rose-400">
                  {enquiries.filter((e) => e.status === 'new').length}
                </span>
                <span className="text-[11px] text-muted mt-1 block">
                  {enquiries.length} total messages
                </span>
              </div>
            </div>

            {/* Recent Enquiries Preview */}
            <div className="p-6 rounded-2xl bg-surface-1 border border-line space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-ink">Recent Client Enquiries</h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('enquiries')}
                  className="text-xs text-gold hover:underline"
                >
                  View all in inbox
                </button>
              </div>

              {enquiries.length === 0 ? (
                <p className="text-xs text-dim">No enquiries received yet.</p>
              ) : (
                <div className="divide-y divide-line">
                  {enquiries.slice(0, 3).map((enq) => (
                    <div key={enq.id} className="py-3 flex items-center justify-between">
                      <div>
                        <span className="font-medium text-ink text-sm block">{enq.name} ({enq.email})</span>
                        <span className="text-xs text-muted truncate max-w-md block">{enq.message}</span>
                      </div>
                      <span className="text-[10px] text-dim">{new Date(enq.createdAt).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB B: PROJECTS MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-3xl text-ink">Project Management</h2>
                <p className="text-muted text-sm mt-1">Add, update, or remove projects, live links, and tags.</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingProject({
                    title: '',
                    category: 'AI/ML',
                    status: 'proto',
                    description: '',
                    nextStep: '',
                    tags: [],
                    imageUrl: '',
                    liveUrl: '',
                    embedUrl: '',
                    githubUrl: 'https://github.com/thesecretone09',
                    isFeatured: true,
                    sortOrder: projects.length + 1,
                  });
                  setProjectModalOpen(true);
                }}
                className="btn-solid-gold !py-2.5 !px-4 text-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Projects Table */}
            <div className="bg-surface-1 border border-line rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-2 border-b border-line text-dim uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Project</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Featured</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-surface-2/40">
                      <td className="p-4">
                        <span className="font-medium text-ink text-sm block">{proj.title}</span>
                        <span className="text-dim text-[11px] truncate max-w-xs block">{proj.description}</span>
                      </td>
                      <td className="p-4 text-muted">{proj.category}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-full border border-line text-[11px] uppercase">
                          {proj.status}
                        </span>
                      </td>
                      <td className="p-4">
                        {proj.isFeatured ? (
                          <span className="text-emerald-400 font-semibold">Yes</span>
                        ) : (
                          <span className="text-dim">No</span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProject(proj);
                            setProjectModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg border border-line hover:border-gold hover:text-gold transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(proj.id, proj.title)}
                          className="p-1.5 rounded-lg border border-line hover:border-rose-500 hover:text-rose-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB C: MEDIA MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-3xl text-ink">Media &amp; Gallery Studio</h2>
                <p className="text-muted text-sm mt-1">Manage graphic design pieces, posters, and YouTube thumbnails.</p>
              </div>

              <button
                type="button"
                onClick={() => setMediaModalOpen(true)}
                className="btn-solid-gold !py-2.5 !px-4 text-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Media</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {media.map((item) => (
                <div key={item.id} className="p-3 bg-surface-1 border border-line rounded-xl flex flex-col justify-between">
                  <div className="aspect-video bg-surface-2 rounded-lg overflow-hidden mb-3 relative">
                    <img src={item.thumbnailUrl || item.url} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] bg-black/70 text-gold">
                      {item.category}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-xs text-ink line-clamp-1 mb-2 block">{item.title}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteMedia(item.id, item.title)}
                      className="w-full text-center py-1 text-[11px] text-rose-400 hover:bg-rose-950/30 rounded border border-rose-500/30 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB D: ENQUIRIES INBOX */}
        {/* ========================================================= */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-3xl text-ink">Contact Enquiries Inbox</h2>
              <p className="text-muted text-sm mt-1">View, triage, and manage incoming messages from the contact form.</p>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 max-w-md bg-surface-1 border border-line rounded-xl px-4 py-2">
              <Search className="w-4 h-4 text-dim" />
              <input
                type="text"
                placeholder="Search by name, email, or keywords..."
                value={enquirySearch}
                onChange={(e) => setEnquirySearch(e.target.value)}
                className="bg-transparent text-xs text-ink w-full focus:outline-none"
              />
            </div>

            {/* List */}
            <div className="space-y-4">
              {enquiries
                .filter((e) =>
                  e.name.toLowerCase().includes(enquirySearch.toLowerCase()) ||
                  e.email.toLowerCase().includes(enquirySearch.toLowerCase()) ||
                  e.message.toLowerCase().includes(enquirySearch.toLowerCase())
                )
                .map((enq) => (
                  <div key={enq.id} className="p-6 bg-surface-1 border border-line rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-base text-ink">{enq.name}</span>
                        <a href={`mailto:${enq.email}`} className="text-xs text-gold hover:underline">
                          {enq.email}
                        </a>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${
                            enq.status === 'new'
                              ? 'bg-rose-500 text-white'
                              : enq.status === 'read'
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-emerald-500/20 text-emerald-300'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </div>
                      <span className="text-xs text-dim">{new Date(enq.createdAt).toLocaleString()}</span>
                    </div>

                    <p className="text-xs text-ink bg-surface-2 p-4 rounded-xl leading-relaxed whitespace-pre-wrap">
                      {enq.message}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        {enq.status !== 'read' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateEnquiryStatus(enq.id, 'read')}
                            className="text-xs px-2.5 py-1 rounded border border-line hover:border-gold text-muted hover:text-ink"
                          >
                            Mark as Read
                          </button>
                        )}
                        {enq.status !== 'completed' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateEnquiryStatus(enq.id, 'completed')}
                            className="text-xs px-2.5 py-1 rounded border border-emerald-500/40 text-emerald-400 hover:bg-emerald-950/20"
                          >
                            Mark Completed
                          </button>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteEnquiry(enq.id)}
                        className="text-xs text-rose-400 hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Enquiry</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB E: SERVICES MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-3xl text-ink">Services Management</h2>
                <p className="text-muted text-sm mt-1">Configure TSO Groups creative studio offerings and deliverables.</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingService({
                    title: '',
                    shortDescription: '',
                    detailedDescription: '',
                    iconName: 'Palette',
                    features: [],
                    isActive: true,
                    sortOrder: services.length + 1,
                  });
                  setServiceModalOpen(true);
                }}
                className="btn-solid-gold !py-2.5 !px-4 text-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((serv) => (
                <div key={serv.id} className="p-6 bg-surface-1 border border-line rounded-2xl flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-ink mb-1">{serv.title}</h3>
                    <p className="text-xs text-muted mb-3">{serv.shortDescription}</p>
                    <div className="flex flex-wrap gap-1">
                      {serv.features.map((f, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-surface-2 text-dim">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-line">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingService(serv);
                        setServiceModalOpen(true);
                      }}
                      className="text-xs text-gold hover:underline p-1"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteService(serv.id, serv.title)}
                      className="text-xs text-rose-400 hover:underline p-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB F: PROFILE MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === 'profile' && profile && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="font-serif text-3xl text-ink">Profile Information</h2>
              <p className="text-muted text-sm mt-1">Update your name, bio, education, and contact links.</p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 bg-surface-1 border border-line p-6 rounded-2xl">
              <div>
                <label className="block text-xs uppercase tracking-wider text-dim font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-xs text-ink"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-dim font-semibold mb-1">Headline</label>
                <input
                  type="text"
                  value={profile.headline}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-xs text-ink"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-dim font-semibold mb-1">About Bio</label>
                <textarea
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-xs text-ink"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-dim font-semibold mb-1">Phone</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-xs text-ink"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-dim font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-xs text-ink"
                  />
                </div>
              </div>

              <button type="submit" className="btn-solid-gold !py-2.5 !px-6 text-xs">
                Save Profile Updates
              </button>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB G: WEBSITE SETTINGS */}
        {/* ========================================================= */}
        {activeTab === 'settings' && settings && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="font-serif text-3xl text-ink">Website Settings &amp; SEO</h2>
              <p className="text-muted text-sm mt-1">Configure global meta title, description, and social targets.</p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 bg-surface-1 border border-line p-6 rounded-2xl">
              <div>
                <label className="block text-xs uppercase tracking-wider text-dim font-semibold mb-1">Website Title</label>
                <input
                  type="text"
                  value={settings.siteTitle}
                  onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-xs text-ink"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-dim font-semibold mb-1">Meta Description</label>
                <textarea
                  rows={3}
                  value={settings.metaDescription}
                  onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-xs text-ink"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-dim font-semibold mb-1">GitHub Profile URL</label>
                <input
                  type="url"
                  value={settings.githubUrl}
                  onChange={(e) => setSettings({ ...settings, githubUrl: e.target.value })}
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-xs text-ink"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-dim font-semibold mb-1">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={settings.linkedinUrl}
                  onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-xs text-ink"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-dim font-semibold mb-1">YouTube Channel URL</label>
                <input
                  type="url"
                  value={settings.youtubeUrl}
                  onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-xs text-ink"
                />
              </div>

              <button type="submit" className="btn-solid-gold !py-2.5 !px-6 text-xs">
                Save Website Settings
              </button>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB H: SECURITY & PASSWORD */}
        {/* ========================================================= */}
        {activeTab === 'security' && (
          <div className="space-y-6 max-w-md">
            <div>
              <h2 className="font-serif text-3xl text-ink">Account &amp; Security</h2>
              <p className="text-muted text-sm mt-1">Change your administrator password and review active session parameters.</p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4 bg-surface-1 border border-line p-6 rounded-2xl">
              <div>
                <label className="block text-xs uppercase tracking-wider text-dim font-semibold mb-1">Current Password *</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-xs text-ink"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-dim font-semibold mb-1">New Password *</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-xs text-ink"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-dim font-semibold mb-1">Confirm New Password *</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-xs text-ink"
                />
              </div>

              <button
                type="submit"
                disabled={passwordLoading}
                className="btn-solid-gold w-full !py-2.5 text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {passwordLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                <span>Update Admin Password</span>
              </button>
            </form>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT PROJECT */}
      {/* ========================================================= */}
      {projectModalOpen && editingProject && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-surface-1 border border-lineGold rounded-2xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto space-y-4">
            <h3 className="font-serif text-2xl text-ink">
              {editingProject.id ? 'Edit Project' : 'Add New Project'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-dim uppercase tracking-wider mb-1 font-semibold">Title *</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-ink"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-dim uppercase tracking-wider mb-1 font-semibold">Category</label>
                  <select
                    value={editingProject.category || 'AI/ML'}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                    className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-ink"
                  >
                    <option value="AI/ML">AI/ML</option>
                    <option value="Web">Web</option>
                    <option value="Creative">Creative</option>
                    <option value="Research">Research</option>
                  </select>
                </div>
                <div>
                  <label className="block text-dim uppercase tracking-wider mb-1 font-semibold">Status</label>
                  <select
                    value={editingProject.status || 'proto'}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                    className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-ink"
                  >
                    <option value="done">Completed (done)</option>
                    <option value="proto">Prototype (proto)</option>
                    <option value="wip">In Progress (wip)</option>
                    <option value="idea">Future Idea (idea)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-dim uppercase tracking-wider mb-1 font-semibold">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-ink"
                />
              </div>

              <div>
                <label className="block text-dim uppercase tracking-wider mb-1 font-semibold">Next Step / Roadmap</label>
                <input
                  type="text"
                  value={editingProject.nextStep || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, nextStep: e.target.value })}
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-ink"
                />
              </div>

              <div>
                <label className="block text-dim uppercase tracking-wider mb-1 font-semibold">Tags (comma separated)</label>
                <input
                  type="text"
                  value={editingProject.tags ? editingProject.tags.join(', ') : ''}
                  onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })}
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-ink"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-dim uppercase tracking-wider mb-1 font-semibold">Live Demo URL</label>
                  <input
                    type="url"
                    value={editingProject.liveUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-ink"
                  />
                </div>
                <div>
                  <label className="block text-dim uppercase tracking-wider mb-1 font-semibold">GitHub Repo URL</label>
                  <input
                    type="url"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-dim uppercase tracking-wider mb-1 font-semibold">Thumbnail Image URL</label>
                <input
                  type="url"
                  value={editingProject.imageUrl || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-ink"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={editingProject.isFeatured || false}
                  onChange={(e) => setEditingProject({ ...editingProject, isFeatured: e.target.checked })}
                />
                <label htmlFor="featured-check" className="text-ink">Mark as Featured on Home Page</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-line">
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="btn-gold !py-2 !px-4 text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-solid-gold !py-2 !px-5 text-xs">
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD MEDIA */}
      {/* ========================================================= */}
      {mediaModalOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-surface-1 border border-lineGold rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="font-serif text-2xl text-ink">Add Media to Gallery</h3>

            <form onSubmit={handleAddMedia} className="space-y-4 text-xs">
              <div>
                <label className="block text-dim uppercase tracking-wider mb-1 font-semibold">Title *</label>
                <input
                  type="text"
                  required
                  value={newMedia.title}
                  onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-ink"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-dim uppercase tracking-wider mb-1 font-semibold">Type</label>
                  <select
                    value={newMedia.kind}
                    onChange={(e) => setNewMedia({ ...newMedia, kind: e.target.value })}
                    className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-ink"
                  >
                    <option value="image">Design Image</option>
                    <option value="video">Video Link</option>
                  </select>
                </div>
                <div>
                  <label className="block text-dim uppercase tracking-wider mb-1 font-semibold">Category</label>
                  <select
                    value={newMedia.category}
                    onChange={(e) => setNewMedia({ ...newMedia, category: e.target.value })}
                    className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-ink"
                  >
                    <option value="Education">Education</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Technology">Technology</option>
                    <option value="Creative">Creative</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-dim uppercase tracking-wider mb-1 font-semibold">
                  {newMedia.kind === 'video' ? 'YouTube Video URL *' : 'Image URL *'}
                </label>
                <input
                  type="url"
                  required
                  value={newMedia.url}
                  onChange={(e) => setNewMedia({ ...newMedia, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-ink"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-line">
                <button
                  type="button"
                  onClick={() => setMediaModalOpen(false)}
                  className="btn-gold !py-2 !px-4 text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-solid-gold !py-2 !px-5 text-xs">
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT SERVICE */}
      {/* ========================================================= */}
      {serviceModalOpen && editingService && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-surface-1 border border-lineGold rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="font-serif text-2xl text-ink">
              {editingService.id ? 'Edit Service' : 'Add New Service'}
            </h3>

            <form onSubmit={handleSaveService} className="space-y-4 text-xs">
              <div>
                <label className="block text-dim uppercase tracking-wider mb-1 font-semibold">Service Title *</label>
                <input
                  type="text"
                  required
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-ink"
                />
              </div>

              <div>
                <label className="block text-dim uppercase tracking-wider mb-1 font-semibold">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={editingService.shortDescription || ''}
                  onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-ink"
                />
              </div>

              <div>
                <label className="block text-dim uppercase tracking-wider mb-1 font-semibold">Features (comma separated)</label>
                <input
                  type="text"
                  value={editingService.features ? editingService.features.join(', ') : ''}
                  onChange={(e) => setEditingService({ ...editingService, features: e.target.value.split(',').map((f) => f.trim()).filter(Boolean) })}
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-2.5 text-ink"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-line">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="btn-gold !py-2 !px-4 text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-solid-gold !py-2 !px-5 text-xs">
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
