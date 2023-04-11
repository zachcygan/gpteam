const AWSupload = async (event) => {
    event.preventDefault();
    
    //creating the req body for document post
        const fileInput = document.getElementById('file-input');
        const career_field = document.getElementById('file-industry').value.trim();
        const file = fileInput.files[0];
        const text = document.getElementById('document-text-input').value.trim();
        const title = document.getElementById('document-title').value.trim();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('career_field', career_field);
        formData.append('text', text);
        formData.append('title', title);
    
        console.log(career_field);
        console.log(title);
        console.log(text);
      
        
        try {
          const response = await fetch('/api/uploads/upload', {
            method: 'POST',
            body: formData
          });
      
          if (response.ok) {
            const result = await response.json();
            console.log(result);
            //if the reponse from the route is ok, reloads the profile page
            document.location.replace('/profile');
          } else {
            alert('Error uploading file');
          }
        } catch (error) {
          console.error(error);
          alert('Error uploading file');
          document.location.replace('/profile');
        }
    }