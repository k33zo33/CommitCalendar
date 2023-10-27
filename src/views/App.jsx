import React from 'react';
import './App.css';
import Calendar from '../components/Calendar';
import EventModal from '../components/EventModal'; // Import the EventModal
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';



const engine = new Styletron()

function App() {
  return (
    <StyletronProvider value={ engine }>
    <div className="App">
      <Calendar />
      <EventModal />
    </div>
    </StyletronProvider>
  );
}

export default App;
