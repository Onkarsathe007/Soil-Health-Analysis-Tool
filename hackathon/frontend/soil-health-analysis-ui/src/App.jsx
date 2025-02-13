import React, { useState } from 'react';
import { AlertCircle, Leaf, Loader2, Plane as Plant, Droplet, Mountain, Wind } from 'lucide-react';

const slogans = [
  "Healthy Soil, Healthy Life.",
  "Nurture the soil, it nurtures you.",
  "AI-driven insights for sustainable farming.",
  "Your soil's story, told through data.",
  "Precision farming starts with soil health."
];

function App() {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [soilData, setSoilData] = useState({
    ph: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    moisture: '',
    contamination: ''
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    setSoilData({
      ...soilData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Plant className="h-16 w-16 text-green-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Soil Health Analysis
            </h1>
            <p className="mt-3 text-xl text-gray-300">
              {slogans[currentSlogan]}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* pH Input */}
              <div className="relative">
                <label className="flex items-center text-sm font-medium mb-2">
                  <Mountain className="w-4 h-4 mr-2" />
                  pH Level
                </label>
                <input
                  type="number"
                  name="ph"
                  value={soilData.ph}
                  onChange={handleInputChange}
                  placeholder="0-14"
                  step="0.1"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <div className="absolute right-0 top-0 mt-2 mr-2">
                  <div className="group relative">
                    <AlertCircle className="w-4 h-4 text-gray-400" />
                    <div className="hidden group-hover:block absolute z-10 w-48 p-2 mt-2 text-sm bg-gray-900 rounded-md shadow-lg -right-1">
                      Measure pH level (0-14)
                    </div>
                  </div>
                </div>
              </div>

              {/* Nitrogen Input */}
              <div className="relative">
                <label className="flex items-center text-sm font-medium mb-2">
                  <Leaf className="w-4 h-4 mr-2" />
                  Nitrogen (N)
                </label>
                <input
                  type="number"
                  name="nitrogen"
                  value={soilData.nitrogen}
                  onChange={handleInputChange}
                  placeholder="0-100 mg/kg"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Phosphorus Input */}
              <div className="relative">
                <label className="flex items-center text-sm font-medium mb-2">
                  <Plant className="w-4 h-4 mr-2" />
                  Phosphorus (P)
                </label>
                <input
                  type="number"
                  name="phosphorus"
                  value={soilData.phosphorus}
                  onChange={handleInputChange}
                  placeholder="0-100 mg/kg"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Potassium Input */}
              <div className="relative">
                <label className="flex items-center text-sm font-medium mb-2">
                  <Mountain className="w-4 h-4 mr-2" />
                  Potassium (K)
                </label>
                <input
                  type="number"
                  name="potassium"
                  value={soilData.potassium}
                  onChange={handleInputChange}
                  placeholder="0-100 mg/kg"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Moisture Input */}
              <div className="relative">
                <label className="flex items-center text-sm font-medium mb-2">
                  <Droplet className="w-4 h-4 mr-2" />
                  Moisture Content
                </label>
                <input
                  type="number"
                  name="moisture"
                  value={soilData.moisture}
                  onChange={handleInputChange}
                  placeholder="0-100%"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Contamination Input */}
              <div className="relative">
                <label className="flex items-center text-sm font-medium mb-2">
                  <Wind className="w-4 h-4 mr-2" />
                  Contamination Level
                </label>
                <input
                  type="number"
                  name="contamination"
                  value={soilData.contamination}
                  onChange={handleInputChange}
                  placeholder="0-10"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Soil Health'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;