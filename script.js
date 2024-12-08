// Wait for the scene to load
document.querySelector('a-scene').addEventListener('loaded', function () {
    const trigger = document.querySelector('#trigger');
    const keypad = document.querySelector('#keypad');
    const returnArrow = document.querySelector('#return-arrow');
    const passwordInput = document.querySelector('#password-input');
    const deleteButton = document.querySelector('#delete-button');
    const okButton = document.querySelector('#ok-button');
    const keypadButtons = document.querySelectorAll('.keypad-button');
    const dialogue = document.querySelector('#dialogue');
    const centralSphere = document.querySelector('#central-sphere');
    const orbitingSpheres = document.querySelector('#orbiting-spheres');
  
    // Password storage
    let currentPassword = '';
    const correctPassword = '491'; 

    // Function to replace textures on lateral faces
    const updateFacesTexture = (newTexture) => {
        document.querySelectorAll('.lateral-face').forEach((face) => {
            // Reset the material to remove any old textures
            face.setAttribute('material', {
                src: newTexture,
                side: 'double',
                transparent: true, // Ensure transparency is handled
            });
        });
    };
  
    // Show the keypad when clicking the red sphere
    trigger.addEventListener('click', function () {
      keypad.setAttribute('visible', true);

      dialogue.setAttribute('src', 'dialogue2.png');
      updateFacesTexture('expression_face_confuse.png');
    });

    // Hide keypad and show red sphere when clicking the return arrow
    returnArrow.addEventListener('click', function () {
        keypad.setAttribute('visible', false); // Hide the keypad
        trigger.setAttribute('visible', true); // Show the red sphere

        dialogue.setAttribute('src', 'dialogue1.png');
        updateFacesTexture('expression_face.png');
  });
  
    // Add click event to each keypad button
    keypadButtons.forEach((button) => {
      button.addEventListener('click', function (event) {
        const value = button.getAttribute('value');
        if (currentPassword.length < 10) { // Limit to 10 characters
          currentPassword += value;
          passwordInput.setAttribute('value', currentPassword); // Update input field
          event.stopPropagation();
        }
      });
    });
  
    // Delete the last character when "DEL" is clicked
    deleteButton.addEventListener('click', function () {
      currentPassword = currentPassword.slice(0, -1); // Remove the last character
      passwordInput.setAttribute('value', currentPassword); // Update input field
    });
  
    // Check the password when "OK" is clicked
    okButton.addEventListener('click', function () {
      if (currentPassword === correctPassword) {
        passwordInput.setAttribute('value', ''); // Clear input field
        currentPassword = ''; // Reset password
        keypad.setAttribute('visible', false); // Hide the keypad
        centralSphere.setAttribute('visible', true);
        orbitingSpheres.setAttribute('visible', true);

        dialogue.setAttribute('src', 'dialogue_correct.png');
        updateFacesTexture('expression_face_excited.png');
      } else {
        passwordInput.setAttribute('value', ''); // Clear input field
        currentPassword = ''; // Reset password

        dialogue.setAttribute('src', 'dialogue_incorrect.png');
        updateFacesTexture('expression_face_sad.png');
      }
    });
  });
  