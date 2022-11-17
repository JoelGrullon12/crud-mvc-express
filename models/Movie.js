const fs = require("fs");
const path = require("path");

const dataPath = path.join(path.dirname(require.main.filename), "data", "movies.json");

const GetAllMoviesFromFile = (cb) => {
    fs.readFile(dataPath, (error, data) => {
        if (error) {
            cb([]);
        } else {
            cb(JSON.parse(data))
        }
    })
}

const GetMovieById = (id, cb) => {
    fs.readFile(dataPath, (error, data) => {
        if (error) {
            cb({
                id: 0,
                name: "Error",
                desc: "Error al cargar los datos del archivo",
                type: "1",
                active: false
            });
        } else {
            const movies = JSON.parse(data);
            const movie = movies.find(mov => mov.id == id);
            cb(movie);
        }
    });
}

const DeleteMovieById = (id, cb) => {
    fs.readFile(dataPath, (error, data) => {
        if (error) {
            console.log(`No se ha podido encontrar la pelicula con el Id ${id}`)
        } else {
            const movies = JSON.parse(data);
            const movie = movies.find(mov => mov.id == id);
            cb(movie);
        }
    });
}

module.exports = class Movie {
    constructor(id, name, desc, type, active) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.type = type;
        this.active = active;
    }

    Save() {
        GetAllMoviesFromFile(movies => {
            if (this.id) {
                const index = movies.findIndex(mov => mov.id == this.id);
                movies[index] = this;
                fs.writeFile(dataPath, JSON.stringify(movies), (error) => {
                    console.log(error)
                });
            } else {
                this.id = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1;
                // console.log(movies.length);
                movies.push(this);
                fs.writeFile(dataPath, JSON.stringify(movies), (error) => {
                    console.log(error)
                });
            }
        });
    }

    static GetAll(cb) {
        GetAllMoviesFromFile(cb);
    }

    static GetById(id, cb) {
        GetMovieById(id, cb);
    }

    static DeleteById(id) {
        GetAllMoviesFromFile(movies => {
            const index = movies.findIndex(mov => mov.id == id);
            movies.splice(index,1);
            fs.writeFile(dataPath, JSON.stringify(movies), (error) => {
                console.log(error)
            });
        });


    }
}