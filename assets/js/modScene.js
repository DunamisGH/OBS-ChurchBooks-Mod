    
    
    const bgContainer = document.getElementById("bg-container");
    const messageDisplay = document.getElementById("messageDisplay");
    // const messageTitle = document.getElementById("messageTitle");
    
    //TRANSITION EFX
    function applyFadeEffect(pElement) {
  pElement.classList.remove('fade-in');
  pElement.classList.add('fade-out');

  setTimeout(() => {
      pElement.classList.remove('fade-out');
      pElement.classList.add('fade-in');
  }, 500);  // Matches the CSS transition duration
}
    // Text channel
    const channel = new BroadcastChannel("myChannel");
    channel.onmessage = (event) => {
      applyFadeEffect(messageDisplay);
      setTimeout(() => {
        const message = event.data;
        messageDisplay.innerHTML = message;
        localStorage.setItem('savedMessage', message);

        if (savedTitleColor) {
            const dspans = document.querySelectorAll("#messageDisplay span");
            dspans.forEach(dspan => dspan.style.color = savedTitleColor);
        }

      } ,400)
    };

    // settings channel
    const settingsChannel = new BroadcastChannel("settings");
    settingsChannel.onmessage = (event) => {
       if (event.data) {
          if (event.data.selectedFont){
            bgContainer.style.fontFamily = event.data.selectedFont;
            localStorage.setItem('fontFamily', event.data.selectedFont);
          }
          if (event.data.opacityColor){
            bgContainer.style.backgroundColor = event.data.opacityColor;
            localStorage.setItem('bgColor', event.data.opacityColor);
          }
          if (event.data.roundedCorner){
            bgContainer.style.borderRadius = event.data.roundedCorner + "px";
            localStorage.setItem('borderRadius', event.data.roundedCorner);
          }
          if (event.data.selectedBgColor){
            bgContainer.style.backgroundColor = event.data.selectedBgColor;
            localStorage.setItem('bgColor', event.data.selectedBgColor);
          }
          if (event.data.selectedFontColor){
            bgContainer.style.color = event.data.selectedFontColor;
            localStorage.setItem('fontColor', event.data.selectedFontColor);
          }
          if (event.data.selectedTitleColor){
            const spans = document.querySelectorAll("#messageDisplay span");
            spans.forEach(span => span.style.color = event.data.selectedTitleColor);
            localStorage.setItem('titleColor', event.data.selectedTitleColor);
          }
          if (event.data.currentBoldState){
            messageDisplay.style.fontWeight = event.data.currentBoldState;
            localStorage.setItem('boldState', event.data.currentBoldState);
          }
          if (event.data.currentItalicState){
            messageDisplay.style.fontStyle = event.data.currentItalicState;
            localStorage.setItem('italicState', event.data.currentItalicState);
          }
          if (event.data.currentUnderlineState){
            messageDisplay.style.textDecoration = event.data.currentUnderlineState;
            localStorage.setItem('underlineState', event.data.currentUnderlineState);
          }
          if (event.data.selectedBgMargin){
            messageDisplay.style.padding = event.data.selectedBgMargin + "px";
            localStorage.setItem('savedBgMargin', event.data.selectedBgMargin);
            adjustFontSizeBasedOnScroll();
          }
          if (event.data.selectedTextAlignment){
            messageDisplay.style.textAlign = event.data.selectedTextAlignment;
            localStorage.setItem('textAlign', event.data.selectedTextAlignment);
          }
          if (event.data.selectedShadowColor){
            messageDisplay.style.textShadow = event.data.selectedShadowColor;
            localStorage.setItem('savedShadowColor', event.data.selectedShadowColor);
          }
          if (event.data.fontOutline){
            let savedFontOutlineColor = localStorage.getItem('obs-bible-saved-font-outline-color');
            if(!savedFontOutlineColor){
              savedFontOutlineColor = "#000000";
            }
            messageDisplay.style.webkitTextStroke = `${event.data.fontOutline}px ${savedFontOutlineColor}`;
            localStorage.setItem('obs-bible-saved-font-outline', event.data.fontOutline);
          }
          if (event.data.fontOutlineColor){
            let savedFontOutline = Number(localStorage.getItem('obs-bible-saved-font-outline'));
            if(!savedFontOutline){
              savedFontOutline = 0;
            }
            messageDisplay.style.webkitTextStroke = `${savedFontOutline}px ${event.data.fontOutlineColor}`;
            localStorage.setItem('obs-bible-saved-font-outline-color', event.data.fontOutlineColor);
          }
          if (event.data.mainBorder){
            let mainBorderColor = localStorage.getItem('obs-bible-saved-main-border-color');
            let savedMainBorderType = localStorage.getItem('obs-bible-saved-main-border-type');
            if(!mainBorderColor){
              mainBorderColor = "#000000";
            }
            if(!savedMainBorderType){
              savedMainBorderType = 'solid';
            }
            bgContainer.style.border = `${event.data.mainBorder}px ${mainBorderColor}  ${savedMainBorderType}`;
            localStorage.setItem('obs-bible-saved-main-border', event.data.mainBorder);
          }
          if (event.data.mainBorderColor){
            let savedMainBorder = Number(localStorage.getItem('obs-bible-saved-main-border'));
            let savedMainBorderType = localStorage.getItem('obs-bible-saved-main-border-type');
            if(!savedMainBorder){
              savedMainBorder = 0;
            }
            if(!savedMainBorderType){
              savedMainBorderType = 'solid';
            }
            bgContainer.style.border = `${savedMainBorder}px ${event.data.mainBorderColor} ${savedMainBorderType}`;
            localStorage.setItem('obs-bible-saved-main-border-color', event.data.mainBorderColor);
          }
          if (event.data.mainBorderType){
            let savedMainBorder = Number(localStorage.getItem('obs-bible-saved-main-border'));
            let savedMainBorderColor = localStorage.getItem('obs-bible-saved-main-border-color');
            if(!savedMainBorder){
              savedMainBorder = 0;
            }
            if(!savedMainBorderColor){
              savedMainBorderColor = '#000000';
            }
            bgContainer.style.border = `${savedMainBorder}px ${savedMainBorderColor} ${event.data.mainBorderType}`;
            localStorage.setItem('obs-bible-saved-main-border-type', event.data.mainBorderType);
          }
          adjustFontSizeBasedOnScroll();
        }
    };

    window.addEventListener('beforeunload', () => {
        settingsChannel.close();
    });


        const receiveChannel = new BroadcastChannel("obs-bible-animation");
        receiveChannel.onmessage = (event) => {
          const animatedElement = document.getElementById('messageDisplay');
          const animationContainer = document.getElementById('bg-container');
          const { type, duration, easing, display } = event.data;
          animationContainer.style.animationDuration = `${duration}s`;

          if (display === 'none') {
            animationContainer.classList.add(type);
            animationContainer.style.animationDirection = "reverse";
            setTimeout(() => {
              animationContainer.style.display = 'none';
              animationContainer.classList.remove(type);
            }, duration * 1000);
          } else if (display === 'flex') {
            animationContainer.style.animationDirection = "normal";
            animationContainer.classList.add(type);
            animationContainer.style.display = 'flex';
            
            while(animatedElement.offsetHeight > animationContainer.offsetHeight){
              let tempFontSize = Number(animatedElement.style.fontSize.replace(/px/i, ''));
              tempFontSize -= 1;
              animatedElement.style.fontSize = `${tempFontSize}px`;
            }

            setTimeout(() => {
              adjustFontSizeBasedOnScroll();
              animationContainer.classList.remove(type);
            }, duration * 1000);
          }
        };