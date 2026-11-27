// Shirt sizes for the trip. Served only to the logged-in organizer
// via /api/admin/shirts. "TBC" = not collected yet.
// Order matches the attendees page. Nicknames only (this repo is public).
const SHIRT_SIZES = [
  { name: 'Barkus', status: 'Guest of honour', size: 'XL' },
  { name: 'Free Palestine', status: 'Confirmed', size: 'L' },
  { name: 'Deccas', status: 'Confirmed', size: 'L' },
  { name: 'Jordzo', status: 'Confirmed', size: 'XL' },
  { name: 'Stingray', status: 'Confirmed', size: 'L' },
  { name: 'Waffle', status: 'Confirmed', size: 'XL' },
  { name: 'MOTH', status: 'Confirmed', size: 'L' },
  { name: 'Rusty', status: 'Confirmed', size: 'L' },
  { name: 'Henno', status: 'Confirmed', size: 'XL' },
  { name: 'Pits', status: 'Confirmed', size: 'M' },
  { name: 'Scamma', status: 'Confirmed', size: 'L' },
  { name: 'JRuss No Fuss', status: 'Confirmed', size: '5XL' },
  { name: 'Blakey', status: 'Confirmed', size: 'L' },
  { name: 'Jakey', status: 'Confirmed', size: 'L' },
  { name: 'Conesy', status: 'Confirmed', size: 'L' },
  { name: 'Sladdy', status: 'Confirmed', size: 'L' },
  { name: 'Glash', status: 'Confirmed', size: 'XL' },
  { name: 'MHMH', status: 'Confirmed', size: 'L' },
  { name: 'Westy', status: 'Confirmed', size: 'L' },
  { name: 'Maximillian', status: 'Confirmed', size: 'L' },
  { name: 'Zac', status: 'Confirmed', size: 'L' },
  { name: 'Brownie', status: 'Maybe', size: 'TBC' },
  { name: 'Pat', status: 'Maybe', size: 'TBC' },
  { name: 'Hubbo', status: 'Maybe', size: 'TBC' },
  { name: 'Marky', status: 'Not on attendees page', size: 'L' },
];

module.exports = { SHIRT_SIZES };
