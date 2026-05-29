import { useState } from 'react'
import { Plus, Search, Filter, Eye, Edit, Trash2, Briefcase, MapPin } from 'lucide-react'

export default function Jobs() {
  const [jobs] = useState([
    { id: 1, title: 'Site Inspection - Downtown', client: 'Acme Corp', status: 'active', created: '2024-01-15', location: '123 Main St, Downtown' },
    { id: 2, title: 'Equipment Verification', client: 'Tech Solutions', status: 'completed', created: '2024-01-14', location: '456 Tech Ave' },
    { id: 3, title: 'Safety Audit', client: 'BuildCo', status: 'draft', created: '2024-01-13', location: '789 Construction Blvd' },
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Jobs</h1>
        <p className="text-lg text-gray-600">Manage verification jobs and tasks</p>
      </div>

      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-lg"
            />
          </div>
          <button className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </button>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center hover:bg-blue-700 transition-colors font-semibold text-lg">
          <Plus className="w-5 h-5 mr-2" />
          Create Job
        </button>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Job</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-lg">{job.title}</p>
                        <p className="text-sm text-gray-500">#{job.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{job.client}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {job.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      job.status === 'active' ? 'bg-green-100 text-green-800' :
                      job.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{job.created}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900 font-medium flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 font-medium flex items-center">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900 font-medium flex items-center">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
