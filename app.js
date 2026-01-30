// Data
const agents = [
    { id: 'karkian', name: 'Dr. Karkian', location: 'Jacksonville, FL', image: 'drkarkian_1.png' },
    { id: 'moose', name: 'Moose', location: 'San Fernandina Beach, FL', image: 'moose_1.png' },
    { id: 'tbone', name: 'T-Bone', location: 'Washington DC', image: 'tbone_1.png' },
    { id: 'manishbee', name: 'Manishbee', location: 'Gainesville, FL', image: 'manish_1.png' },
    { id: 'superswiss', name: 'SuperSwiss', location: 'Orlando, FL', image: 'superswiss.png' },
];

const missions = [
    { id: 'ticket', label: 'Acquire Park Ticket', icon: '🎫' },
    { id: 'app', label: 'Download Universal App', icon: '📱' },
    { id: 'packing', label: 'Pack Mission Essentials', icon: '🎒' },
    { id: 'preferences', label: 'Submit Preference Profile', icon: '✅' },
];

const arrivalItems = [
    { id: 'checkin', label: 'Complete Hotel Check-In', icon: '🏨' },
    { id: 'roomkey', label: 'Obtain Room Key (Required for Early Entry!)', icon: '🔑' },
    { id: 'roommate', label: 'Confirm Roommate Assignments', icon: '👥' },
    { id: 'dinner', label: 'Coordinate Dinner Plans', icon: '🍽️' },
    { id: 'rides', label: 'Discuss First Ride Strategy', icon: '🎢' },
];

const rides = [
    { name: 'Stardust Racers', zone: 'How to Train Your Dragon Island' },
    { name: "Hiccup's Wing Gliders", zone: 'How to Train Your Dragon Island' },
    { name: 'Mario Kart: Bowser\'s Challenge', zone: 'Super Nintendo World' },
    { name: 'Donkey Kong: Mine Cart Madness', zone: 'Super Nintendo World' },
    { name: 'Monsters Unchained: Frankenstein Experiment', zone: 'Dark Universe' },
    { name: 'Harry Potter & the Battle at the Ministry', zone: 'The Wizarding World' },
    { name: 'Fyre Drill', zone: 'How to Train Your Dragon Island' },
    { name: 'Bowser Jr. Challenge', zone: 'Super Nintendo World' },
    { name: 'Harry Potter Show', zone: 'The Wizarding World' },
    { name: 'How to Train Your Dragon Show', zone: 'How to Train Your Dragon Island' },
];

const resources = [
    { name: 'Hotel: Endless Summer Resort - Surfside', detail: '7000 Universal Blvd, Orlando, FL 32819', url: 'https://www.universalorlando.com' },
    { name: 'Park Info & Map', detail: 'Epic Universe Details', url: 'https://www.universalorlando.com/web/en/us/theme-parks/epic-universe' },
    { name: 'Wait Times Tracker', detail: 'Real-Time Status', url: 'https://www.thrill-data.com/waittimes/epic-universe' },
    { name: 'Trip Playlist', detail: 'Spotify Mix', url: 'https://open.spotify.com/playlist/7FIdW1JcJbnDznMXDtP9Px' },
];

// State
let currentAgent = null;
let data = loadData();

// Load data from localStorage
function loadData() {
    const saved = localStorage.getItem('epicUniverseData');
    return saved ? JSON.parse(saved) : {
        completedMissions: {},
        arrivalChecklist: {},
        preferences: {}
    };
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('epicUniverseData', JSON.stringify(data));
}

// Initialize
function init() {
    renderAgentGrid();
    renderResources();
    
    // Setup arrival radio listener
    document.querySelectorAll('input[name="arrival"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const dinnerBox = document.getElementById('dinner-box');
            dinnerBox.style.display = e.target.value === 'early' ? 'block' : 'none';
            
            if (!data.preferences[currentAgent]) {
                data.preferences[currentAgent] = {};
            }
            data.preferences[currentAgent].arrival = e.target.value;
            saveData();
        });
    });
    
    // Setup other preference listeners
    document.querySelectorAll('input[name="dinner"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (!data.preferences[currentAgent]) {
                data.preferences[currentAgent] = {};
            }
            data.preferences[currentAgent].dinner = e.target.value;
            saveData();
        });
    });
    
    document.querySelectorAll('input[name="breakfast"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (!data.preferences[currentAgent]) {
                data.preferences[currentAgent] = {};
            }
            data.preferences[currentAgent].breakfast = e.target.value;
            saveData();
        });
    });
    
    // Setup text input listeners
    document.getElementById('other-ride').addEventListener('input', (e) => {
        if (!data.preferences[currentAgent]) {
            data.preferences[currentAgent] = {};
        }
        data.preferences[currentAgent].otherRide = e.target.value;
        saveData();
    });
    
    document.getElementById('other-dinner').addEventListener('input', (e) => {
        if (!data.preferences[currentAgent]) {
            data.preferences[currentAgent] = {};
        }
        data.preferences[currentAgent].otherDinner = e.target.value;
        saveData();
    });
}

