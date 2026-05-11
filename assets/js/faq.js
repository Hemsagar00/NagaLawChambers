document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      // Close all others (accordion mode)
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('open');
      });
      // Toggle current
      item.classList.toggle('open');
    });
  });
});
