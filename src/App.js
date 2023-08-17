
import { Box } from "@mui/material";
import GoogleMapComponent from "./Components/GoogleMap/GoogleMapComponent";
import AutoSearch from "./Components/AutoComplete/AutoSearch";

function App() {
  return (
   <Box  >
       <AutoSearch />
       <GoogleMapComponent/>
   </Box>
  );
}

export default App;
