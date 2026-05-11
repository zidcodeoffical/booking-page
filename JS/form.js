document.addEventListener("DOMContentLoaded", () => {


  /* =========================================================
  PACKAGE SELECTION
  ========================================================= */

  // All package radio buttons
  const packageRadios = document.querySelectorAll('input[name="package"]');

  // Customize package radio button
  const customizePackage = document.getElementById("customize-package");



  /* =========================================================
  CUSTOM HOURS SECTION
  ========================================================= */

  // Wrapper that contains:
  // - slider
  // - art direction toggle
  const customHoursWrap = document.getElementById("custom-hours-wrap");



  /* =========================================================
  SLIDER ELEMENTS
  ========================================================= */

  // Actual hidden range input
  const slider = document.getElementById("hours-slider");

  // Number display on the right
  const display = document.getElementById("hours-display");

  // Black fill bar
  const fill = document.getElementById("hours-fill");

  // White draggable circle
  const handle = document.getElementById("hours-handle");



  /* =========================================================
  ART DIRECTION TOGGLE
  ========================================================= */

  // Toggle wrapper (gray/green background)
  const toggleField = document.getElementById("toggle-checkbox-field");

  // Actual checkbox input
  const toggleCheckbox = document.getElementById("toggle-checkbox");



  /* =========================================================
  FORM
  ========================================================= */

  // Parent form
  const form = slider.closest("form");



  /* =========================================================
  UPDATE SLIDER UI
  ========================================================= */

  function updateSlider() {

    const min = parseInt(slider.min);
    const max = parseInt(slider.max);
    const value = parseInt(slider.value);

    // Convert value into percentage
    const percent = ((value - min) / (max - min)) * 100;

    // Update displayed number
    display.textContent = value;

    // Update black fill width
    fill.style.width = percent + "%";

    // Move white handle
    handle.style.left = percent + "%";
  }



  /* =========================================================
  SHOW / HIDE CUSTOM SECTION
  ========================================================= */

  function updatePackageSelection() {

    // IF customize package selected
    if (customizePackage.checked) {

      // Show slider + toggle section
      customHoursWrap.style.display = "block";

    } else {

      // Hide slider + toggle section
      customHoursWrap.style.display = "none";

      // Reset slider back to 0
      slider.value = 0;

      // Reset toggle to OFF
      toggleCheckbox.checked = false;

      // Remove green active state
      toggleField.classList.remove("toggle-active");

      // Update slider visuals
      updateSlider();
    }
  }



  /* =========================================================
  TOGGLE SWITCH ANIMATION
  ========================================================= */

  toggleCheckbox.addEventListener("change", () => {

    // IF toggle is ON
    if (toggleCheckbox.checked) {

      // Add green background + move ball
      toggleField.classList.add("toggle-active");

    } else {

      // Return to gray background + reset ball
      toggleField.classList.remove("toggle-active");
    }

  });



  /* =========================================================
  PACKAGE RADIO CHANGE
  ========================================================= */

  packageRadios.forEach(radio => {

    radio.addEventListener("change", updatePackageSelection);

  });



  /* =========================================================
  SLIDER LIVE UPDATE
  ========================================================= */

  slider.addEventListener("input", updateSlider);



  /* =========================================================
  FORM VALIDATION
  ========================================================= */

  form.addEventListener("submit", (e) => {

    // IF customize selected BUT slider still 0
    if (
      customizePackage.checked &&
      slider.value === "0"
    ) {

      // Stop form submission
      e.preventDefault();
      e.stopPropagation();

      // Alert user
      alert("Please select shooting hours.");

      return false;
    }

  });



  /* =========================================================
  INITIAL PAGE LOAD
  ========================================================= */

  // Set slider visuals on load
  updateSlider();

  // Set correct section visibility on load
  updatePackageSelection();

});