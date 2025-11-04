// Read the event index from URL
    const params = new URLSearchParams(window.location.search);
    const index = params.get('index');

    // Load matches from localStorage
    const matches = JSON.parse(localStorage.getItem('matches')) || [];
    const match = matches[index];

    if (match) {
      document.getElementById('event-name').textContent = match.originCompetitionName || 'Event';
      document.getElementById('event-date').textContent = `Date: ${match.dateVenue || 'N/A'}`;
      document.getElementById('event-time').textContent = `Time: ${match.timeVenueUTC || 'N/A'}`;
      document.getElementById('event-sport').textContent = `Sport: ${match.sport || 'N/A'}`;
    
    // Construction of the format for the teams display
      let teams = '';
      if (match.homeTeam && match.awayTeam) {
        teams = `${match.homeTeam.officialName} vs ${match.awayTeam.officialName}`;
      } else if (match.homeTeam) {
        teams = match.homeTeam.officialName;
      } else if (match.awayTeam) {
        teams = match.awayTeam.officialName;
      } else {
        teams = 'N/A';
      }
      document.getElementById('event-teams').textContent = `Teams: ${teams}`;
    // In case the event is not found, we provide a link back to the main webpage (calendar_view.html)
    } else {document.body.innerHTML = `
    <p>Event not found.</p>
    <button id="backBtn">Go Back to Calendar</button>
  `;
  document.getElementById('backBtn').addEventListener('click', () => {
    window.location.href = 'calendar_view.html';
  });
}