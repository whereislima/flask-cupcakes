const BASE_URL = "http://localhost:5000/api";


function generateCupcakeHTML(cupcake) {
  return `
    <li> ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
    <button>delete cupcake</button>
    </li>
    <img class="cupcake-image" src="${cupcake.image}" width="300" height="400">
    `
}

async function showInitialCupcakes() {
  const response = await axios.get(`${BASE_URL}/cupcakes`);

  for(let cupcakeData of response.data.cupcakes) {
    let newCupcake = $(generateCupcakeHTML(cupcakeData));
    $("#cupcakes-list").append(newCupcake);
  }
}

// handle form submit for new cupcake and add to api
$("#new-cupcake-form").on("submit", async function(evt) {
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



$(showInitialCupcakes);

