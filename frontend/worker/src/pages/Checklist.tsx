import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Check, ChevronRight, Camera, FileText, AlertCircle, List } from 'lucide-react'

interface ChecklistItem {
  id: string
  text: string
  type: 'boolean' | 'text' | 'photo'
  completed: boolean
  notes?: string
}

export default function Checklist() {
  const navigate = useNavigate()
  const { jobId } = useParams()
  
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: '1', text: 'Verify safety equipment presence', type: 'boolean', completed: false },
    { id: '2', text: 'Check emergency exits', type: 'boolean', completed: false },
    { id: '3', text: 'Document current progress', type: 'text', completed: false, notes: '' },
    { id: '4', text: 'Inspect equipment condition', type: 'boolean', completed: false },
    { id: '5', text: 'Take site overview photos', type: 'photo', completed: false },
  ])

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const updateNotes = (id: string, notes: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, notes } : item
    ))
  }

  const handleSubmit = () => {
    // Submit evidence and navigate to summary
    navigate('/summary/abc123')
  }

  const completedCount = items.filter(item => item.completed).length
  const totalCount = items.length
  const progress = (completedCount / totalCount) * 100

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <FileText className="w-4 h-4" />
      case 'photo':
        return <Camera className="w-4 h-4" />
      default:
        return <Check className="w-4 h-4" />
    }
  }

  const getItemColor = (type: string) => {
    switch (type) {
      case 'text':
        return 'bg-purple-100 text-purple-600'
      case 'photo':
        return 'bg-blue-100 text-blue-600'
      default:
        return 'bg-green-100 text-green-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-6 pb-16">
        <div className="flex items-center mb-3">
          <div className="p-2 bg-white/20 rounded-lg mr-3">
            <List className="w-6 h-6" />
          </div>
          <span className="text-sm font-semibold uppercase tracking-wide">Job #{jobId}</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Checklist</h1>
        <div className="flex items-center mt-4">
          <div className="flex-1 bg-white/30 rounded-full h-3">
            <div 
              className="bg-white h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="ml-3 text-sm font-semibold">{completedCount}/{totalCount}</span>
        </div>
      </div>

      <div className="px-4 -mt-10 py-6 space-y-4">
        {items.map((item) => (
          <div 
            key={item.id} 
            className={`bg-white rounded-xl shadow-lg p-5 border-2 transition-all ${
              item.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start">
              <button
                onClick={() => toggleItem(item.id)}
                className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 transition-all ${
                  item.completed 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : 'border-gray-300 hover:border-blue-500'
                }`}
              >
                {item.completed && <Check className="w-5 h-5" />}
              </button>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className={`p-2 rounded-lg mr-3 ${getItemColor(item.type)}`}>
                    {getItemIcon(item.type)}
                  </div>
                  <p className={`font-bold text-lg ${item.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {item.text}
                  </p>
                </div>
                {item.type === 'text' && (
                  <textarea
                    value={item.notes || ''}
                    onChange={(e) => updateNotes(item.id, e.target.value)}
                    placeholder="Add notes..."
                    className="w-full mt-3 p-3 border-2 border-gray-200 rounded-xl text-sm resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    rows={3}
                  />
                )}
                {item.type === 'photo' && (
                  <button className="mt-3 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold flex items-center hover:bg-blue-100 transition-colors">
                    <Camera className="w-4 h-4 mr-2" />
                    Add photo
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Validation Message */}
        {completedCount < totalCount && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start">
            <AlertCircle className="w-5 h-5 text-amber-600 mr-3 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900">Complete all items</p>
              <p className="text-sm text-amber-700">Please complete all checklist items before submitting.</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={completedCount < totalCount}
          className={`w-full px-6 py-4 rounded-xl font-bold flex items-center justify-center text-lg transition-all ${
            completedCount >= totalCount
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit Evidence
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  )
}
