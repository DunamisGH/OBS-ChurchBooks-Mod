// Initialize BroadcastChannel
        const channelDsp = new BroadcastChannel('media_channel');

        // Function to display media
        function displayMedia(mediaSrc, mediaType) {
            const overlay = document.getElementById('overlay');
            console.log('Starting fade-out');
            overlay.classList.add('fading'); // Add the fading class

            setTimeout(() => {
                console.log('Fade-out complete, changing media');
                overlay.style.backgroundImage = ''; // Reset background image
                const existingVideo = document.querySelector('#overlay > video');
                if (existingVideo) {
                    existingVideo.remove(); // Remove previous video
                }
                
                if (mediaType.startsWith('image')) {
                    // Set image as the background of #overlay
                    overlay.style.backgroundImage = `url(${mediaSrc})`;
                } 
                else if(mediaType.startsWith('blank')){
                    // overlay.style.background = `${mediaSrc}`;

                }
                else if (mediaType.startsWith('video')) {
                    // Add a video as a child of #overlay
                    const video = document.createElement('video');
                    video.src = mediaSrc;
                    video.autoplay = true;
                    video.loop = false;
                    video.muted = true; // Mute for a better background experience
                    video.style.position = 'absolute';
                    video.style.top = '0';
                    video.style.left = '0';
                    video.style.width = '100%';
                    video.style.height = '100%';
                    video.style.objectFit = 'cover';
                    video.style.zIndex = '-1'; // Ensure it's in the background
                    overlay.appendChild(video);
                }

                // Fade back in
                setTimeout(() => {
                    console.log('Starting fade-in');
                    overlay.classList.remove('fading');
                }, 50); // Short delay to allow for smooth fade-in
            }, 500); // Match the fade-out duration
        }

        // Listen for BroadcastChannel messages
        channelDsp.onmessage = (event) => {
            const { type, src, mediaType } = event.data;
            if (type === 'play') {
                displayMedia(src, mediaType);
            }
            if(document.querySelector('video')!=null){
                if(type==='loop'){
                    document.querySelector('video').loop=true;
                    document.querySelector('video').play();
                }
                if(type==='unloop'){
                    document.querySelector('video').loop=false;
                }

            }
        };