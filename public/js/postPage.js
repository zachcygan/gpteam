// const { query } = require("express");

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
  if (title && career_field !== 'Select Industry') {
    if (file || text) {
      try {
        const response = await fetch('/api/uploads/upload', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          //if the reponse from the route is ok, reloads the profile page
          document.location.replace('/post');
        } else {
          alert('Error uploading file');
        }
      } catch (error) {
        console.error(error);
        alert('Error uploading file');
        document.location.replace('/post');
      }
    } else {
      alert("You didn't any content to post");
    }
  } else {
    alert("Your post must have a title and industry");
  }
}

const handleFilter = async (event) => {
  event.preventDefault();

  const fltr = document.querySelector("#file-industry2").value;
  console.log(fltr);
  document.location.replace(`/post/${fltr}`);
  // // const response = await fetch(`/post/${fltr}`, {
  // //   method: 'GET',
  // // })
  // if (response.ok) {

  // } else {
  //   return
  // }
}


console.log(document.querySelector("#filter-btn"))
document.querySelector("#filter-btn").addEventListener('click', handleFilter)

document.querySelector('#file-upload-form').addEventListener('submit', AWSupload);
