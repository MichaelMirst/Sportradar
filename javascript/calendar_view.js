// Fetch events from external JSON file
fetch('data/events.json')
  .then(response => response.json())
  .then(data => {
    const matches = data.data;

    // Map events to a dictionary keyed by day of November 2025
    const eventsByDay = {};

    matches.forEach(match => {
      const date = new Date(match.dateVenue);
      if (date.getMonth() === 10 && date.getFullYear() === 2025) { // November 2025
        const day = date.getDate();

        // Use officialName (prefer homeTeam, fallback to awayTeam)
        let eventName = '';
        if (match.homeTeam && match.homeTeam.officialName) {
          eventName = match.homeTeam.officialName;
        } else if (match.awayTeam && match.awayTeam.officialName) {
          eventName = match.awayTeam.officialName;
        } else {
          eventName = "Event";
        }

        if (!eventsByDay[day]) {
          eventsByDay[day] = [];
        }
        eventsByDay[day].push(eventName);
      }
    });

    // Generate the calendar
    createCalendar(eventsByDay);
  })
  .catch(error => console.error('Error loading JSON:', error));

// Function to create the calendar
function createCalendar(events) {
  const calendar = document.getElementById('calendar');

  // Add weekday headers
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  weekdays.forEach(day => {
    const header = document.createElement('div');
    header.className = 'header';
    header.textContent = day;
    calendar.appendChild(header);
  });

  // November 2025 starts on Saturday
  const firstDay = new Date(2025, 10, 1).getDay(); 
  const totalDays = 30;

  // Add blank cells before the first day
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'day';
    calendar.appendChild(emptyCell);
  }

  // Add days with events
  for (let day = 1; day <= totalDays; day++) {
    const dayCell = document.createElement('div');
    dayCell.className = 'day';
    dayCell.innerHTML = `<strong>${day}</strong>`;

    if (events[day]) {
      events[day].forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event';
        eventDiv.textContent = event;
        dayCell.appendChild(eventDiv);
      });
    }

    calendar.appendChild(dayCell);
  }
}
