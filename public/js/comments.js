const commentBtn = document.getElementById('commentBtn');

const commentSection = document.getElementById('commentSection');
const commentContent = '';

commentBtn.addEventListener('click', async function(event) {
const id = event.target.dataset.id;
commentContent = document.getElementById('comment-input').value;
commentInput.value = '';
const response = await fetch('api/users/comment', {
    method: 'POST', 
    headers: {'Content-type': 'application/json'},
    body: {
        comment_text: commentContent,
        document_id: id
    }
})
if (response.ok) {
    location.reload()
} else {
    alert(response.statusText);
}
});
