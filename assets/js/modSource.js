const cpl = document.getElementById('cpl');
    const addBtn = document.getElementById('add');
    const fileInput = document.getElementById('file-input');

    // Initialize BroadcastChannel
    const channelDsp = new BroadcastChannel('media_channel');

    // Add media via button
    addBtn.addEventListener('click', () => fileInput.click());

    // Handle file input
    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;
        for (const file of files) {
            processFile(file);
        }
    });

    // Handle drag and drop
    cpl.addEventListener('dragover', (event) => event.preventDefault());
    cpl.addEventListener('drop', (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        for (const file of files) {
            processFile(file);
        }
    });

    // Process individual file
    function processFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            addRow(e.target.result, file.type);
        };
        reader.readAsDataURL(file);
    }

    // Add a new row
    function addRow(mediaSrc, mediaType) {
        const row = document.createElement('div');
        row.className = 'row';

        const preview = document.createElement('span');
        preview.className = 'preview';

        const ctrl = document.createElement('span');
        ctrl.className = 'ctrl';

        const btns = document.createElement('span');
        btns.className = 'btns';

        if (mediaType.startsWith('image')) {
            const img = document.createElement('img');
            img.src = mediaSrc;
            preview.appendChild(img);
        } else if (mediaType.startsWith('video')) {
            const video = document.createElement('video');
            video.src = mediaSrc;
            video.controls = false;
            video.loop = true;
            preview.appendChild(video);

            // Add loop checkbox between preview and buttons
            const loopCheck = document.createElement('input');
            loopCheck.type = 'checkbox';
            loopCheck.className = 'loop-check';
            loopCheck.addEventListener('change', (e) => {
                video.loop = e.target.checked;
            });

            const loopLabel = document.createElement('label');
            loopLabel.textContent = ' Loop';
            loopLabel.appendChild(loopCheck);
            
            const loopContainer = document.createElement('span');
            loopContainer.className = 'loop-container';
            loopContainer.appendChild(loopLabel);
            // row.appendChild(loopContainer);
            ctrl.appendChild(loopContainer);
        }

        // Action buttons
        const playBtn = document.createElement('button');
        playBtn.className = 'play';
        playBtn.textContent = 'play';
        playBtn.addEventListener('click', () => {
            channelDsp.postMessage({ type: 'play', src: mediaSrc, mediaType });
            //loopchecks();
            document.getElementById('loopCheck').checked=false;
        });

        

        const delBtn = document.createElement('button');
        delBtn.className = 'del';
        delBtn.textContent = 'del';
        delBtn.addEventListener('click', () => row.remove());

        btns.appendChild(playBtn);
        btns.appendChild(delBtn);

        row.appendChild(preview);
        // row.appendChild(ctrl);
        row.appendChild(btns);
        cpl.appendChild(row);
    }
    
    //blank bg
        const blankBtn = document.getElementById('blank');
        blankBtn.addEventListener('click', () => {
          // const mediaSrc = "#000";
          channelDsp.postMessage({ type: 'play', src: 'blank', mediaType:'blank'});
        });

        //looping control
        const looper = document.getElementById('loopCheck');

        looper.addEventListener('change', () => {
          loopchecks();
        });

        function loopchecks(){
          // const mediaSrc = "#000";
          if(looper.checked){
            channelDsp.postMessage({ type: 'loop', src: 'loop', mediaType:'loop'});
          }
          else{
            channelDsp.postMessage({ type: 'unloop', src: 'unloop', mediaType:'unloop'});
          }
          
        }