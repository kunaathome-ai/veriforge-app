import { useState, useEffect } from 'react'
import { Briefcase, Users, CheckCircle, AlertCircle, TrendingUp, Clock, Activity } from 'lucide-react'

interface DashboardStats {
  totalJobs: number
  activeJobs: number
  totalClients: number
  pendingValidations: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    activeJobs: 0,
    totalClients: 0,
    pendingValidations: 0
  })

  useEffect(() => {
    // Mock data - replace with API calls
    setStats({
      totalJobs: 150,
      activeJobs: 45,
      totalClients: 12,
      pendingValidations: 23
    })
  }, [])

  const statCards = [
    {
      name: 'Total Jobs',
      value: stats.totalJobs,
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      name: 'Active Jobs',
      value: stats.activeJobs,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      name: 'Total Clients',
      value: stats.totalClients,
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      name: 'Pending Validations',
      value: stats.pendingValidations,
      icon: AlertCircle,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-lg text-gray-600">Welcome to Veriforge Admin Console</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">{stat.name}</p>
                <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-xl bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
          <div className="flex items-center text-gray-500">
            <Activity className="w-5 h-5 mr-2" />
            <span className="text-sm">Last 24 hours</span>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center flex-1">
                <div className={`p-2 rounded-lg mr-4 ${i % 2 === 0 ? 'bg-green-100' : 'bg-blue-100'}`}>
                  {i % 2 === 0 ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Job #{1000 + i} completed</p>
                  <p className="text-sm text-gray-600">Session validation passed successfully</p>
                </div>
              </div>
              <span className="text-sm text-gray-500 font-medium">{i}h ago</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <TrendingUp className="w-8 h-8 mb-4" />
          <h3 className="text-xl font-bold mb-2">Create New Job</h3>
          <p className="text-blue-100 mb-4">Start a new verification task</p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Create Job
          </button>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <Users className="w-8 h-8 mb-4" />
          <h3 className="text-xl font-bold mb-2">Add Client</h3>
          <p className="text-purple-100 mb-4">Onboard a new client</p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
            Add Client
          </button>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <CheckCircle className="w-8 h-8 mb-4" />
          <h3 className="text-xl font-bold mb-2">View Reports</h3>
          <p className="text-green-100 mb-4">Access verification reports</p>
          <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors">
            View Reports
          </button>
        </div>
      </div>
    </div>
  )
}
