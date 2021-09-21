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
                <input placeholder="Title" name="title"/>
                ${getError(errors, "title")}
                <input placeholder="Price" name="price"/>
                ${getError(errors, "price")}
                <input type="file" name="image"/>
                <button>Submit</button>
            </form>
      </div>
    </div>
        `,
  });
};
