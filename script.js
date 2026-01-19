// Navigation filtering
document.addEventListener("DOMContentLoaded", function () {
  const navTabs = document.querySelectorAll(".nav-tab");
  const workItems = document.querySelectorAll(".work-item");
  const portfolioImg1 = document.getElementById("portfolioImg1");
  const portfolioImg2 = document.getElementById("portfolioImg2");

  // Track the selected project
  let selectedProject = null;

  // Set first project as default
  const firstProject = document.querySelector(
    ".work-item[data-category='selected']",
  );
  if (firstProject) {
    selectedProject = firstProject.dataset.project;
    updatePortfolioImages(selectedProject);
    firstProject.classList.add("active");
  }

  navTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Update active tab
      navTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Filter work items
      const filter = this.dataset.filter;
      workItems.forEach((item) => {
        if (filter === "all") {
          item.style.display = "block";
        } else {
          if (item.dataset.category === filter) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        }
      });
    });
  });

  // Work item click handler
  workItems.forEach((item) => {
    item.addEventListener("click", function () {
      const projectId = this.dataset.project;
      selectedProject = projectId;
      updatePortfolioImages(projectId);

      // Update active class
      workItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");
    });

    // Work item hover handlers
    item.addEventListener("mouseenter", function () {
      const projectId = this.dataset.project;
      updatePortfolioImages(projectId);
    });

    item.addEventListener("mouseleave", function () {
      // Show the last selected project on mouse leave
      if (selectedProject) {
        updatePortfolioImages(selectedProject);
      }
    });
  });

  // Function to update portfolio images based on project
  function updatePortfolioImages(projectId) {
    portfolioImg1.src = `projects/${projectId}01.png`;
    portfolioImg2.src = `projects/${projectId}02.png`;
    portfolioImg1.alt = `${projectId} 1`;
    portfolioImg2.alt = `${projectId} 2`;
  }

  // Smooth scroll for links
  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

console.log("Portfolio page loaded successfully!");
