document
  .querySelector('#comment-form')
  .addEventListener('submit', async (e) => {
    e.preventDefault();
    const postId = document.querySelector('.post').dataset.id;
    const form = document.querySelector('#comment-form');
    const comment = form.comment.value;
    const body = JSON.stringify({
      postId,
      comment,
    });

    const response = await fetch('/api/comments', {
      method: 'POST',
      body,
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });

    response.ok ? (location.href = '/') : alert('Something went wrong...');
  });
