#![feature(decl_macro)]
use rocket::{fs::NamedFile, get, launch, response::Redirect, routes};

use std::{
    io,
    path::{Path, PathBuf},
};

mod endpoints;
//mod models;
mod db;

use db::mongodb_robot::MongoRepo;
use endpoints::db::get_robot_data;

#[get("/")]
fn index() -> Redirect {
    Redirect::permanent("/index.html")
}

#[get("/<file..>")]
async fn dist_dir(file: PathBuf) -> io::Result<NamedFile> {
    NamedFile::open(Path::new("dist/").join(file)).await
}

#[launch]
fn rocket() -> _ {
    let db = MongoRepo::init();
    rocket::build()
        .manage(db)
        .mount("/", routes![index, dist_dir])
        .mount(
            "/api/v1/ui",
            routes![endpoints::ui::register_robot, get_robot_data],
        )
        .mount("/api/v1/robot", routes![endpoints::robot::hello])
}
