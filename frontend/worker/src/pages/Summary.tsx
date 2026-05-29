import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckCircle, Upload, Home, AlertCircle, FileText, MapPin, Camera, List } from 'lucide-react'

export default function Summary() {
  const navigate = useNavigate()
  const { sessionId } = useParams()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const handleSubmit = async () => {
    setIsUploading(true)
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setUploadProgress(i)
    }

    setIsUploading(false)
    setIsComplete(true)
  }

  const handleReturnHome = () => {
    navigate('/')
  }

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 p-4 rounded-full mb-6">
              <CheckCircle className="w-20 h-20 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Evidence Submitted!</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Your evidence has been successfully uploaded and is now being validated. You will receive a confirmation once the review is complete.
            </p>
            
            <div className="w-full bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border border-green-200">
              <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Session ID</p>
              <p className="font-mono text-lg text-gray-900 font-bold">{sessionId}</p>
            </div>

            <button
              onClick={handleReturnHome}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center shadow-lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Return to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-6 pb-16">
        <h1 className="text-3xl font-bold mb-2">Review & Submit</h1>
        <p className="text-blue-100 text-lg">Review your evidence before submitting</p>
      </div>

      <div className="px-4 -mt-10 py-6 space-y-6">
        {/* Summary Cards */}
        <div className="bg-white rounded-xl shadow-xl p-6">
          <h2 className="font-bold text-gray-900 mb-6 text-xl">Evidence Summary</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <Camera className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-700 font-semibold">Photos captured</span>
              </div>
              <span className="font-bold text-gray-900 text-lg">5/5</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-lg mr-3">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-700 font-semibold">GPS location</span>
              </div>
              <span className="font-bold text-green-600 text-lg">Captured</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-lg mr-3">
                  <List className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-gray-700 font-semibold">Checklist items</span>
              </div>
              <span className="font-bold text-gray-900 text-lg">5/5 completed</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-orange-100 p-2 rounded-lg mr-3">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-gray-700 font-semibold">Estimated upload size</span>
              </div>
              <span className="font-bold text-gray-900 text-lg">~15 MB</span>
            </div>
          </div>
        </div>

        {/* Offline Notice */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-5">
          <div className="flex items-start">
            <div className="bg-orange-100 p-2 rounded-lg mr-3 mt-0.5">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="font-bold text-orange-900 mb-1">Offline Mode</p>
              <p className="text-orange-700">
                Your evidence will be cached locally and uploaded automatically when you're back online.
              </p>
            </div>
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="bg-white rounded-xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-gray-900 text-lg">Uploading evidence...</span>
              <span className="text-sm font-bold text-blue-600">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        {!isUploading && (
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center text-lg shadow-lg"
          >
            <Upload className="w-5 h-5 mr-2" />
            Submit Evidence
          </button>
        )}
      </div>
    </div>
  )
}
