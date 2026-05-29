import { useNavigate, useParams } from 'react-router-dom'
import { MapPin, Camera, List, ArrowRight, Briefcase, Clock, CheckCircle } from 'lucide-react'

export default function JobDetails() {
  const navigate = useNavigate()
  const { id } = useParams()

  const job = {
    id,
    title: 'Site Inspection - Downtown Project',
    description: 'Complete a comprehensive site inspection including safety checks, equipment verification, and progress documentation.',
    location: {
      address: '123 Main St, Downtown',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    requiredPhotos: 5,
    estimatedTime: '45 minutes',
    checklist: [
      'Verify safety equipment presence',
      'Check emergency exits',
      'Document current progress',
      'Inspect equipment condition',
      'Take site overview photos'
    ]
  }

  const handleStart = () => {
    navigate(`/evidence/${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 pb-16">
        <div className="flex items-center mb-3">
          <div className="p-2 bg-white/20 rounded-lg mr-3">
            <Briefcase className="w-6 h-6" />
          </div>
          <span className="text-sm font-semibold uppercase tracking-wide">Job #{id}</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
        <p className="text-blue-100 text-lg">{job.description}</p>
      </div>

      {/* Content */}
      <div className="px-4 -mt-10">
        <div className="bg-white rounded-xl shadow-xl p-6 space-y-6">
          {/* Location */}
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1 text-lg">Location</h3>
              <p className="text-gray-700 font-medium">{job.location.address}</p>
              <p className="text-sm text-gray-500 mt-1">
                {job.location.coordinates.lat.toFixed(4)}, {job.location.coordinates.lng.toFixed(4)}
              </p>
            </div>
          </div>

          {/* Requirements */}
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <Camera className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1 text-lg">Photos Required</h3>
              <p className="text-gray-700 font-medium">{job.requiredPhotos} photos</p>
            </div>
          </div>

          {/* Time Estimate */}
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1 text-lg">Estimated Time</h3>
              <p className="text-gray-700 font-medium">{job.estimatedTime}</p>
            </div>
          </div>

          {/* Checklist Preview */}
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <div className="bg-orange-100 p-3 rounded-lg mr-4">
              <List className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Checklist Items</h3>
              <ul className="space-y-3">
                {job.checklist.map((item, index) => (
                  <li key={index} className="text-gray-700 flex items-center">
                    <span className="w-7 h-7 bg-white rounded-full flex items-center justify-center mr-3 text-sm font-bold text-gray-600 shadow-sm">
                      {index + 1}
                    </span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center text-lg shadow-lg"
        >
          Start Evidence Capture
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  )
}
