#![feature(decl_macro)]
use endpoints::robot::Command;
use rocket::tokio::sync::broadcast::{channel, error::RecvError, Sender};
use rocket::{fs::NamedFile, get, launch, response::Redirect, routes, serde::uuid::Uuid};

use std::{
    collections::HashMap,
    io,
    path::{Path, PathBuf},
};

mod endpoints;

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
    let mut robot_streams: HashMap<Uuid, Sender<Command>> = HashMap::new();

    rocket::build()
        .mount("/", routes![index, dist_dir])
        .mount("/api/v1/ui", routes![endpoints::ui::register_robot])
        .mount("/api/v1/robot", routes![endpoints::robot::hello])
        .manage(robot_streams)
}
