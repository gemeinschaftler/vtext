// Simulated file structure of the website
const structure = {
  "about": {
    "index.html": {},
    "team.html": {}
  },
  "blog": {
    "2025": {
      "july": {
        "hello-world.md": {}
      }
    }
  },
  "index.html": {}
};

// Utility to turn a file or folder name into a readable label
function beautifyName(name) {
  return name
    .replace(/\.(html|md)$/i, '')
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .replace(/^\w/, c => c.toUpperCase());
}

function buildTree(container, tree, path = '') {
  const ul = document.createElement('ul');

  Object.entries(tree).forEach(([name, subtree]) => {
    if (Object.keys(subtree).length === 0) {
      // File node
      const li = document.createElement('li');
      li.className = 'file';
      const a = document.createElement('a');
      a.textContent = beautifyName(name);
      let url = `${path}/${name}`;
      if (name === 'index.html' && path) url = `${path}/`; // map folder index
      a.href = url.replace(/\/+/g, '/');
      li.appendChild(a);
      ul.appendChild(li);
    } else {
      // Folder node
      const li = document.createElement('li');
      li.className = 'folder';
      const span = document.createElement('span');
      span.textContent = beautifyName(name);
      li.appendChild(span);
      const child = buildTree(null, subtree, `${path}/${name}`);
      child.classList.add('hidden');
      span.addEventListener('click', () => child.classList.toggle('hidden'));
      li.appendChild(child);
      ul.appendChild(li);
    }
  });

  if (container) container.appendChild(ul);
  return ul;
}

// Build the tree on page load
const container = document.getElementById('tree');
buildTree(container, structure, '');

// Simple search/filter functionality
const input = document.getElementById('filter');
input.addEventListener('input', () => {
  const term = input.value.toLowerCase();
  document.querySelectorAll('#tree li').forEach(li => {
    li.style.display = li.textContent.toLowerCase().includes(term) ? '' : 'none';
  });
});
