import Header from '../header/Header';
import { Route, Routes } from 'react-router-dom';
import Calendar from './../Calendar/Calendar';


function Home() {
    return (
        <div className="App">
            <Header />
            <h2>Home</h2>
        </div>
    )
}


export default Home;