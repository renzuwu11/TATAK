
function generateName() {
  const industry = document.getElementById("industry").value;
  const style = document.getElementById("style").value;
  const lengths = document.getElementById("lengths").value;
  const keyword = document.getElementById("keyword").value;

  fetch("/generated-names", {
    method: "POST",
    body: JSON.stringify({
      industry: industry,
      style: style,
      lengths: lengths,
      keyword: keyword,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const generatedNames = data.names;
      const generatedNamesList = document.getElementById(
        "generated-names-list"
      );

      // Clear previous names
      generatedNamesList.innerHTML = "";

      // Calculate start and end indexes for pagination
      const startIndex = (currentPage - 1) * namesPerPage;
      const endIndex = Math.min(
        startIndex + namesPerPage,
        generatedNames.length
      );

      // Display names for the current page
      for (let i = startIndex; i < endIndex; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = generatedNames[i];
        generatedNamesList.appendChild(listItem);
      }

      // Update pagination controls
      updatePaginationControls(generatedNames.length);
    });
}

