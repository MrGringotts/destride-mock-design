/* ══════════════════════════════════════════
   DEST Website — main.js
   San Antonio's Free Electric Ride-Share
   ══════════════════════════════════════════ */

// ── PAGE NAVIGATION ──
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  const map = { home: 0, about: 1, advertise: 2, booking: 3 };
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll('.nav-link')[map[id]]?.classList.add('active');
  window.scrollTo(0, 0);
}

// ── CALENDAR ──
let currentMonth = new Date().getMonth();
let currentYear  = new Date().getFullYear();
let selectedDay  = null;

const bookedDays = [3, 8, 14, 21, 27];
const months = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

function renderCalendar() {
  document.getElementById('cal-month-label').textContent =
    months[currentMonth] + ' ' + currentYear;

  const grid = document.getElementById('cal-days');
  grid.innerHTML = '';

  const firstDay    = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const today       = new Date();
  const isCurrentMonth =
    today.getMonth() === currentMonth && today.getFullYear() === currentYear;
  const todayNum = today.getDate();

  // Empty leading cells
  for (let i = 0; i < firstDay; i++) {
    const el = document.createElement('div');
    el.className = 'cal-day empty';
    grid.appendChild(el);
  }

  // Day cells
  for (let d = 1; d <= daysInMonth; d++) {
    const el = document.createElement('div');
    el.textContent = d;

    const isPast   = isCurrentMonth && d < todayNum;
    const isBooked = bookedDays.includes(d);

    if (isPast) {
      el.className = 'cal-day past';
    } else if (isBooked) {
      el.className = 'cal-day booked';
    } else {
      el.className = 'cal-day available';
      if (isCurrentMonth && d === todayNum) el.classList.add('today');
      if (selectedDay === d) el.classList.add('selected');
      el.onclick = () => selectDay(d, el);
    }

    grid.appendChild(el);
  }
}

function selectDay(d, el) {
  document.querySelectorAll('.cal-day.selected').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
  selectedDay = d;
  const display = document.getElementById('selected-date-display');
  display.textContent = '📅 ' + months[currentMonth] + ' ' + d + ', ' + currentYear + ' — Selected';
}

function changeMonth(dir) {
  currentMonth += dir;
  if (currentMonth > 11) { currentMonth = 0; currentYear++; }
  if (currentMonth < 0)  { currentMonth = 11; currentYear--; }
  selectedDay = null;
  renderCalendar();
}

// ── BOOKING FORM ──
function submitBooking() {
  if (!selectedDay) {
    alert('Please select a date on the calendar first.');
    return;
  }
  document.getElementById('booking-modal').classList.add('show');
}

// ── FAQ ACCORDION ──
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains('open');

  // Close all open answers
  document.querySelectorAll('.faq-a.open').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-q.open').forEach(b => b.classList.remove('open'));

  // Open clicked one if it was closed
  if (!isOpen) {
    answer.classList.add('open');
    btn.classList.add('open');
  }
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  renderCalendar();
});
