import {Route, Routes} from "react-router-dom";
import Vote from "./page/vote/vote";
import Admin from "./page/admin/admin";
import ThankYou from "./page/thankYou/thankYou";
import Home from "./page/home";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='' element={<Home/>}>
                    <Route path='' element={<Vote/>}/>
                    <Route path='admin' element={<Admin/>}/>
                    <Route path='thank' element={<ThankYou/>}/>
                </Route>
            </Routes>
            <ToastContainer position='top-center' theme='colored'/>
        </div>
    );
}

export default App;


