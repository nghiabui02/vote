import {Outlet} from "react-router-dom";

export default function Home(){
    return(
        <div style={{width:'100%', background:'whitesmoke', height:'100vh'}}>
                <Outlet></Outlet>
        </div>
    )
}