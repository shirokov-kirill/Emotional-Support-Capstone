import Header from '../header/Header';
import EmotionAssesmentNotification from './EmotionAssesmentNotification/EmotionAssesmentNotification';


function HealthProviderHome() {
    return (
        <div className="App">
            <Header/>
            <h2>Home Page for Health Provider</h2>
            <EmotionAssesmentNotification/>
        </div>
    )
}


export default HealthProviderHome;