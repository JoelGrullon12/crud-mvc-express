const MoviesMd = require("../models/Movie");

exports.GetProducts = (req, res, next) => {
    MoviesMd.GetAll(mov => {
        res.render("store/index", { title: "Home", movies: mov });
    })
};

exports.GetAddProduct = (req, res, next) => {
    res.render("store/add", { title: "Create" });
};

exports.PostAddProduct = (req, res, next) => {
    const name = req.body.name;
    const desc = req.body.desc;
    const type = req.body.type;

    const movie = new MoviesMd(null, name, desc, type, true);
    movie.Save();

    res.status(301).redirect("/");
};

exports.GetEditProduct = (req, res, next) => {

    MoviesMd.GetById(req.params.movieId, movie => {
        res.render("store/edit", { title: "Edit", movie: movie });
    });
};

exports.PostEditProduct = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const desc = req.body.desc;
    const type = req.body.type;
    const active = req.body.active;

    const movie = new MoviesMd(id, name, desc, type, active);
    movie.Save();

    res.status(301).redirect("/");
};

exports.GetDeleteProduct = (req, res, next) => {
    MoviesMd.GetById(req.params.movieId, movie => {
        res.render("store/delete", { title: "Delete", movie: movie });
    });
};

exports.PostDeleteProduct = (req, res, next) => {

    const id = req.body.id;

    MoviesMd.DeleteById(id);

    res.status(301).redirect("/");
};
