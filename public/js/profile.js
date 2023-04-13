//sends user document info to the AWS bucket
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

    //requires user has title and industry field filled and either a document of post text to proceed
    if(title && career_field !== 'Select Industry'){
      if(file || text ){    
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
    }else{
      alert("You didn't any content to post");
    }
  }else{
    alert("Your post must have a title and industry");
  }
}


const deleteDocumentHandler = async (event) => {
  event.preventDefault();
  //this grabs the id from the delete button to use in the delete param
  const id = event.target.dataset.id;
  const fallback = event.target.dataset.fallback;
 
  if(id){
    const endpoint = `/api/document/${id}`;
    const response = await fetch(`${endpoint}`, {
    method: 'DELETE'
  });
  console.log(response);
    if (response.ok) {
    //if the reponse from the route is ok, reloads the profile page
    document.location.replace('/profile');
    } else {
      return;
    }
  }else if(fallback){
    console.log(fallback);
      document.location.replace(`/post/question/${fallback}`)
  }else{
    return;
  }
}


const bio = document.getElementById('bio');
const updateButton = document.getElementById('updateButton');

let originalBio = bio.textContent;
console.log(originalBio)

bio.addEventListener('change', (event) => {
  updateButton.classList.remove('hidden')
})

updateButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const updatedBio = bio.value.trim()

  const response = await fetch('/api/users/bio', {
    method: 'PUT',
    body: JSON.stringify({
      'bio': updatedBio
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.ok) {
      location.reload();
  }
})


document.querySelector('#document-table').addEventListener('click', deleteDocumentHandler);
document.querySelector('#file-upload-form').addEventListener('submit', AWSupload);
