import { useState } from 'react'
import { Plus, Search, Building2, Settings, Eye, Database, Briefcase } from 'lucide-react'

export default function Clients() {
  const [clients] = useState([
    { id: 1, name: 'Acme Corp', plan: 'enterprise', jobs: 45, storage: 'azure_blob', email: 'contact@acme.com' },
    { id: 2, name: 'Tech Solutions', plan: 'professional', jobs: 32, storage: 's3', email: 'info@techsolutions.com' },
    { id: 3, name: 'BuildCo', plan: 'starter', jobs: 18, storage: 'local', email: 'admin@buildco.com' },
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Clients</h1>
        <p className="text-lg text-gray-600">Manage client accounts and configurations</p>
      </div>

      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-lg"
          />
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center hover:bg-blue-700 transition-colors font-semibold text-lg">
          <Plus className="w-5 h-5 mr-2" />
          Add Client
        </button>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div key={client.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg mr-3">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-500">#{client.id}</p>
                </div>
              </div>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                client.plan === 'enterprise' ? 'bg-purple-100 text-purple-800' :
                client.plan === 'professional' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {client.plan}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span className="font-medium">Active Jobs</span>
                </div>
                <span className="text-xl font-bold text-gray-900">{client.jobs}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Database className="w-4 h-4 mr-2" />
                  <span className="font-medium">Storage</span>
                </div>
                <span className="text-lg font-semibold text-gray-900">{client.storage}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <span className="font-medium">Email</span>
                </div>
                <span className="text-sm text-gray-900">{client.email}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 flex gap-3">
              <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                <Eye className="w-4 h-4 mr-2" />
                View
              </button>
              <button className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
