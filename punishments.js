// Single source of truth for valid punishment names.
// NOTE: the <select> options in public/fines.html are hardcoded to match this
// list for speed — if you add/change a punishment here, update that dropdown too.

const PUNISHMENTS = [
  "The Sash of Shame",
  "Mystery Shot",
  "Buy-a-Round",
  "Opposite Hand Only",
  "The Waiter's Apprentice",
  "Toast in Character",
  "Truth Corner",
  "The Chicken Dance",
  "Silent Treatment",
  "The Naming Game",
  "Call Mum/Dad",
];

const MIN_FINE = 1;
const MAX_FINE = 3;
const DAILY_CAP = 10;

module.exports = { PUNISHMENTS, MIN_FINE, MAX_FINE, DAILY_CAP };
