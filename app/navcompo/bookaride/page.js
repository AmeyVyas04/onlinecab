'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Footer from '@/app/footer';
import Navbar from '@/app/navbar';

export default function BookRide() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [rideType, setRideType] = useState('standard');
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [route, setRoute] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mapContainer = useRef(null);

  // Initialize map
  useEffect(() => {
    if (mapContainer.current && !map) {
      const initialState = { lng: -74.006, lat: 40.7128, zoom: 12 };
      
      const newMap = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://demotiles.maplibre.org/style.json',
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom
      });

      newMap.addControl(new maplibregl.NavigationControl(), 'top-right');
      
      newMap.on('load', () => {
        setMap(newMap);
      });

      return () => newMap.remove();
    }
  }, []);

  // Geocode address using Nominatim
 // Geocode address using Nominatim
const geocodeAddress = async (address) => {
  if (!address) return null;
  
  try {
    // Use Nominatim API for geocoding with proper headers
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
      {
        headers: {
          'User-Agent': 'ameyforlearning@gmail.com', // Replace with your email
          'Accept-Language': 'en-US,en;q=0.9' // Optional: specify language
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Geocoding failed');
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        lng: parseFloat(data[0].lon),
        lat: parseFloat(data[0].lat),
        address: data[0].display_name
      };
    }
    
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};

  // Get address suggestions using Nominatim
  const getAddressSuggestions = async (query) => {
    if (!query || query.length < 2) return [];
    
    try {
      // Use Nominatim API for autocomplete
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
      );
      
      if (!response.ok) {
        throw new Error('Autocomplete failed');
      }
      
      const data = await response.json();
      return data.map(item => item.display_name);
    } catch (error) {
      console.error('Autocomplete error:', error);
      return [];
    }
  };

  // Handle address input with debounced suggestions
  useEffect(() => {
    const getPickupSuggestions = async () => {
      if (pickup.length > 1) {
        const suggestions = await getAddressSuggestions(pickup);
        setPickupSuggestions(suggestions);
        setShowPickupSuggestions(true);
      } else {
        setPickupSuggestions([]);
        setShowPickupSuggestions(false);
      }
    };
    
    const timer = setTimeout(getPickupSuggestions, 500); // Increased debounce time
    return () => clearTimeout(timer);
  }, [pickup]);

  useEffect(() => {
    const getDestinationSuggestions = async () => {
      if (destination.length > 1) {
        const suggestions = await getAddressSuggestions(destination);
        setDestinationSuggestions(suggestions);
        setShowDestinationSuggestions(true);
      } else {
        setDestinationSuggestions([]);
        setShowDestinationSuggestions(false);
      }
    };
    
    const timer = setTimeout(getDestinationSuggestions, 500);
    return () => clearTimeout(timer);
  }, [destination]);

  // Update map with markers and route
  useEffect(() => {
    if (!map) return;

    const updateMap = async () => {
      setIsLoading(true);
      
      // Remove existing markers
      markers.forEach(marker => marker.remove());
      setMarkers([]);

      // Remove existing route layer if it exists
      if (map.getLayer('route')) {
        map.removeLayer('route');
      }
      if (map.getSource('route')) {
        map.removeSource('route');
      }

      const newMarkers = [];

      // Add pickup marker if exists
      if (pickup) {
        const pickupCoords = await geocodeAddress(pickup);
        if (pickupCoords) {
          const pickupMarker = new maplibregl.Marker({ color: '#4CAF50' })
            .setLngLat([pickupCoords.lng, pickupCoords.lat])
            .setPopup(new maplibregl.Popup().setHTML(`<strong>Pickup:</strong> ${pickupCoords.address}`))
            .addTo(map);
          newMarkers.push(pickupMarker);
        }
      }

      // Add destination marker if exists
      if (destination) {
        const destCoords = await geocodeAddress(destination);
        if (destCoords) {
          const destMarker = new maplibregl.Marker({ color: '#F44336' })
            .setLngLat([destCoords.lng, destCoords.lat])
            .setPopup(new maplibregl.Popup().setHTML(`<strong>Destination:</strong> ${destCoords.address}`))
            .addTo(map);
          newMarkers.push(destMarker);
        }
      }

      setMarkers(newMarkers);

      // Draw route if both pickup and destination exist
      if (pickup && destination) {
        const pickupCoords = await geocodeAddress(pickup);
        const destCoords = await geocodeAddress(destination);
        
        if (pickupCoords && destCoords) {
          // In a real app, you would use a routing service like OSRM
          const routeData = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                [pickupCoords.lng, pickupCoords.lat],
                [destCoords.lng, destCoords.lat]
              ]
            }
          };

          if (map.getSource('route')) {
            map.getSource('route').setData(routeData);
          } else {
            map.addSource('route', {
              type: 'geojson',
              data: routeData
            });

            map.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#3B82F6',
                'line-width': 5,
                'line-opacity': 0.7
              }
            });
          }

          setRoute(routeData);
          
          // Calculate estimated price and time based on distance
          const distance = calculateDistance(
            pickupCoords.lat, pickupCoords.lng,
            destCoords.lat, destCoords.lng
          );
          
          const price = calculatePrice(rideType, distance);
          const time = calculateTime(distance);
          
          setEstimatedPrice(price);
          setEstimatedTime(time);
          
          // Fit map to show both markers
          const bounds = new maplibregl.LngLatBounds()
            .extend([pickupCoords.lng, pickupCoords.lat])
            .extend([destCoords.lng, destCoords.lat]);
          
          map.fitBounds(bounds, { padding: 50, maxZoom: 15 });
        }
      }
      
      setIsLoading(false);
    };

    updateMap();
  }, [pickup, destination, map, rideType]);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  };

  const calculatePrice = (type, distance) => {
    const baseFares = {
      standard: 2.5,
      premium: 4.0,
      suv: 5.0,
      luxury: 8.0
    };
    
    const ratePerKm = {
      standard: 1.5,
      premium: 2.0,
      suv: 2.5,
      luxury: 4.0
    };
    
    return (baseFares[type] + (distance * ratePerKm[type]*40)).toFixed(2);
  };

  const calculateTime = (distance) => {
    // Assuming average speed of 30 km/h in city traffic
    const timeInMinutes = (distance / 30) * 60;
    return Math.ceil(timeInMinutes);
  };

  const handleSuggestionClick = (setter, value, hideSuggestions) => {
    setter(value);
    hideSuggestions(false);
  };

  const handleBookRide = (e) => {
    e.preventDefault();
    if (!pickup || !destination) return;

    alert(`Ride booked from ${pickup} to ${destination}! Estimated price: ₹${estimatedPrice}`);
  };

  const rideTypes = [
    { id: 'standard', name: 'Standard', icon: '🚗', price: '₹2.5 base + ₹1.5/km' },
    { id: 'premium', name: 'Premium', icon: '🚙', price: '₹4.0 base + ₹2.0/km' },
    { id: 'suv', name: 'SUV', icon: '🚐', price: '₹5.0 base + ₹2.5/km' },
    { id: 'luxury', name: 'Luxury', icon: '🚖', price: '₹8.0 base + ₹4.0/km' }
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50">
    

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Book Your Ride</h1>
        <p className="text-gray-600 text-center mb-8">Enter your pickup and destination locations</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <form onSubmit={handleBookRide} className="space-y-6">
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-2">Pickup Location</label>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  onFocus={() => setShowPickupSuggestions(true)}
                  placeholder="Enter pickup address"
                  className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                {showPickupSuggestions && pickupSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-auto">
                    {pickupSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => handleSuggestionClick(setPickup, suggestion, setShowPickupSuggestions)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="block text-gray-700 font-medium mb-2">Destination</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onFocus={() => setShowDestinationSuggestions(true)}
                  placeholder="Enter destination address"
                  className="w-full p-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                {showDestinationSuggestions && destinationSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-auto">
                    {destinationSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-3 hover:bg-gray-100 text-black cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => handleSuggestionClick(setDestination, suggestion, setShowDestinationSuggestions)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-4">Choose Ride Type</label>
                <div className="grid grid-cols-2 gap-4">
                  {rideTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        rideType === type.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setRideType(type.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{type.icon}</span>
                        <div>
                          <div className="font-medium">{type.name}</div>
                          <div className="text-sm text-gray-700">{type.price}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {(estimatedPrice && estimatedTime) && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Estimated Ride Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Estimated Fare</div>
                      <div className="text-xl font-bold text-blue-900">₹{estimatedPrice}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Estimated Time</div>
                      <div className="text-xl font-bold text-blue-900">{estimatedTime} min</div>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={!pickup || !destination || isLoading}
                className="w-full bg-yellow-400 text-blue-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Confirm Booking'
                )}
              </button>
            </form>
          </div>

          {/* Map Container */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-96 relative" ref={mapContainer}>
              {!map && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading map...</p>
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-md z-10">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Pickup</span>
                </div>
                <div className="flex items-center space-x-2 text-sm mt-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Destination</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t">
              <p className="text-sm text-gray-600 text-center">
                Enter pickup and destination locations to see the route on the map
              </p>
            </div>
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Times Square', address: 'Times Square, New York, NY' },
              { name: 'Central Park', address: 'Central Park, New York, NY' },
              { name: 'JFK Airport', address: 'JFK Airport, Queens, NY' }
            ].map((place, index) => (
              <div 
                key={index} 
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors"
                onClick={() => {
                  setDestination(place.address);
                }}
              >
                <div className="font-medium text-gray-900">{place.name}</div>
                <div className="text-sm text-gray-600">{place.address}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}