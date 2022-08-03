import AllDrawingsPage from "./page/AllDrawingsPage";
import {Route,Routes} from "react-router-dom";
import NewDrawingPage from "./page/NewDrawingPage";
import DrawingDetailsPage from "./page/DrawingDetailsPage";
import UserPage from "./page/UserPage";

const MainContent = () => {
    return <>
        <div style={{
            width : "66%",
            margin : "auto"
        }}>
            <Routes>
                <Route path="/" element={<AllDrawingsPage/>}/>
                <Route path="/create" element={<NewDrawingPage/>}/>
                <Route path="/drawing/:id" element={<DrawingDetailsPage/>}/>
                <Route path="/user/:id" element={<UserPage/>}/>
            </Routes>
        </div>
    </>
}

export default MainContent
