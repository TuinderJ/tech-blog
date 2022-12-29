document.querySelector('#newPostButton').addEventListener('click', (e) => {
  e.preventDefault();
  location.href = '/newPost';
});

document.querySelectorAll('.dashboardPost').forEach((post) => {
  post.addEventListener('click', (e) => {
    let id = e.target.dataset.id;
    if (!id) id = e.target.parentNode.dataset.id;
    location.href = `/editPost/${id}`;
  });
});
