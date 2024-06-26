
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

    document.addEventListener("DOMContentLoaded", function() {
        const logoText = document.getElementById('logo-text');
        const businessNameInput = document.getElementById('business-name');
        const logoSizeSelect = document.getElementById('logo-size');
        const fontStyleSelect = document.getElementById('font-style');
        const fontSizeInput = document.getElementById('font-size');
        const fontSizeError = document.getElementById('font-size-error');
        const textColorStartInput = document.getElementById('text-color-start');
        const textColorEndInput = document.getElementById('text-color-end');
        const bgColorStartInput = document.getElementById('bg-color-start');
        const bgColorEndInput = document.getElementById('bg-color-end');
        const downloadButton = document.getElementById('download-logo');
        const logoPreview = document.getElementById('logo-preview');

        function updateLogoText() {
            logoText.textContent = businessNameInput.value || "Your Business Name";
        }

        function updateLogoSize() {
            const [width, height] = logoSizeSelect.value.split('x');
            const maxWidth = logoPreview.offsetWidth - 40; // Subtract padding
            const maxHeight = logoPreview.offsetHeight - 40; // Subtract padding
            const aspectRatio = width / height;

            let newWidth = width;
            let newHeight = height;

            if (width > maxWidth || height > maxHeight) {
                if (aspectRatio > 1) {
                    newWidth = maxWidth;
                    newHeight = maxWidth / aspectRatio;
                } else {
                    newHeight = maxHeight;
                    newWidth = maxHeight * aspectRatio;
                }
            }

            logoPreview.style.width = `${newWidth}px`;
            logoPreview.style.height = `${newHeight}px`;
        }

        function updateFontStyle() {
            logoText.style.fontFamily = fontStyleSelect.value;
        }

        function updateFontSize() {
            let fontSize = parseInt(fontSizeInput.value, 10);
            if (fontSize < 10) {
                fontSizeError.style.display = 'block';
                fontSizeInput.value = 10;
                fontSize = 10;
            } else {
                fontSizeError.style.display = 'none';
            }
            logoText.style.fontSize = `${fontSize}px`;
        }

        function updateTextColor() {
            const colorStart = textColorStartInput.value;
            const colorEnd = textColorEndInput.value;
            logoText.style.background = `linear-gradient(to right, ${colorStart}, ${colorEnd})`;
            logoText.style.webkitBackgroundClip = 'text';
            logoText.style.color = 'transparent';
        }

        function updateBgColor() {
            const bgColorStart = bgColorStartInput.value;
            const bgColorEnd = bgColorEndInput.value;
            logoPreview.style.background = `linear-gradient(to right, ${bgColorStart}, ${bgColorEnd})`;
        }

        function downloadLogo() {
            html2canvas(logoPreview).then(canvas => {
                const link = document.createElement('a');
                link.download = 'logo.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        }

        businessNameInput.addEventListener('input', updateLogoText);
        logoSizeSelect.addEventListener('change', updateLogoSize);
        fontStyleSelect.addEventListener('change', updateFontStyle);
        fontSizeInput.addEventListener('input', updateFontSize);
        textColorStartInput.addEventListener('input', updateTextColor);
        textColorEndInput.addEventListener('input', updateTextColor);
        bgColorStartInput.addEventListener('input', updateBgColor);
        bgColorEndInput.addEventListener('input', updateBgColor);
        downloadButton.addEventListener('click', downloadLogo);

        updateLogoText();
        updateLogoSize();
        updateFontStyle();
        updateFontSize();
        updateTextColor();
        updateBgColor();
    });
