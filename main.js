//default
// Get the current dark mode state from storage
chrome.storage.sync.get(['darkModeEnabled'], function (result) {
    toggleDarkMode(result.darkModeEnabled || false);
});
// Function to apply or remove dark mode styles
function toggleDarkMode(enabled) {
  if (enabled) {
    // Set dark mode styles
    document.body.style.backgroundColor = " #050505";
    document.body.style.color = "#ddd";
    document.querySelectorAll('*').forEach((element) => {
      element.style.backgroundColor = " #050505";
      element.style.color = "#ddd";
    });
  } else {
    // Remove dark mode styles
    document.body.style.backgroundColor = "";
    document.body.style.color = "";
    document.querySelectorAll('*').forEach((element) => {
      element.style.backgroundColor = "";
      element.style.color = "";
    });
  }

  // Send a response with the current state
  return { enabled: enabled };
}

// Listen for messages from the popup to toggle dark mode
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'toggleDarkMode') {
    console.log(request)
    const response = toggleDarkMode(request.enabled);
    // Send a response to the popup with the updated state
    sendResponse(response);
  }
});