// Render agent grid
function renderAgentGrid() {
    const grid = document.getElementById('agent-grid');
    grid.innerHTML = agents.map(agent => `
        <div class="agent-card" onclick="selectAgent('${agent.id}')">
            <div class="agent-photo">
                <img src="${agent.image}" alt="${agent.name}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="agent-name">${agent.name}</div>
            <div class="agent-location">${agent.location}</div>
        </div>
    `).join('');
}

// Render resources
function renderResources() {
    const grid = document.getElementById('resources-grid');
    grid.innerHTML = resources.map(resource => `
        <div class="resource-card">
            <div class="resource-name">${resource.name}</div>
            <button class="resource-button" onclick="window.open('${resource.url}', '_blank')">
                ${resource.detail} →
            </button>
        </div>
    `).join('');
}

// Select agent
function selectAgent(agentId) {
    currentAgent = agentId;
    const agent = agents.find(a => a.id === agentId);
    
    document.getElementById('agent-name').textContent = agent.name;
    document.getElementById('agent-location').textContent = agent.location;
    
    // Update profile photo in dossier
    const profilePhoto = document.querySelector('.profile-photo');
    profilePhoto.innerHTML = `<img src="${agent.image}" alt="${agent.name}" style="width: 100%; height: 100%; object-fit: cover;">`;
    
    renderMissionChecklist();
    renderArrivalChecklist();
    renderRides();
    loadPreferences();
    
    document.getElementById('selection-view').classList.add('hidden');
    document.getElementById('dossier-view').classList.remove('hidden');
}

// Close agent view
function closeAgent() {
    currentAgent = null;
    document.getElementById('selection-view').classList.remove('hidden');
    document.getElementById('dossier-view').classList.add('hidden');
}

// Render mission checklist
function renderMissionChecklist() {
    const container = document.getElementById('mission-checklist');
    container.innerHTML = missions.map(mission => {
        const key = `${currentAgent}-${mission.id}`;
        const completed = data.completedMissions[key] || false;
        return `
            <div class="checklist-item ${completed ? 'completed' : ''}" onclick="toggleMission('${mission.id}')">
                <span class="checklist-icon">${mission.icon}</span>
                <span class="checklist-label">${mission.label}</span>
                <span class="checklist-check">${completed ? '✓' : '◻'}</span>
            </div>
        `;
    }).join('');
}

// Render arrival checklist
function renderArrivalChecklist() {
    const container = document.getElementById('arrival-checklist');
    container.innerHTML = arrivalItems.map(item => {
        const key = `${currentAgent}-${item.id}`;
        const completed = data.arrivalChecklist[key] || false;
        return `
            <div class="checklist-item ${completed ? 'completed' : ''}" onclick="toggleArrival('${item.id}')">
                <span class="checklist-icon">${item.icon}</span>
                <span class="checklist-label">${item.label}</span>
                <span class="checklist-check">${completed ? '✓' : '◻'}</span>
            </div>
        `;
    }).join('');
}

// Render rides
function renderRides() {
    const container = document.getElementById('rides-grid');
    container.innerHTML = rides.map(ride => {
        const prefs = data.preferences[currentAgent] || {};
        const checked = (prefs.rides || []).includes(ride.name);
        return `
            <label class="ride-option">
                <input type="checkbox" ${checked ? 'checked' : ''} onchange="toggleRide('${ride.name}')">
                <div>
                    <div class="ride-name">${ride.name}</div>
                    <div class="ride-zone">${ride.zone}</div>
                </div>
            </label>
        `;
    }).join('');
}

// Load preferences
function loadPreferences() {
    const prefs = data.preferences[currentAgent] || {};
    
    // Arrival
    if (prefs.arrival) {
        const radio = document.querySelector(`input[name="arrival"][value="${prefs.arrival}"]`);
        if (radio) radio.checked = true;
        document.getElementById('dinner-box').style.display = prefs.arrival === 'early' ? 'block' : 'none';
    }
    
    // Dinner
    if (prefs.dinner) {
        const radio = document.querySelector(`input[name="dinner"][value="${prefs.dinner}"]`);
        if (radio) radio.checked = true;
    }
    
    // Breakfast
    if (prefs.breakfast) {
        const radio = document.querySelector(`input[name="breakfast"][value="${prefs.breakfast}"]`);
        if (radio) radio.checked = true;
    }
    
    // Text inputs
    document.getElementById('other-ride').value = prefs.otherRide || '';
    document.getElementById('other-dinner').value = prefs.otherDinner || '';
}

// Toggle mission
function toggleMission(missionId) {
    const key = `${currentAgent}-${missionId}`;
    data.completedMissions[key] = !data.completedMissions[key];
    saveData();
    renderMissionChecklist();
}

// Toggle arrival
function toggleArrival(itemId) {
    const key = `${currentAgent}-${itemId}`;
    data.arrivalChecklist[key] = !data.arrivalChecklist[key];
    saveData();
    renderArrivalChecklist();
}

