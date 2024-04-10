import Profile from "./Components/ProfileComponent/Profile";
import Feedback from "./Components/FeedbackComponent/Feedback";
import Notification from "./Components/NotificationComponent/Notification";
import DataTable from "./Components/DashboardComponent/UpcomingAppointment";

const rows = [
  { id: "ML23456", name: "John Appleseed", age: 25, status: "Confirmed" },
  { id: "ML23457", name: "John Smith", age: 23, status: "No Info" },
  // Add more rows as needed
];

function App() {
  return (
    <div className="App">
      <Profile />
      <Feedback />
      <Notification />
      <DataTable
      rows = {rows}/>
    </div>
  );
}
export default App;