import { useState } from 'react';
import { 
  MessageSquare, 
  Newspaper, 
  ChevronDown, 
  ChevronUp, 
  Edit2, 
  ArrowLeftRight,
  Download,
  TrendingUp,
  Droplets,
  Zap,
  Trash2,
  FileText,
  BarChart3,
  AlertTriangle,
  MapPin
} from 'lucide-react';
import type { Supplier, SupplierNote } from '../types';

interface SupplierListProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  selectedId?: string;
}

export default function SupplierList({ suppliers, onEdit, selectedId }: SupplierListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [userNotes, setUserNotes] = useState<{ [key: string]: string }>({});
  const [supplierNotes, setSupplierNotes] = useState<{ [key: string]: SupplierNote[] }>({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const addNote = (supplierId: string) => {
    const noteContent = userNotes[supplierId]?.trim();
    if (!noteContent) return;

    const newNote: SupplierNote = {
      id: Date.now().toString(),
      content: noteContent,
      date: new Date().toISOString(),
    };

    setSupplierNotes(prev => ({
      ...prev,
      [supplierId]: [...(prev[supplierId] || []), newNote],
    }));

    setUserNotes(prev => ({
      ...prev,
      [supplierId]: '',
    }));
  };

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleComparison = (id: string) => {
    setSelectedForComparison(prev => {
      if (prev.includes(id)) {
        return prev.filter(supplierId => supplierId !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const downloadReport = (supplier: Supplier) => {
    const reportData = {
      supplier,
      date: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${supplier.name.toLowerCase().replace(/\s+/g, '-')}-report.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMetricTrend = (value: number) => {
    const trend = value > 75 ? 'up' : value > 50 ? 'neutral' : 'down';
    return {
      icon: trend === 'up' ? TrendingUp : trend === 'down' ? Trash2 : BarChart3,
      color: trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-yellow-600',
    };
  };

  return (
    <div className="space-y-6">
      {suppliers.map((supplier) => (
        <div
          key={supplier.id}
          id={`supplier-${supplier.id}`}
          className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
            selectedId === supplier.id ? 'ring-2 ring-green-500' : ''
          } ${
            hoveredCard === supplier.id ? 'transform -translate-y-1' : ''
          }`}
          onMouseEnter={() => setHoveredCard(supplier.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  {supplier.name}
                  {supplier.sustainabilityScore >= 90 && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Top Performer
                    </span>
                  )}
                </h3>
                <p className="text-gray-500 flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {supplier.location}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => downloadReport(supplier)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                  title="Download Report"
                >
                  <Download className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onEdit(supplier)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                  title="Edit Supplier"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => toggleComparison(supplier.id)}
                  className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                    selectedForComparison.includes(supplier.id)
                      ? 'text-green-600'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  title="Compare Supplier"
                >
                  <ArrowLeftRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => toggleExpanded(supplier.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                >
                  {expandedId === supplier.id ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="bg-gray-50 rounded-lg p-4 transition-all hover:shadow-md">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Sustainability Score</p>
                  <TrendingUp className={`h-5 w-5 ${getScoreColor(supplier.sustainabilityScore)}`} />
                </div>
                <p className={`text-2xl font-bold mt-2 ${getScoreColor(supplier.sustainabilityScore)}`}>
                  {supplier.sustainabilityScore}%
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 transition-all hover:shadow-md">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Carbon Footprint</p>
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-2xl font-bold mt-2 text-blue-600">
                  {supplier.metrics.carbonFootprint}
                  <span className="text-sm font-normal text-gray-500 ml-1">tons</span>
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 transition-all hover:shadow-md">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Energy Efficiency</p>
                  <Zap className="h-5 w-5 text-yellow-600" />
                </div>
                <p className="text-2xl font-bold mt-2 text-yellow-600">
                  {supplier.metrics.energyEfficiency}%
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 transition-all hover:shadow-md">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Water Usage</p>
                  <Droplets className="h-5 w-5 text-cyan-600" />
                </div>
                <p className="text-2xl font-bold mt-2 text-cyan-600">
                  {supplier.metrics.waterUsage}
                  <span className="text-sm font-normal text-gray-500 ml-1">gal</span>
                </p>
              </div>
            </div>

            {expandedId === supplier.id && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 flex items-center mb-4">
                    <MessageSquare className="h-4 w-4 mr-2 text-pink-600" />
                    Notes & Reports
                  </h4>
                  <div className="space-y-4">
                    <div className="flex gap-2 flex-wrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Preferred Supplier
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        High Priority
                      </span>
                      {supplier.sustainabilityScore >= 85 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Eco Leader
                        </span>
                      )}
                    </div>

                    <div className="space-y-3">
                      <textarea
                        className="w-full p-3 border rounded-lg text-sm resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Add notes about this supplier..."
                        value={userNotes[supplier.id] || ''}
                        onChange={(e) => setUserNotes({
                          ...userNotes,
                          [supplier.id]: e.target.value
                        })}
                        rows={3}
                      />
                      <button
                        onClick={() => addNote(supplier.id)}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Add Note
                      </button>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-gray-900 flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-gray-600" />
                        Available Reports
                      </h5>
                      <div className="space-y-2">
                        <button
                          onClick={() => downloadReport(supplier)}
                          className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-sm text-gray-600">Sustainability Report</span>
                          <Download className="h-4 w-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => downloadReport(supplier)}
                          className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-sm text-gray-600">Environmental Impact Analysis</span>
                          <Download className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 flex items-center mb-4">
                    <Newspaper className="h-4 w-4 mr-2 text-indigo-600" />
                    Latest Updates
                  </h4>
                  <div className="space-y-4">
                    {supplierNotes[supplier.id]?.map((note) => (
                      <div key={note.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-sm">{note.content}</p>
                        <p className="text-xs text-gray-500 mt-2 flex items-center">
                          <FileText className="h-3 w-3 mr-1" />
                          {new Date(note.date).toLocaleDateString()} at{' '}
                          {new Date(note.date).toLocaleTimeString()}
                        </p>
                      </div>
                    ))}
                    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">New Solar Installation Complete</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          New
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 flex items-center">
                        <FileText className="h-3 w-3 mr-1" />
                        2 days ago
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">ISO 14001 Certification Achieved</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Achievement
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 flex items-center">
                        <FileText className="h-3 w-3 mr-1" />
                        1 week ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}