// Toggle ride
function toggleRide(rideName) {
    if (!data.preferences[currentAgent]) {
        data.preferences[currentAgent] = {};
    }
    if (!data.preferences[currentAgent].rides) {
        data.preferences[currentAgent].rides = [];
    }
    
    const rides = data.preferences[currentAgent].rides;
    const index = rides.indexOf(rideName);
    
    if (index > -1) {
        rides.splice(index, 1);
    } else {
        rides.push(rideName);
    }
    
    saveData();
}

// Send email with preferences
function sendEmail() {
    if (!currentAgent) {
        alert('Please select an operative first!');
        return;
    }
    
    const agent = agents.find(a => a.id === currentAgent);
    const prefs = data.preferences[currentAgent] || {};
    
    // Build email body
    let emailBody = `OPERATION: EPIC UNIVERSE - MISSION BRIEF%0D%0A`;
    emailBody += `========================================%0D%0A%0D%0A`;
    emailBody += `OPERATIVE: ${agent.name}%0D%0A`;
    emailBody += `LOCATION: ${agent.location}%0D%0A`;
    emailBody += `STATUS: PREFERENCES SUBMITTED%0D%0A%0D%0A`;
    
    // Pre-deployment missions
    emailBody += `PRE-DEPLOYMENT CHECKLIST:%0D%0A`;
    emailBody += `----------------------------------------%0D%0A`;
    missions.forEach(mission => {
        const key = `${currentAgent}-${mission.id}`;
        const completed = data.completedMissions[key] ? '[X]' : '[ ]';
        emailBody += `${completed} ${mission.label}%0D%0A`;
    });
    emailBody += `%0D%0A`;
    
    // Arrival checklist
    emailBody += `ARRIVAL CHECKLIST (SATURDAY):%0D%0A`;
    emailBody += `----------------------------------------%0D%0A`;
    arrivalItems.forEach(item => {
        const key = `${currentAgent}-${item.id}`;
        const completed = data.arrivalChecklist[key] ? '[X]' : '[ ]';
        emailBody += `${completed} ${item.label}%0D%0A`;
    });
    emailBody += `%0D%0A`;
    
    // Ride preferences
    emailBody += `MUST-RIDE ATTRACTIONS:%0D%0A`;
    emailBody += `----------------------------------------%0D%0A`;
    if (prefs.rides && prefs.rides.length > 0) {
        prefs.rides.forEach(ride => {
            emailBody += `- ${ride}%0D%0A`;
        });
    } else {
        emailBody += `(None selected)%0D%0A`;
    }
    if (prefs.otherRide) {
        emailBody += `- Other: ${prefs.otherRide}%0D%0A`;
    }
    emailBody += `%0D%0A`;
    
    // Arrival time
    emailBody += `ARRIVAL WINDOW (SATURDAY):%0D%0A`;
    emailBody += `----------------------------------------%0D%0A`;
    if (prefs.arrival === 'early') {
        emailBody += `By 5pm (dinner with group)%0D%0A`;
    } else if (prefs.arrival === 'late') {
        emailBody += `After dinner (separate meal)%0D%0A`;
    } else {
        emailBody += `(Not specified)%0D%0A`;
    }
    emailBody += `%0D%0A`;
    
    // Dinner preference
    if (prefs.arrival === 'early') {
        emailBody += `DINNER DESTINATION:%0D%0A`;
        emailBody += `----------------------------------------%0D%0A`;
        const dinnerOptions = {
            'texas': 'Texas de Brazil - $70',
            'millers': "Miller's Ale House - $30",
            'seasons': "Season's 52",
            'hotel': 'Hotel - $20',
            'noodles': 'Noodles and Co',
            'flexible': 'Figure it out when we get there',
            'own': 'Bring your own'
        };
        emailBody += `${dinnerOptions[prefs.dinner] || '(Not specified)'}%0D%0A`;
        if (prefs.otherDinner) {
            emailBody += `Other: ${prefs.otherDinner}%0D%0A`;
        }
        emailBody += `%0D%0A`;
    }
    
    // Breakfast preference
    emailBody += `SUNDAY BREAKFAST:%0D%0A`;
    emailBody += `----------------------------------------%0D%0A`;
    if (prefs.breakfast === 'hotel') {
        emailBody += `Eat at hotel restaurant%0D%0A`;
    } else if (prefs.breakfast === 'bring') {
        emailBody += `Bring/make our own%0D%0A`;
    } else {
        emailBody += `(Not specified)%0D%0A`;
    }
    emailBody += `%0D%0A`;
    
    emailBody += `========================================%0D%0A`;
    emailBody += `END OF MISSION BRIEF%0D%0A`;
    emailBody += `========================================`;
    
    // Create mailto link
    const subject = `Epic Universe Preferences - ${agent.name}`;
    const mailtoLink = `mailto:superswiss@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
    
    // Open email client
    window.location.href = mailtoLink;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
