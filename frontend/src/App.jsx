import React, { useState } from 'react';
import { AlertCircle, Leaf, Loader2, Plane as Plant, Droplet, Mountain, Wind } from 'lucide-react';
import axios from "axios";

const slogans = [
  "Healthy Soil, Healthy Life.",
  "Nurture the soil, it nurtures you.",
  "AI-driven insights for sustainable farming.",
  "Your soil's story, told through data.",
  "Precision farming starts with soil health."
];

function App() {
  const [currentSlogan, setCurrentSlogan] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState('')
  const [recommendations, setRecommendations] = useState('')
  const [soilData, setSoilData] = useState({
    moisture: '',
    temperature: '',
    humidity: '',
    light: '',
    ph: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    conductivity: '',
    hour: 24,
    day: 1,
    month: 1
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatResponse = (text) => {
    return text
      .replace(/#/g, "") // Remove hash (#) symbols
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert **bold** to <strong>text</strong>
      .replace(/\*(.*?)\*/g, "$1") // Remove *italic* markers
      .replace(/- /g, "• ") // Convert "- " to "• "
      .replace(/\d+\.\s/g, "<br><br>") // Add spacing before numbered items
  };  

  const handleInputChange = (e) => {
    setSoilData({
      ...soilData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!soilData.moisture || !soilData.temperature || !soilData.humidity || 
      !soilData.light || !soilData.ph || !soilData.nitrogen || !soilData.phosphorus ||
      !soilData.potassium || !soilData.conductivity
    ) {
      alert("Please fill all the fields")
      return 
    }

    console.log(JSON.stringify(soilData, null, 2));

    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:8000/predict', 
        JSON.stringify({
          moisture: Number(soilData.moisture),
          temperature: Number(soilData.temperature),
          humidity: Number(soilData.humidity),
          light: Number(soilData.light),
          ph: Number(soilData.ph),
          nitrogen: Number(soilData.nitrogen),
          phosphorus: Number(soilData.phosphorus),
          potassium: Number(soilData.potassium),
          conductivity: Number(soilData.conductivity),
          hour: 24,
          day: 1,
          month: 1
        })
        , {
        headers: {
          "Content-Type": "application/json",
        }
      }) 
      // console.log("Full Response:", response); // Log entire response
      // console.log("Response Data:", ); // Log response body
      setResult(response.data.soil_health || "No data received");
      console.log(result)

      const tips = await axios.post('https://api.groq.com/openai/v1/chat/completions',
        {
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `You are an expert in soil health analysis and sustainable agriculture. 
              Your goal is to help farmers improve soil fertility, optimize fertilizer usage, 
              and enhance crop productivity through practical and scientific recommendations`,
            },
            { 
              role: "user", 
              content: `I am a farmer looking for guidance on maintaining and improving my soil health. 
                        Based on a predictive analysis, my soil condition is classified as "${result}". 
                        Here is the data collected from my soil:

                      - **Moisture Level**: ${soilData.moisture}
                      - **Temperature**: ${soilData.temperature}°C
                      - **Humidity**: ${soilData.humidity}%
                      - **Light Intensity**: ${soilData.light}
                      - **pH Level**: ${soilData.ph}
                      - **Nitrogen Content**: ${soilData.nitrogen}
                      - **Phosphorus Content**: ${soilData.phosphorus}
                      - **Potassium Content**: ${soilData.potassium}
                      - **Electrical Conductivity**: ${soilData.conductivity}
                      - **Time of Data Collection**: ${soilData.hour}:00 on ${soilData.day}/${soilData.month}

                      Based on this data, please provide me with:

                      1. **Soil Health Diagnosis**: A summary of my soil's current condition.
                      2. **Actionable Improvement Tips**: Steps I can take to enhance soil fertility.
                      3. **Fertilizer Recommendations**: Optimal nutrient management strategies.
                      4. **Sustainable Farming Practices**: Techniques to ensure long-term soil health.
                      5. **Crop-Specific Advice** *(if possible)*: Best crops suitable for my soil conditions.

                      Please ensure that the recommendations are **practical, region-independent, and scientifically backed.**`
            },
          ],
        },
        {
          headers: {
            Authorization:
            "Bearer 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",
            "Content-Type": "application/json",
          },
        }
      )

      const formattedResponse = formatResponse(tips.data.choices[0].message.content)

      setRecommendations(formattedResponse)

      // setResult('')

    } catch (error) {
      console.error("Error", error);
    }
    
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
              {/* moisture Input */}
              <div className="relative">
                <label className="flex items-center text-sm font-medium mb-2">
                  <Mountain className="w-4 h-4 mr-2" />
                  Moisture
                </label>
                <input
                  type="number"
                  name="moisture"
                  value={soilData.moisture}
                  onChange={handleInputChange}  
                  step="0.1"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* temperature Input */}
              <div className="relative">
                <label className="flex items-center text-sm font-medium mb-2">
                  <Leaf className="w-4 h-4 mr-2" />
                  Temperature (celcius)
                </label>
                <input
                  type="number"
                  name="temperature"
                  value={soilData.temperature}
                  onChange={handleInputChange} 
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* humidity Input */}
              <div className="relative">
                <label className="flex items-center text-sm font-medium mb-2">
                  <Plant className="w-4 h-4 mr-2" />
                  Humidity
                </label>
                <input
                  type="number"
                  name="humidity"
                  value={soilData.humidity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* light intensity Input */}
              <div className="relative">
                <label className="flex items-center text-sm font-medium mb-2">
                  <Mountain className="w-4 h-4 mr-2" />
                  Light Intensity
                </label>
                <input
                  type="number"
                  name="light"
                  value={soilData.light}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* ph Input */}
              <div className="relative">
                <label className="flex items-center text-sm font-medium mb-2">
                  <Droplet className="w-4 h-4 mr-2" />
                  pH
                </label>
                <input
                  type="number"
                  name="ph"
                  value={soilData.ph}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* nitrogen Input */}
              <div className="relative">
                <label className="flex items-center text-sm font-medium mb-2">
                  <Wind className="w-4 h-4 mr-2" />
                  Nitrogen
                </label>
                <input
                  type="number"
                  name="nitrogen"
                  value={soilData.nitrogen}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* phosphorus Input */}
              <div className="relative">
                <label className="flex items-center text-sm font-medium mb-2">
                  <Wind className="w-4 h-4 mr-2" />
                  Phosphorus
                </label>
                <input
                  type="number"
                  name="phosphorus"
                  value={soilData.phosphorus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* potassium Input */}
              <div className="relative">
                <label className="flex items-center text-sm font-medium mb-2">
                  <Wind className="w-4 h-4 mr-2" />
                  Potassium
                </label>
                <input
                  type="number"
                  name="potassium"
                  value={soilData.potassium}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* conductivity Input */}
              <div className="relative">
                <label className="flex items-center text-sm font-medium mb-2">
                  <Wind className="w-4 h-4 mr-2" />
                  Conductivity
                </label>
                <input
                  type="number"
                  name="conductivity"
                  value={soilData.conductivity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex-1 flex-col justify-center mt-8">
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
              <div className='text-3xl font-bold my-10'>
                Soil Health: {result}
              </div>
              
                {
                  recommendations === '' ? '' : 
                  (
                  <div className='bg-green-300/10 p-4 rounded-lg'>
                  <div className='flex flex-col'>
                    <div className='text-2xl my-6 font-semibold'>
                      Recommendations to maintain soil health
                    </div>
                    <div>
                      <div dangerouslySetInnerHTML={{ __html: recommendations }} />
                    </div>
                  </div>
                  </div>
                  )
                }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;