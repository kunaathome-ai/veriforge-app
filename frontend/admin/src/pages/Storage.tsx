import { useState } from 'react'
import { Plus, CheckCircle, XCircle, Settings, HardDrive, Cloud, Server, FolderOpen, Lock, Share2 } from 'lucide-react'

export default function Storage() {
  const [storageConfigs] = useState([
    { id: 1, name: 'Default Local', type: 'local', status: 'connected', path: './storage', usage: '45%' },
    { id: 2, name: 'Production S3', type: 's3', status: 'connected', bucket: 'pow-production', usage: '78%' },
    { id: 3, name: 'Backup Azure', type: 'azure_blob', status: 'disconnected', container: 'pow-backup', usage: '0%' },
  ])

  const getStorageIcon = (type: string) => {
    switch (type) {
      case 'local':
        return <HardDrive className="w-6 h-6" />
      case 's3':
        return <Cloud className="w-6 h-6" />
      case 'azure_blob':
        return <Server className="w-6 h-6" />
      default:
        return <FolderOpen className="w-6 h-6" />
    }
  }

  const getStorageColor = (type: string) => {
    switch (type) {
      case 'local':
        return 'bg-gray-100 text-gray-600'
      case 's3':
        return 'bg-orange-100 text-orange-600'
      case 'azure_blob':
        return 'bg-blue-100 text-blue-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Storage Configuration</h1>
        <p className="text-lg text-gray-600">Manage storage backends and data delivery</p>
      </div>

      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-600">
          <span className="font-medium">3 storage backends configured</span>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center hover:bg-blue-700 transition-colors font-semibold text-lg">
          <Plus className="w-5 h-5 mr-2" />
          Add Storage
        </button>
      </div>

      {/* Storage Configs */}
      <div className="space-y-4 mb-8">
        {storageConfigs.map((config) => (
          <div key={config.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start flex-1">
                <div className={`p-4 rounded-xl mr-4 ${getStorageColor(config.type)}`}>
                  {getStorageIcon(config.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">{config.name}</h3>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                      config.status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {config.status === 'connected' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                      <span className="text-sm font-semibold capitalize">{config.status}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 capitalize mt-1">{config.type.replace('_', ' ')}</p>
                  <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 font-medium">Location:</span>
                      <span className="text-gray-900 ml-2">
                        {config.type === 'local' && config.path}
                        {config.type === 's3' && config.bucket}
                        {config.type === 'azure_blob' && config.container}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 font-medium">Usage:</span>
                      <span className="text-gray-900 ml-2 font-semibold">{config.usage}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="flex items-center px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors font-medium ml-4">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Storage Types Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Supported Storage Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-gray-100 rounded-lg mr-3">
                <HardDrive className="w-6 h-6 text-gray-600" />
              </div>
              <h4 className="font-bold text-gray-900 text-lg">Local Storage</h4>
            </div>
            <p className="text-gray-600">Filesystem-based storage for development and on-prem deployments</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-orange-100 rounded-lg mr-3">
                <Cloud className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-bold text-gray-900 text-lg">AWS S3</h4>
            </div>
            <p className="text-gray-600">Scalable object storage with S3-compatible services</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-lg mr-3">
                <Server className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 text-lg">Azure Blob</h4>
            </div>
            <p className="text-gray-600">Microsoft Azure Blob Storage integration</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-100 rounded-lg mr-3">
                <FolderOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 text-lg">MinIO</h4>
            </div>
            <p className="text-gray-600">Self-hosted S3-compatible object storage</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 rounded-lg mr-3">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 text-lg">SFTP</h4>
            </div>
            <p className="text-gray-600">Secure file transfer protocol for legacy systems</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-indigo-100 rounded-lg mr-3">
                <Share2 className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="font-bold text-gray-900 text-lg">SharePoint</h4>
            </div>
            <p className="text-gray-600">Microsoft SharePoint integration for enterprise</p>
          </div>
        </div>
      </div>
    </div>
  )
}
