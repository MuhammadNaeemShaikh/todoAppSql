import { BrowserRouter, Route, Routes } from "react-router-dom";
import DisplayRecords from "./component/DisplayRecords";
import AddRecords from "./component/AddRecord";
import UpdateRecord from "./component/UpdateRecord";

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<DisplayRecords/>} />
          <Route path="/addRecords" element={<AddRecords/>}/>
          <Route path="/updateRecords/:id" element={<UpdateRecord/>} />
        </Routes>
       </BrowserRouter>

       {/* <UpdateRecord/> */}
      
    </div>
  );
}

export default App;
