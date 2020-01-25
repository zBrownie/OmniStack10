import React, { useState, useEffect } from "react";

import './Styles/Global.css'
// import './Styles/Sidebar.css'
// import './Styles/Main.css'
// import api from "./services/api";
import PainelUser from "./components/PainelUser";
import ListaDevs from "./components/ListaDevs";

function App() {
    return <div className="app">
        <PainelUser />
        <ListaDevs />
    </div>;
}

export default App;