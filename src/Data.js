import "./Data.css"
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState,useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import db from "./firebase"
const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2021, 6, 0),
        end: new Date(2021, 6, 0),
    },
    {
        title: "Vacation",
        start: new Date(2021, 6, 7),
        end: new Date(2021, 6, 10),
    },
    {
        title: "Conference",
        start: new Date(2021, 6, 20),
        end: new Date(2021, 6, 23),
    },
];
console.log(events)

function Data() {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);
    const [dates,setDates] = useState([]);

    function handleAddEvent(e) {
        setAllEvents([...allEvents, newEvent]);
        e.preventDefault();
        db.collection('dates').add({
           title:newEvent.title,
           start:newEvent.start,
           end:newEvent.end

        })
        // does not refresh once the value is submited
        setNewEvent(""); //reset the input field
    } 
    useEffect(() => {
        function date(seconds){
            return new Date(seconds * 1000).toUTCString();
            
        }
        db.collection('dates').onSnapshot((snapshot)=>
        setAllEvents(snapshot.docs.map((doc)=> {
            let item = doc.data();
            return {"title" : item.title, "start" : date(item.start.seconds), "end" : date(item.end.seconds) }
        })))
         
        }
     , [])
     
  console.log(JSON.stringify(allEvents))
   
 


    return (
        <div className="App">
            <h1>Calendar</h1>
            <h2>Add New Event</h2>
            <div>
                <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Add Event
                </button>
            </div>
            <Calendar localizer={localizer} 
            events={allEvents} 
            startAccessor="start"
            endAccessor="end" style={{ height: 500, margin: "50px" }} />
            
            <div class="container">
                <h2>Responsive Tables Using LI <small>Triggers on 767px</small></h2>
                <ul class="responsive-table">
                    <li class="table-header">
                    <div class="col col-2">Title</div>
                    <div class="col col-3">Start Date</div>
                    <div class="col col-4">End Date</div>
                    </li>
                    <li class="table-row">
                    <div class="col col-2" data-label="Customer Name">John Doe</div>
                    <div class="col col-3" data-label="Amount">$350</div>
                    <div class="col col-4" data-label="Payment Status">Pending</div>
                    </li>
                    <li class="table-row">
                    <div class="col col-2" data-label="Customer Name">Jennifer Smith</div>
                    <div class="col col-3" data-label="Amount">$220</div>
                    <div class="col col-4" data-label="Payment Status">Pending</div>
                    </li>
                    <li class="table-row">
                    <div class="col col-2" data-label="Customer Name">John Smith</div>
                    <div class="col col-3" data-label="Amount">$341</div>
                    <div class="col col-4" data-label="Payment Status">Pending</div>
                    </li>
                    <li class="table-row">
                    <div class="col col-1" data-label="Job Id">42311</div>
                    <div class="col col-2" data-label="Customer Name">John Carpenter</div>
                    <div class="col col-3" data-label="Amount">$115</div>
                    <div class="col col-4" data-label="Payment Status">Pending</div>
                    </li>
                </ul>
                </div>
           
        </div>
    );
}

export default Data;