const router = require("express").Router();
const { Blog, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/updatePost", (req, res) => {
res.render("updatePost")
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  const blogEdit = blog.get({ plain: true });
  console.log(blogEdit);

  res.render("updatePost", {
    blogEdit,
    logged_in: req.session.logged_in,
  });
});



// router.post("/", withAuth, async (req, res) => {
//   try {
//     const newProject = await Project.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newProject);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

module.exports = router;
