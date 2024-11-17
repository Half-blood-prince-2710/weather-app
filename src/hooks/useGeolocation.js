import React, { useState ,useEffect} from 'react'

export const useGeolocation = () => {
  const [locationData, setLocationData] = useState({
      lat:"",lon:""
  })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const getLocation = async () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not suppoerted by your browser')
            return;
        }
        setLoading(true);
        try {
            const location = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        })
      })
            setLocationData((prev) => {
                return {
                    ...prev,
                    lat: location.coords.latitude,
                    lon: location.coords.longitude,
                }
            })
        }
        catch (error) {
            let errorMessage;
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage =
                  "Location permission denied. Please enable location access.";
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage =
                  "Location information is unavailable.";
                break;
              case error.TIMEOUT:
                errorMessage =
                  "Location request timed out.";
                break;
              default:
                errorMessage =
                  "An unknown error occurred.";
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }
    //Get location on component mount
    useEffect(() => {
        getLocation()
    }, []);
    
    return { loading, error, locationData, getLocation }
}

