#![feature(decl_macro)]
use endpoints::robot::{establish_connection, hello, Command};
use endpoints::ui::{hello_test, register_robot, start_patrol};
use rocket::tokio::sync::broadcast::Sender;
use rocket::{fs::NamedFile, get, launch, response::Redirect, routes, serde::uuid::Uuid};

use std::sync::RwLock;
use std::{
    collections::HashMap,
    io,
    path::{Path, PathBuf},
};

mod endpoints;
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
    let robot_streams: HashMap<Uuid, Sender<Command>> = HashMap::new();
    let mutex_locked_hashmap: RwLock<HashMap<Uuid, Sender<Command>>> = RwLock::new(robot_streams);

    rocket::build()
        .manage(db)
        .mount("/", routes![index, dist_dir])
        .mount(
            "/api/v1/ui",
            routes![endpoints::ui::register_robot, get_robot_data],
        )
        .mount(
            "/api/v1/robot",
            routes![register_robot, hello_test, start_patrol],
        )
        .mount("/api/v1/robot", routes![hello, establish_connection])
        .manage(mutex_locked_hashmap)
}
