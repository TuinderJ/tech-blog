document.querySelectorAll('.post').forEach((post) => {
  post.addEventListener('click', (e) => {
    const id =
      e.target.dataset.id ||
      e.target.parentNode.dataset.id ||
      e.target.parentNode.parentNode.dataset.id;

    location.href = `/comment/${id}`;
  });
});

document.querySelectorAll('.my-comment').forEach((comment) => {
  comment.addEventListener('click', (e) => {
    const id = e.target.dataset.id || e.target.parentNode.dataset.id;

    location.href = `/editComment/${id}`;
  });
});
