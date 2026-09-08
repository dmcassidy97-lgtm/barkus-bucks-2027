const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'fines.json');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify({ nextId: 1, fines: [] }, null, 2));
}

function readData() {
  return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

function writeData(data) {
  // Write to a temp file then rename, so a crash mid-write can't corrupt fines.json.
  const tmpFile = `${dataFile}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2));
  fs.renameSync(tmpFile, dataFile);
}

function getAllFines() {
  const data = readData();
  return [...data.fines].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function insertFine({ accused, reason, submitted_by, offense_date }) {
  const data = readData();
  const fine = {
    id: data.nextId,
    accused,
    reason,
    submitted_by,
    offense_date,
    punishment: null,
    resolved: 0,
    created_at: new Date().toISOString(),
  };
  data.fines.push(fine);
  data.nextId += 1;
  writeData(data);
  return fine;
}

function updateResolved(id, resolved) {
  const data = readData();
  const fine = data.fines.find((f) => f.id === id);
  if (fine) fine.resolved = resolved ? 1 : 0;
  writeData(data);
}

function updatePunishment(id, punishment) {
  const data = readData();
  const fine = data.fines.find((f) => f.id === id);
  if (fine) fine.punishment = punishment;
  writeData(data);
}

function deleteFine(id) {
  const data = readData();
  data.fines = data.fines.filter((f) => f.id !== id);
  writeData(data);
}

module.exports = { getAllFines, insertFine, updateResolved, updatePunishment, deleteFine };
