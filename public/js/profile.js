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

const newDocumentFormHandler = async (event) =>{
    event.preventDefault();
    const bucket_link = `https://gpteam-upload-bucket.s3.amazonaws.com/upload/${filename}`
    const career_field = document.getElementById('file-industry').value.trim();
   
    if (bucket_link && career_field){
    const response = await fetch(`/api/document`, {
        method: 'POST',
        body: JSON.stringify({ question_text, career_field }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to upload document');
    }
  }
}

document.querySelector('#file-upload-form').addEventListener('submit', newDocumentFormHandler);
document.querySelector('#question-upload-form').addEventListener('submit', newQuestionFormHandler);