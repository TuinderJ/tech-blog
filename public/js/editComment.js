document
  .querySelector('#comment-form')
  .addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.querySelector('.comment-block').dataset.id;
    const comment = document.querySelector('#comment-form').comment.value;
    if (comment === '') return alert('Please fill something out.');
    const body = JSON.stringify({ comment });

    const response = await fetch(`/api/comments/${id}`, {
      method: 'PUT',
      body,
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });

    response.ok ? (location.href = '/') : alert('Something went wrong...');
  });

document
  .querySelector('#deleteCommentButton')
  .addEventListener('click', async (e) => {
    e.preventDefault();

    const id = document.querySelector('.comment-block').dataset.id;

    const response = await fetch(`/api/comments/${id}`, { method: 'DELETE' });

    response.ok ? (location.href = '/') : alert('Something went wrong...');
  });
