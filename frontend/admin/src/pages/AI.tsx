import { useState } from 'react'
import { Plus, Brain, Zap, CheckCircle, Settings, Play, DollarSign, Cpu, Database } from 'lucide-react'

export default function AI() {
  const [models] = useState([
    { id: 'gpt-4o', name: 'GPT-4o', provider: 'openai', type: 'multimodal', status: 'active', costPerToken: 0.000005, requests: 15420 },
    { id: 'azure-gpt-4o', name: 'Azure GPT-4o', provider: 'azure_openai', type: 'multimodal', status: 'active', costPerToken: 0.000005, requests: 8932 },
    { id: 'mock', name: 'Mock AI', provider: 'local', type: 'multimodal', status: 'active', costPerToken: 0, requests: 2105 },
  ])

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'openai':
        return 'bg-green-100 text-green-600'
      case 'azure_openai':
        return 'bg-blue-100 text-blue-600'
      case 'local':
        return 'bg-purple-100 text-purple-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Models</h1>
        <p className="text-lg text-gray-600">Configure AI models and validation settings</p>
      </div>

      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-600">
          <span className="font-medium">3 AI models configured</span>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center hover:bg-blue-700 transition-colors font-semibold text-lg">
          <Plus className="w-5 h-5 mr-2" />
          Add Model
        </button>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {models.map((model) => (
          <div key={model.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg mr-3">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{model.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{model.provider.replace('_', ' ')}</p>
                </div>
              </div>
              <div className="flex items-center text-green-600 px-3 py-1 bg-green-50 rounded-full">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">Active</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Cpu className="w-4 h-4 mr-2" />
                  <span className="font-medium">Type</span>
                </div>
                <span className="text-gray-900 font-semibold capitalize">{model.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span className="font-medium">Cost/Token</span>
                </div>
                <span className="text-gray-900 font-semibold">${model.costPerToken}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Zap className="w-4 h-4 mr-2" />
                  <span className="font-medium">Requests</span>
                </div>
                <span className="text-gray-900 font-semibold">{model.requests.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 flex gap-3">
              <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </button>
              <button className="flex-1 flex items-center justify-center px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium">
                <Play className="w-4 h-4 mr-2" />
                Test
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Configuration */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">AI Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Default Model</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-lg">
                <option value="gpt-4o">GPT-4o</option>
                <option value="azure-gpt-4o">Azure GPT-4o</option>
                <option value="mock">Mock AI (Development)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Minimum Confidence Threshold</label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="70"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>0%</span>
                <span className="font-semibold text-gray-900">70%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Rate Limiting (requests/minute)</label>
              <input
                type="number"
                defaultValue="60"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-lg"
              />
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <input type="checkbox" id="caching" className="mr-3 w-5 h-5" defaultChecked />
              <label htmlFor="caching" className="text-gray-900 font-medium">Enable AI response caching</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
