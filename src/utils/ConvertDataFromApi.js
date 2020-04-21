const images = [
  "https://www.shareicon.net/data/512x512/2016/05/24/769983_man_512x512.png",
  "https://f0.pngfuel.com/png/304/305/man-with-formal-suit-illustration-png-clip-art-thumbnail.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5oX9ZCrY7zmZr_f9M5-tdZubbu6mfeKfckYExA2uIxht3DZ6S&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmuy5O1TA_3h_ajTQVZu2PBv7ZI0UsKOHqugMsIkeHs6YaL3uZ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9lMtrXMsJdWZW_Q7yDyVM3SB_KSibqboa3jU3YhFf0zFr5P-u&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwRRyYZpZwmrU70iYwUhRf75rLwkgx3o8crj2lBG5MSmy6QTvP8g&s",
];

const createNodes = (names, userName) => {
  let nodeArr = [];
  var node = {
    name: userName,
    id: 1,
    img: images[5],
  };

  nodeArr.push(node);
  for (let i = 0; i < names.length; i++) {
    node = {
      name: names[i],
      id: i + 2,
      img: images[i],
    };

    nodeArr.push(node);
  }
  return nodeArr;
};

const createEdges = (namesSize) => {
  let edgeArr = [];
  for (let i = 2; i <= namesSize + 1; i++) {
    let edge = { source: 1, target: i };
    edgeArr.push(edge);
  }
  return edgeArr;
};
export { createNodes, createEdges };
