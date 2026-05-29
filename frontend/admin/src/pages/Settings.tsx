import { useState } from 'react'
import { Save, Server, Shield, Bell, Database, Cloud, Lock, Activity, CheckCircle } from 'lucide-react'

export default function Settings() {
  const [runtimeMode, setRuntimeMode] = useState('local')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-lg text-gray-600">Configure system settings and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Runtime Mode */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <Server className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Runtime Mode</h3>
              <p className="text-gray-500">Configure deployment environment</p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Current Mode</label>
              <select
                value={runtimeMode}
                onChange={(e) => setRuntimeMode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-lg"
              >
                <option value="local">Local Development</option>
                <option value="on_prem">On-Premises</option>
                <option value="cloud">Cloud</option>
              </select>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="p-2 bg-white rounded-lg mr-3 mt-1">
                    <Database className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Local Development</p>
                    <p className="text-sm text-gray-600">SQLite, local filesystem, mock AI for development</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 bg-white rounded-lg mr-3 mt-1">
                    <Server className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">On-Premises</p>
                    <p className="text-sm text-gray-600">Postgres, MinIO, local AI inference, offline operation</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 bg-white rounded-lg mr-3 mt-1">
                    <Cloud className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Cloud</p>
                    <p className="text-sm text-gray-600">Managed services, auto-scaling, cloud AI models</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Security</h3>
              <p className="text-gray-500">Authentication and authorization settings</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">JWT Secret</label>
                <input
                  type="password"
                  defaultValue="change-in-production"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">JWT Expiry</label>
                <input
                  type="text"
                  defaultValue="24h"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <input type="checkbox" id="oidc" className="mr-3 w-5 h-5" />
                <label htmlFor="oidc" className="text-gray-900 font-medium">Enable OIDC Authentication</label>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <input type="checkbox" id="mfa" className="mr-3 w-5 h-5" />
                <label htmlFor="mfa" className="text-gray-900 font-medium">Enable Multi-Factor Authentication</label>
              </div>
            </div>
          </div>
        </div>

        {/* Observability */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <Bell className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Observability</h3>
              <p className="text-gray-500">Monitoring, logging, and tracing configuration</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <input type="checkbox" id="metrics" className="mr-3 w-5 h-5" defaultChecked />
                <label htmlFor="metrics" className="text-gray-900 font-medium">Enable Metrics Collection</label>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <input type="checkbox" id="tracing" className="mr-3 w-5 h-5" />
                <label htmlFor="tracing" className="text-gray-900 font-medium">Enable Distributed Tracing</label>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Log Level</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900">
                  <option value="debug">Debug</option>
                  <option value="info" selected>Info</option>
                  <option value="warn">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Retention Period (days)</label>
                <input
                  type="number"
                  defaultValue="30"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center hover:bg-blue-700 transition-colors font-semibold text-lg">
            <Save className="w-5 h-5 mr-2" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}
