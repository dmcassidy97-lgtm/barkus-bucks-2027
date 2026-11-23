// Shirt sizes for the trip. Served only to the logged-in organizer
// via /api/admin/shirts. "TBC" = not collected yet.
// Order matches the attendees page. Nicknames only (this repo is public).
const SHIRT_SIZES = [
  { name: 'Barkus', status: 'Guest of honour', size: 'TBC' },
  { name: 'Free Palestine', status: 'Confirmed', size: 'TBC' },
  { name: 'Deccas', status: 'Confirmed', size: 'L' },
  { name: 'Jordzo', status: 'Confirmed', size: 'XL' },
  { name: 'Stingray', status: 'Confirmed', size: 'TBC' },
  { name: 'Waffle', status: 'Confirmed', size: 'TBC' },
  { name: 'MOTH', status: 'Confirmed', size: 'L' },
  { name: 'Rusty', status: 'Confirmed', size: 'L' },
  { name: 'Henno', status: 'Confirmed', size: 'XL' },
  { name: 'Pits', status: 'Confirmed', size: 'TBC' },
  { name: 'Scamma', status: 'Confirmed', size: 'L' },
  { name: 'JRuss No Fuss', status: 'Confirmed', size: 'TBC' },
  { name: 'Blakey', status: 'Confirmed', size: 'TBC' },
  { name: 'Jakey', status: 'Confirmed', size: 'TBC' },
  { name: 'Conesy', status: 'Confirmed', size: 'L' },
  { name: 'Sladdy', status: 'Confirmed', size: 'M' },
  { name: 'Glash', status: 'Confirmed', size: 'TBC' },
  { name: 'MHMH', status: 'Confirmed', size: 'TBC' },
  { name: 'Westy', status: 'Confirmed', size: 'L' },
  { name: 'Maximillian', status: 'Confirmed', size: 'L' },
  { name: 'Zac', status: 'Confirmed', size: 'L' },
  { name: 'Brownie', status: 'Maybe', size: 'TBC' },
  { name: 'Pat', status: 'Maybe', size: 'TBC' },
  { name: 'Hubbo', status: 'Maybe', size: 'TBC' },
  { name: 'Marky', status: 'Not on attendees page', size: 'L' },
];

module.exports = { SHIRT_SIZES };
