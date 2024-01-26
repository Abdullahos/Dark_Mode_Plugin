document.addEventListener('DOMContentLoaded', function () {
  // Get the checkbox element
  var darkModeToggleElem = document.getElementById('darkModeToggle');

  // Get the current dark mode state from storage
  chrome.storage.sync.get(['darkModeEnabled'], function (result) {
    darkModeToggleElem.checked = result.darkModeEnabled || false;
  });

  // Add an event listener to handle the toggle change
  darkModeToggleElem.addEventListener('change', function () {
    var enabled = this.checked;

    // Notify content script to apply or remove dark mode styles
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleDarkMode', enabled: enabled }, function(response) {
        chrome.storage.sync.set({ darkModeEnabled: response.enabled });
      });
    });
  });
});
