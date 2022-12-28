const form = document.querySelector('#newPostForm');

const createPost = async (e) => {
  e.preventDefault();
  const userId = form.children[0].dataset.userid;
  const title = form.title.value;
  const post = form.content.value;
  const body = JSON.stringify({ userId, title, post });

  const response = await fetch('./api/posts', {
    method: 'POST',
    body,
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });

  const data = await response.json();
  response.ok
    ? (location.href = './dashboard')
    : alert('Something went wrong...');
};

form.addEventListener('submit', createPost);
