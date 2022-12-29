document
  .querySelector('#editPostForm')
  .addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = document.querySelector('#editPostForm');
    const id = form.dataset.id;
    const userId = form.children[0].dataset.userid;
    const title = form.title.value;
    const post = form.content.value;
    const body = JSON.stringify({ userId, title, post });

    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body,
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });

    response.ok
      ? (location.href = '/dashboard')
      : alert('Something went wrong...');
  });

document
  .querySelector('#deletePostButton')
  .addEventListener('click', async (e) => {
    e.preventDefault();
    const form = document.querySelector('#editPostForm');
    const id = form.dataset.id;
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });

    response.ok
      ? (location.href = '/dashboard')
      : alert('Something went wrong...');
  });
