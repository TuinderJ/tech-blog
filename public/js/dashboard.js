const newPostRedirect = (e) => {
  e.preventDefault();
  location.href = '/newPost';
};

document
  .querySelector('#newPostButton')
  .addEventListener('click', newPostRedirect);
