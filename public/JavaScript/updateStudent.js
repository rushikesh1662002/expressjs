  document.querySelectorAll(".course-option").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const text = item.textContent.trim();
      const cid = item.getAttribute("data-id");
      
      // Update button text
      document.getElementById("dropdownBtn").textContent = text;
      // Update hidden input value
      document.getElementById("courseid").value = cid;
    });
  });
