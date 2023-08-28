import React, { useMemo } from 'react'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { GoogleMap, MarkerF} from '@react-google-maps/api';



const containerStyle = {
  width: '100%',
  height: '100%'
};

export default function GoogleMapComponent() {


  // const { isLoaded} = useLoadScript({ googleMapsApiKey: 'AIzaSyC16A6VCqw7DnuemFPhcboMyihjApiNKKU'});
    
    const latitude = useSelector(state=>state.latlong.latitude);
    const longitude =useSelector(state=>state.latlong.longitude);
       
    const latlng = useMemo(() => ({ lat: latitude, lng: longitude }), [
      latitude,
      longitude
    ]);
  
    const center = useMemo(() => ({ lat: 20.5937, lng: 78.9629 }), []);    
  return (
   <Box width={'100%'} height={'100vh'} >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={latlng.lat && latlng.lng ? latlng  :  center}
        zoom={latlng.lat && latlng.lng  ? 10 : 5} 
      >
       {latlng.lat && latlng.lng &&  <MarkerF position={latlng} />}
      </GoogleMap>
   </Box>
  )
}
