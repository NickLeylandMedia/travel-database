const apiToCard = (obj: any) => {
  let nameVar;
  let snipVar;
  let imgVar;
  let idVar;

  if (obj.name) {
    nameVar = obj.name;
  }
  if (obj.description) {
    snipVar = obj.snippet;
  }
  if (obj.image) {
    imgVar = obj.image;
  }
  if (obj.id) {
    idVar = obj.id;
  }

  return {
    name: nameVar,
    snippet: snipVar,
    image: imgVar,
    id: idVar,
  };
};

export { apiToCard };
