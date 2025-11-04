// Load JSON current events and also the temporary events we add to the localStorage
let jsonEvents = [];
let tempEvents = JSON.parse(localStorage.getItem('tempEvents') || '[]');

fetch('data/events.json')
  .then(response => response.json())
  .then(data => {
    jsonEvents = data.data;
    displayCalendar();
  })
  .catch(error => console.error('Error loading JSON:', error));

  // Displays all the events in the calendar
function displayCalendar() {
  const calendar = document.getElementById('calendar');
  calendar.innerHTML = ''; // Clear previous calendar

  const allEvents = jsonEvents.concat(tempEvents);

  // Inserts the events into the correct days
  const eventsByDay = {};
  allEvents.forEach((match, index) => {
    const date = new Date(match.dateVenue);
    if (date.getMonth() === 10 && date.getFullYear() === 2025) { // November
      const day = date.getDate();
      let eventName = match.homeTeam?.officialName || match.awayTeam?.officialName || match.originCompetitionName || "Event";
      if (!eventsByDay[day]) eventsByDay[day] = [];
      eventsByDay[day].push({ name: eventName, index });
    }
  });

  // Prints out the calendar weekdays
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  weekdays.forEach(day => {
    const header = document.createElement('div');
    header.className = 'header';
    header.textContent = day;
    calendar.appendChild(header);
  });

  // Creates empty cells
  const firstDay = new Date(2025, 10, 1).getDay();
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'day';
    calendar.appendChild(emptyCell);
  }

  // Prints out the days with the corresponding events
  const totalDays = 30;
  for (let day = 1; day <= totalDays; day++) {
    const dayCell = document.createElement('div');
    dayCell.className = 'day';
    dayCell.innerHTML = `<strong>${day}</strong>`;

    if (eventsByDay[day]) {
      eventsByDay[day].forEach(eventObj => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event';

        const link = document.createElement('a');
        link.textContent = eventObj.name;
        link.href = `event_detail.html?index=${eventObj.index}`;
        link.style.textDecoration = 'none';
        link.style.color = 'blue';

        eventDiv.appendChild(link);
        dayCell.appendChild(eventDiv);
      });
    }

    calendar.appendChild(dayCell);
  }
}

