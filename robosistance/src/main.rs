#![feature(decl_macro)]
use endpoints::robot::{establish_connection, get_all_routes, update_position};
use endpoints::ui::{
    add_patrol_route, get_position, get_routes, hello_test, register_robot, start_patrol,
    stop_patrol, move_robot
};
use rocket::response::stream::Event;
use rocket::tokio::sync::broadcast::Sender;
use rocket::{fs::NamedFile, get, launch, response::Redirect, routes, serde::uuid::Uuid};

use std::sync::RwLock;
use std::{
    collections::HashMap,
    io,
    path::{Path, PathBuf},
};

mod db;
mod endpoints;

use db::mongodb::MongoRepo;

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
    db.clear_routes().ok();
    db.init_route().ok();
    let robot_streams: HashMap<Uuid, Sender<Event>> = HashMap::new();
    let mutex_locked_hashmap: RwLock<HashMap<Uuid, Sender<Event>>> = RwLock::new(robot_streams);

    rocket::build()
        .mount("/", routes![index, dist_dir])
        .mount(
            "/api/v1/ui",
            routes![
                register_robot,
                get_position,
                get_routes,
                hello_test,
                add_patrol_route,
                stop_patrol,
                start_patrol,
                move_robot
            ],
        )
        .mount(
            "/api/v1/robot",
            routes![
                update_position,
                establish_connection,
                get_all_routes
            ],
        )
        .manage(mutex_locked_hashmap)
        .manage(db)
}
