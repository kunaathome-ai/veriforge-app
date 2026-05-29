import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, CheckCircle, AlertCircle, Loader2, Shield, Briefcase } from 'lucide-react'

interface Props {
  token: string | null
}

export default function MagicLink({ token }: Props) {
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'valid' | 'invalid' | 'expired'>('loading')
  const [jobTitle, setJobTitle] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('invalid')
      return
    }

    // Validate magic link
    validateToken(token)
  }, [token])

  const validateToken = async (token: string) => {
    try {
      // Simulate API call - replace with actual validation
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock validation
      setStatus('valid')
      setJobTitle('Site Inspection - Downtown Project')
    } catch (error) {
      setStatus('invalid')
    }
  }

  const handleStart = () => {
    navigate('/job/123')
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full mb-6">
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Validating Magic Link</h2>
            <p className="text-gray-600 text-center text-lg">Please wait while we verify your access...</p>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'invalid') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-orange-600">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
          <div className="flex flex-col items-center">
            <div className="bg-red-100 p-4 rounded-full mb-6">
              <AlertCircle className="w-16 h-16 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Link</h2>
            <p className="text-gray-600 text-center mb-6 text-lg">This magic link is invalid or has already been used.</p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-red-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors text-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center">
          <div className="bg-green-100 p-4 rounded-full mb-6">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Access Verified</h2>
          <p className="text-gray-600 text-center mb-6 text-lg">You have been granted access to complete this task.</p>
          
          <div className="w-full bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border border-blue-100">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Task</p>
            </div>
            <p className="text-xl font-bold text-gray-900">{jobTitle}</p>
          </div>

          <div className="flex items-center justify-center text-gray-600 mb-6 p-4 bg-gray-50 rounded-lg w-full">
            <Shield className="w-5 h-5 mr-2 text-green-600" />
            <span className="font-medium">Secure connection verified</span>
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all text-lg shadow-lg"
          >
            Start Task
          </button>
        </div>
      </div>
    </div>
  )
}
