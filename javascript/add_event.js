const form = document.getElementById('addEventForm');

// Reads form data 
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const newEvent = {
    dateVenue: document.getElementById('dateVenue').value,
    timeVenueUTC: document.getElementById('timeVenueUTC').value || '',
    sport: document.getElementById('sport').value || '',
    homeTeam: { officialName: document.getElementById('homeTeam').value || '' },
    awayTeam: { officialName: document.getElementById('awayTeam').value || '' }
  };

  // Save the eventin localStorage
  let tempEvents = JSON.parse(localStorage.getItem('tempEvents') || '[]');
  tempEvents.push(newEvent);
  localStorage.setItem('tempEvents', JSON.stringify(tempEvents));

  alert("Event added temporarily! Go back to calendar to see it.");
  form.reset();
});