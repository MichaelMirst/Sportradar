// Fetch events from external JSON file
fetch('data/events.json')
  .then(response => response.json())
  .then(data => {
    const matches = data.data;

    // Map events to a dictionary keyed by day of November 2025
    const eventsByDay = {};

    matches.forEach((match, index) => { // <-- keep index
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

        // Pass the match index to the details page
        eventsByDay[day].push({ name: eventName, index });
      }
    });

    // Store all matches globally for use in details page
    localStorage.setItem('matches', JSON.stringify(matches));

    createCalendar(eventsByDay);
  })
  .catch(error => console.error('Error loading JSON:', error));

function createCalendar(events) {
  const calendar = document.getElementById('calendar');

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  weekdays.forEach(day => {
    const header = document.createElement('div');
    header.className = 'header';
    header.textContent = day;
    calendar.appendChild(header);
  });

  const firstDay = new Date(2025, 10, 1).getDay();
  const totalDays = 30;
// Se despliega los detalles del calendario 
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'day';
    calendar.appendChild(emptyCell);
  }

  for (let day = 1; day <= totalDays; day++) {
    const dayCell = document.createElement('div');
    dayCell.className = 'day';
    dayCell.innerHTML = `<strong>${day}</strong>`;

    if (events[day]) {
      events[day].forEach(eventObj => {
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
