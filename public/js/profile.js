const newQuestionFormHandler = async (event) =>{
    event.preventDefault();
    //this takes the text input from the create new question/text form and inserts its value as a variable to pass to the database
    const question_text = document.getElementById('question-input').value.trim();
    //this takes industry dropdown choice from the create new question/text form and inserts its value as a variable to pass to the database
    const career_field = document.getElementById('question-industry').value.trim();
   
    //this checks to make sure that their is value in the above fields before continuing
    if (question_text && career_field){
        //sends the request body to the api/post route
    const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ question_text, career_field }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        //if the reponse from the route is ok, reloads the profile page
        document.location.replace('/profile');
    } else {
        alert('Failed to post');
    }
  }
}


//sends user document info to the AWS bucket
const AWSupload = async (event) => {
event.preventDefault();
const career_field = document.getElementById('file-industry').value.trim();

//creating the req body for document post
const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    const text = document.getElementById('document-text-input').value.trim();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('career_field', career_field);
    formData.append('text', text);
  
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
    }
}

const deleteDocumentHandler = async (event) => {
  event.preventDefault();
  const id = event.target.dataset.id;
  console.log(id);

  if(id){
const response = await fetch(`/api/document/${id}`, {
    method: 'DELETE'
});
if (response.ok) {
    //if the reponse from the route is ok, reloads the profile page
    document.location.replace('/profile');
} else {
    return;
}
}
}

const deleteQuestionHandler = async (event) => {
  event.preventDefault();
  const id = event.target.dataset.id;
  console.log(id);

  //will only fire the event if the button with the data-id attribute is clicked, instead of somewhere else in the table
if(id){
const response = await fetch(`/api/post/${id}`, {
    method: 'DELETE'
});
if (response.ok) {
    //if the reponse from the route is ok, reloads the profile page
    document.location.replace('/profile');
} else {
    return;
}
  }
}


document.querySelector('#question-table').addEventListener('click', deleteQuestionHandler);
document.querySelector('#document-table').addEventListener('click', deleteDocumentHandler);
document.querySelector('#question-upload-form').addEventListener('submit', newQuestionFormHandler);
document.querySelector('#file-upload-form').addEventListener('submit', AWSupload);
