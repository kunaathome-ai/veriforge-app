import { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Camera, MapPin, Upload, Check, X, ArrowRight, AlertCircle } from 'lucide-react'

export default function EvidenceCapture() {
  const navigate = useNavigate()
  const { jobId } = useParams()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [photos, setPhotos] = useState<string[]>([])
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)

  const handleCapture = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setPhotos(prev => [...prev, e.target?.result as string])
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Geolocation error:', error)
        }
      )
    }
  }

  const handleRemovePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const handleContinue = () => {
    navigate(`/checklist/${jobId}`)
  }

  const canContinue = photos.length >= 1 && location

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-6 pb-16">
        <h1 className="text-3xl font-bold mb-2">Evidence Capture</h1>
        <p className="text-blue-100 text-lg">Capture photos and location data</p>
      </div>

      <div className="px-4 -mt-10 py-6 space-y-6">
        {/* Photo Capture */}
        <div className="bg-white rounded-xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Camera className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="font-bold text-gray-900 text-lg">Photos</h2>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              photos.length >= 5 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {photos.length}/5 required
            </span>
          </div>

          {photos.length === 0 ? (
            <div
              onClick={handleCapture}
              className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-gray-700 font-semibold mb-2 text-lg">Tap to capture photos</p>
              <p className="text-gray-500">or drag and drop</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-40 object-cover rounded-xl shadow-md" />
                  <button
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs font-medium">
                    #{index + 1}
                  </div>
                </div>
              ))}
              {photos.length < 5 && (
                <div
                  onClick={handleCapture}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center h-40"
                >
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Add photo</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        {/* Location */}
        <div className="bg-white rounded-xl shadow-xl p-6">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-green-100 rounded-lg mr-3">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="font-bold text-gray-900 text-lg">Location</h2>
          </div>
          
          {location ? (
            <div className="flex items-center justify-between bg-green-50 p-4 rounded-xl border border-green-200">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Location captured</p>
                  <p className="text-sm text-gray-600 font-mono">
                    {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setLocation(null)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleGetLocation}
              className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center"
            >
              <div className="bg-gray-100 p-3 rounded-lg mr-3">
                <MapPin className="w-6 h-6 text-gray-400" />
              </div>
              <span className="text-gray-700 font-semibold">Capture GPS location</span>
            </button>
          )}
        </div>

        {/* Validation Message */}
        {!canContinue && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start">
            <AlertCircle className="w-5 h-5 text-amber-600 mr-3 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900">Requirements not met</p>
              <p className="text-sm text-amber-700">Please capture at least 1 photo and location data to continue.</p>
            </div>
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className={`w-full px-6 py-4 rounded-xl font-bold flex items-center justify-center text-lg transition-all ${
            canContinue
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue to Checklist
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  )
}
