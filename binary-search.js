let Node = (value) => {
  return { data: value, left: null, right: null };
};

const Tree = (array) => {
  const _array = [...new Set(array)].toSorted((a, b) => a - b);
  let root;

  const buildTree = (array) => {
    if (array.length === 0) return Node(null);
    if (array.length === 1) return Node(array[0]);

    // Set The middle element of the array as root.
    const midIndex = Math.floor(array.length / 2);
    let root = Node(array[midIndex]);

    // Recursively do the same for the left half and right half.
    // Get the middle of the left half and make it the left child of the root created in step 1.
    // Get the middle of the right half and make it the right child of the root created in step 1.
    let left = array.slice(0, midIndex);
    let right = array.slice(midIndex + 1);
    if (left.length > 0) root.left = buildTree(left);
    if (right.length > 0) root.right = buildTree(right);

    return root;
  };

  const prettyPrint = (node = root, prefix = '', isLeft = true) => {
    if (!node) {
      return;
    }
    if (node.right) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  const maxValue = (node) => {
    if (!node) return Number.MIN_VALUE;
    return Math.max(node.data, maxValue(node.left), maxValue(node.right));
  };

  const minValue = (node) => {
    if (!node) return Number.MAX_VALUE;
    return Math.min(node.data, minValue(node.left), minValue(node.right));
  };

  const checkValidity = (node = root) => {
    if (!node) return true;
    if (node.left && node.data < maxValue(node.left)) return false;
    if (node.right && node.data > minValue(node.right)) return false;
    if (!checkValidity(node.left) || !checkValidity(node.right)) return false;
    return true;
  };

  const insert = (value, node = root) => {
    if (!node) return Node(value);
    if (value < node.data) node.left = insert(value, node.left);
    if (value > node.data) node.right = insert(value, node.right);
    return node;
  };

  const remove = (value, node = root) => {
    if (!node) return node;

    if (value < node.data) {
      node.left = remove(value, node.left);
      return node;
    } else if (value > node.data) {
      node.right = remove(value, node.right);
      return node;
    }

    // Node to be removed is current node
    if (!node.left || !node.right) {
      // Leaf or single child node
      let temp = node.left || node.right;
      node = null;
      return temp;
    } else {
      // Multiple children node
      let successorParent = node;
      let successor = node.right;
      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }
      successorParent !== node
        ? (successorParent.left = successor.right)
        : (successorParent.right = successor.right);
      node.data = successor.data;
      successor = null;
      return node;
    }
  };

  const find = (value, node = root) => {
    if (!node) return null;
    if (node.data === value) return node;
    return find(value, node.left) || find(value, node.right);
  };

  const levelOrder = (callback = null, queue = [root]) => {
    if (queue.length === 0) return [];
    const node = queue.shift();
    if (!node) return [...levelOrder(callback, queue)];
    if (callback) callback(node);
    queue.push(node.left);
    queue.push(node.right);
    return callback ? levelOrder(callback, queue) : [node.data, ...levelOrder(callback, queue)];
  };

  const inorder = (callback = null, node = root) => {
    if (!node) return;
    const left = inorder(callback, node.left);
    if (callback) callback(node);
    const right = inorder(callback, node.right);
    return callback ? undefined : [...(left || []), node.data, ...(right || [])];
  };

  const preorder = (callback = null, node = root) => {
    if (!node) return;
    if (callback) callback(node);
    const left = preorder(callback, node.left);
    const right = preorder(callback, node.right);
    return callback ? undefined : [node.data, ...(left || []), ...(right || [])];
  };

  const postorder = (callback = null, node = root) => {
    if (!node) return;
    const left = postorder(callback, node.left);
    const right = postorder(callback, node.right);
    if (callback) callback(node);
    return callback ? undefined : [...(left || []), ...(right || []), node.data];
  };

  const height = (node = root) => {
    if (!node) return 0;
    return 1 + Math.max(height(node.left), height(node.right));
  };

  const depth = (node) => {
    if (!node) return;
    let depth = 1;
    let current = root;
    while (current !== node) {
      if (!current) return;
      depth++;
      node.data < current.data ? (current = current.left) : (current = current.right);
    }
    return depth;
  };

  const isBalanced = (node = root) => {
    if (!node) return true;
    return (
      height(node.left) - height(node.right) <= 1 && isBalanced(node.left) && isBalanced(node.right)
    );
  };

  const rebalance = (node = root) => {
    const sorted = inorder();
    root = buildTree(sorted);
  };

  root = buildTree(_array);

  return {
    root,
    prettyPrint,
    checkValidity,
    insert,
    remove,
    find,
    levelOrder,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};

export default { Node, Tree };
