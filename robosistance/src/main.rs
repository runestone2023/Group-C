#![feature(decl_macro)]

use rocket::{
    get,
    response::{NamedFile, Redirect},
    routes,
};

use std::{
    io,
    path::{Path, PathBuf},
};

mod robot_endpoints;

#[get("/")]
fn index() -> Redirect {
    Redirect::permanent("/index.html")
}

#[get("/<file..>")]
fn dist_dir(file: PathBuf) -> io::Result<NamedFile> {
    NamedFile::open(Path::new("dist/").join(file))
}

fn rocket() -> rocket::Rocket {
    rocket::ignite().mount("/", routes![index, dist_dir])
}

fn main() {
    rocket().launch();
}
