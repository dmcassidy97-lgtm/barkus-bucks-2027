// Single source of truth for punishment names -> dollar amounts.
// NOTE: the <select> options in public/fines.html are hardcoded to match this
// list for speed — if you add/change a punishment here, update that dropdown too.

const PUNISHMENTS = {
  "The Sash of Shame": 1,
  "Mystery Shot": 3,
  "Buy-a-Round": 5,
  "Opposite Hand Only": 1,
  "The Waiter's Apprentice": 2,
  "Toast in Character": 1,
  "Truth Corner": 2,
  "The Chicken Dance": 3,
  "Silent Treatment": 2,
  "The Naming Game": 1,
  "Call Mum/Dad": 5,
};

const DAILY_CAP = 10;

module.exports = { PUNISHMENTS, DAILY_CAP };
