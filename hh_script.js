(() => {
  const jobs = document.querySelectorAll(
    ".vacancy-serp-item__layout a.bloko-button"
  );
  jobs.forEach((job) => {
    setTimeout(() => {
      job.click();
    }, 2000);
  });
})();
