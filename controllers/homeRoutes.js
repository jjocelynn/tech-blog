const router = require("express").Router();
const { Blog, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  const blog = await Blog.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  });

  // Serialize data so the template can read it
  const blogs = blog.map((project) => project.get({ plain: true }));
  let loggedIn= req.session.logged_in;

  // Pass serialized data and session flag into template
  res.render("homepage", {
    blogs,
    logged_in: loggedIn,
  });
});

// router.get("/:id", async (req, res) => {
//   try {
//     const blog = await Blog.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ["name"],
//         },
//       ],
//     });

//     const project = projectData.get({ plain: true });

//     res.render("project", {
//       ...project,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/comment", withAuth, async (req, res) => {
  console.log("did we get here" + req.session.logged_in)
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }
  try {
    const { id, comment } = req.body;
    const blog = await Blog.findByPk(id);
    let comments = blog.comment;

    if (!comments) {
      comments = [];
    }
    comments.push(comment);

    const [newComments] = await Blog.update(
      { comment: comments },
      { where: { id: id } }
    );

    res.redirect("/");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
