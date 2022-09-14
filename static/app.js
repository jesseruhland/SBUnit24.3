const $CupcakeList = $("#cupcake-list");
const $SubmitButton = $("#submit-btn");

async function getAllCupcakes() {
  const resp = await axios.get("/api/cupcakes");
  const list = resp.data.cupcakes;
  console.log(list);
  return list;
}

const createListVisuals = (list) => {
  for (cupcake in list) {
    const newLi = document.createElement("li");
    newLi.innerText = `${list[cupcake].flavor} / ${list[cupcake].size} / ${list[cupcake].rating}`;

    const subUl = document.createElement("ul");

    const subLi = document.createElement("li");

    const cupcakeImage = document.createElement("img");
    cupcakeImage.setAttribute("src", `${list[cupcake].image}`);
    cupcakeImage.setAttribute("width", "100px");
    cupcakeImage.setAttribute("height", "100px");

    subLi.append(cupcakeImage);
    subUl.append(subLi);
    newLi.append(subUl);

    $CupcakeList.append(newLi);
  }
};

async function addListToPage() {
  $CupcakeList.html("");
  const list = await getAllCupcakes();
  createListVisuals(list);
}

addListToPage();

async function addNewCupcake(flavor, size, rating, image) {
  data = { flavor, size, rating, image };
  await axios.post("/api/cupcakes", data);
}

$SubmitButton.click(async function (event) {
  event.preventDefault();
  const flavor = $("#flavor").val();
  const size = $("#size").val();
  const rating = $("#rating").val();
  const image = $("#image").val();

  await addNewCupcake(flavor, size, rating, image);

  $("#flavor").val("");
  $("#size").val("extra small");
  $("#rating").val("");
  $("#image").val("");

  addListToPage();
});
