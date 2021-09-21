const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ errors }) => {
  return layout({
    content: `
    <div class="columns is-centered">
      <div class="column is-half">
        <h1 class="subtitle">Create a Product</h1>

            <form method="POST" enctype="multipart/form-data">
              <div class="field">
                <label class="label">Title</label>
                <input class="input" placeholder="Title" name="title"/>
              </div>
              ${getError(errors, "title")}

              <div class="field">
                <label class="label">Price</label>
                <input class="input" placeholder="Price" name="price"/>
              </div>
              ${getError(errors, "price")}
              
              <div class="field">
                <label class="label">Image</label>
                <input type="file" name="image"/>
              </div>
              <br />
              <button class="button is-primary">Create</button>
            </form>
      </div>
    </div>
        `,
  });
};
