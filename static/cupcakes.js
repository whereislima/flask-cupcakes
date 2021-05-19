const BASE_URL = "http://localhost:5000/api";


function generateCupcakeHTML(cupcake) {
  return `
  <div data-cupcake-id=${cupcake.id}>
    <li> ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
    <button class="delete-cupcake">X</button>
    </li>
    <img class="cupcake-image" src="${cupcake.image}" width="300" height="400">
    </div>
    `;
}

async function showInitialCupcakes() {
  const response = await axios.get(`${BASE_URL}/cupcakes`);

  for (let cupcakeData of response.data.cupcakes) {
    let newCupcake = $(generateCupcakeHTML(cupcakeData));
    $("#cupcakes-list").append(newCupcake);
  }
}

// handle form submit for new cupcake and add to api
$("#new-cupcake-form").on("submit", async function (evt) {
  evt.preventDefault();

  // get form values
  let flavor = $("#form-flavor").val();
  let size = $("#form-size").val();
  let rating = $("#form-rating").val();
  let image = $("#form-image").val();

  // add form values to api
  const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
    flavor,
    rating,
    size,
    image
  });

  let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
  $("#cupcakes-list").append(newCupcake);
  $("#new-cupcake-form").trigger("reset");
})

$("#cupcakes-list").on("click", ".delete-button", async function (evt) {
  evt.preventDefault();

  let $cupcake = $(evt.target).closest("div");
  let cupcakeId = $cupcake.attr("data-cupcake-id");
  
  await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
  $cupcake.remove();
})

$(showInitialCupcakes);