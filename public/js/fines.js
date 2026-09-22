document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('fine-form');
  const msg = document.getElementById('form-msg');
  if (!form) return;

  const customWrap = document.getElementById('custom-punishment-wrap');
  const customInput = document.getElementById('custom_punishment');

  if (form.punishment && customWrap && customInput) {
    form.punishment.addEventListener('change', () => {
      const isCustom = form.punishment.value === '__custom__';
      customWrap.style.display = isCustom ? 'block' : 'none';
      customInput.required = isCustom;
      if (!isCustom) customInput.value = '';
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.className = 'form-msg';
    msg.textContent = '';

    const isCustomPunishment = form.punishment.value === '__custom__';
    const punishment = isCustomPunishment ? customInput.value.trim() : form.punishment.value;

    if (isCustomPunishment && !punishment) {
      msg.textContent = 'Describe the punishment, or pick one from the list.';
      msg.className = 'form-msg show error';
      return;
    }

    const payload = {
      accused: form.accused.value.trim(),
      reason: form.reason.value.trim(),
      punishment,
      amount: Number(form.amount.value),
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

      if (data.capped) {
        msg.textContent = `Fine logged at $${data.amount} — today's $10 cap was already reached, so this one's discounted. Court deals with it at 10am.`;
      } else {
        msg.textContent = `Fine logged for $${data.amount}. Court deals with it at 10am.`;
      }
      msg.className = 'form-msg show success';
      form.reset();
      if (customWrap) customWrap.style.display = 'none';
    } catch (err) {
      msg.textContent = err.message || 'Could not submit — try again.';
      msg.className = 'form-msg show error';
    } finally {
      submitBtn.disabled = false;
    }
  });
});
