document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('fine-form');
  const msg = document.getElementById('form-msg');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.className = 'form-msg';
    msg.textContent = '';

    const payload = {
      accused: form.accused.value.trim(),
      reason: form.reason.value.trim(),
      offense_date: form.offense_date.value,
      submitted_by: form.submitted_by.value.trim(),
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    try {
      const res = await fetch('/api/fines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      msg.textContent = "Fine logged. Court will deal with it at 10am. 🔨";
      msg.className = 'form-msg show success';
      form.reset();
    } catch (err) {
      msg.textContent = err.message || 'Could not submit — try again.';
      msg.className = 'form-msg show error';
    } finally {
      submitBtn.disabled = false;
    }
  });
});
