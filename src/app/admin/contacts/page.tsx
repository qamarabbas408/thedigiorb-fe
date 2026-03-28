'use client';

import { useState, useEffect } from 'react';
import { showToast } from '@/components/CustomToaster';

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
  status: string;
  created_at: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/contacts');
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'read' })
      });
      fetchContacts();
      showToast.success('Contact marked as read!');
    } catch (error) {
      console.error('Failed to update contact:', error);
      showToast.error('Failed to update contact. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      await fetch(`/api/contacts/${deleteId}`, { method: 'DELETE' });
      setDeleteId(null);
      setSelectedContact(null);
      fetchContacts();
      showToast.success('Contact deleted successfully!');
    } catch (error) {
      console.error('Failed to delete contact:', error);
      showToast.error('Failed to delete contact. Please try again.');
    }
  };

  const filteredContacts = contacts.filter(c => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  const newCount = contacts.filter(c => c.status === 'new').length;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-600 mt-1">Manage messages from your website visitors</p>
        </div>
        {newCount > 0 && (
          <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
            {newCount} new message{newCount > 1 ? 's' : ''}
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-6">
        {(['all', 'new', 'read', 'replied'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status === 'all' && ` (${contacts.length})`}
            {status === 'new' && ` (${newCount})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <i className="bi bi-inbox text-6xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No messages</h3>
          <p className="text-gray-500">
            {filter === 'all' ? 'No contact messages yet' : `No ${filter} messages`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="divide-y max-h-[600px] overflow-y-auto scrollbar-light">
              {filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => {
                    setSelectedContact(contact);
                    if (contact.status === 'new') {
                      handleMarkAsRead(contact.id);
                    }
                  }}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                    selectedContact?.id === contact.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      contact.status === 'new' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {contact.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`font-medium truncate ${contact.status === 'new' ? 'text-gray-900' : 'text-gray-700'}`}>
                          {contact.name}
                        </p>
                        {contact.status === 'new' && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">{contact.subject || 'No subject'}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatDate(contact.created_at)}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
            {selectedContact ? (
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedContact.name}</h2>
                    <p className="text-gray-500">{selectedContact.email}</p>
                    {selectedContact.phone && (
                      <p className="text-gray-500">{selectedContact.phone}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedContact.status === 'new' 
                        ? 'bg-blue-100 text-blue-700' 
                        : selectedContact.status === 'read'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {selectedContact.status}
                    </span>
                    <button
                      onClick={() => setDeleteId(selectedContact.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-sm font-medium text-gray-500">Subject</span>
                  <p className="text-gray-900 mt-1">{selectedContact.subject || 'No subject'}</p>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">Message</span>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-500">
                    Received on {formatDate(selectedContact.created_at)}
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  <a
                    href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject || 'Contact Form Message'}`}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <i className="bi bi-reply"></i>
                    Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-12 text-center">
                <div>
                  <i className="bi bi-chat-dots text-6xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500">Select a message to view</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]" onClick={() => setDeleteId(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 z-[10000]" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-exclamation-triangle text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Message?</h3>
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
