const commentBtn = document.getElementById('comment-form');

const commentSection = document.getElementById('commentSection');
console.log('hello');

commentBtn.addEventListener('submit', async function(event) {
event.preventDefault();    
console.log('working');
const id = event.target.dataset.id;
let commentContent = document.getElementById('comment-input').value.trim();
const response = await fetch('/api/users/comment', {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        comment_text: commentContent,
        document_id: id
        
    })
})
if (response.ok) {
    location.reload()
} else {
    alert(response.statusText);
    console.log('not working');
}
});
