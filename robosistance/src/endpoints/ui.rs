use rocket::response::stream::Event;
use rocket::tokio::sync::broadcast::Sender;
use rocket::{get, http::Status, post, serde::json::Json, serde::uuid::Uuid, State};
use std::collections::HashMap;
use std::sync::RwLock;

use super::robot::TEST_API_KEY;
use crate::db::models::{Command, MovementData, Route};
use crate::db::mongodb::MongoRepo;

type StreamMap = RwLock<HashMap<Uuid, Sender<Event>>>;

#[get("/register")]
pub async fn register_robot() -> String {
    //! Generate an API key for a new robot
    Uuid::new_v4().to_string()

    // FIXME: Save the key in the database.
}

#[get("/data")]
pub async fn get_all_data() {
    //! Optional, might not be required
    //! Get all data for all robots.
}

#[get("/data/position/<robot_id>")]
pub fn get_position(
    robot_id: Uuid,
    db: &State<MongoRepo>,
) -> Result<Json<Vec<MovementData>>, Status> {
    let bson_uuid = bson::Uuid::from_uuid_1(robot_id);

    match db.get_robot_position(bson_uuid) {
        Ok(robot_data) => Ok(Json(robot_data)),
        Err(_) => Err(Status::InternalServerError), // Logging maybe?
    }
}

#[get("/data/history/<robot_id>")]
pub async fn get_history(robot_id: Uuid) {
    //! Get event history for a robot.
}

#[get("/command/hello")]
pub async fn hello_test(active_queues: &State<StreamMap>) -> Option<()> {
    //! Test endpoint for testing that the frontend can reach the server.
    //! The endpoint sends a hello command to the robot.
    let _res = active_queues
        .read()
        .unwrap()
        // TODO: Get the robot id given in the request instead
        .get(&TEST_API_KEY)?
        .send(Event::data("").event(Command::Hello.to_string()));
    Some(()) //FIXME: This could be better when the implementation is completed.
}

#[get("/command/move/<robot_id>?<drive_speed>&<rotation_speed>")]
pub async fn move_robot(
    robot_id: Uuid,
    drive_speed: u64,
    rotation_speed: f32,
    active_queues: &State<StreamMap>,
) -> Result<(), Status> {
    let command = Command::Move(drive_speed, rotation_speed);
    let event = Event::json(&command).event(command.to_string());

    active_queues
        .read()
        .unwrap()
        .get(&TEST_API_KEY)
        .ok_or(Status::InternalServerError)?
        .send(event)
        .or(Err(Status::InternalServerError))
        .and(Ok(()))
}

#[get("/command/patrol/<robot_id>/<patrol_id>")]
pub async fn start_patrol(robot_id: Uuid, patrol_id: u64, active_queues: &State<StreamMap>) -> Option<()> {
    //! Endpoint that will tell the robot to start patrolling a specified path.
    let patrol = Command::Patrol(0);
    
    let _res = active_queues
        .read()
        .unwrap()
        // TODO: Get the robot id given in the request instead
        .get(&TEST_API_KEY)
        .ok_or(Status::InternalServerError)?
        .send(Event::json(&patrol).event(patrol.to_string()));
    Ok(()) // FIXME: Handle errors better
}

#[post(
    "/command/patrol/add/<robot_id>",
    format = "json",
    data = "<new_route>"
)]
// TODO: Change robot_id to Uuid
pub async fn add_patrol_route(
    robot_id: Uuid,
    new_route: Json<Route>,
    active_queues: &State<StreamMap>,
    db: &State<MongoRepo>
) -> Result<(), Status> {
    //! Endpoint to add patrol routes
    db.save_route(new_route.commands.clone())
        .or(Err(Status::InternalServerError))?;
    let routes = db.get_routes().expect("no routes available");

    let _res = active_queues
        .read()
        .unwrap()
        // TODO: Get the robot id given in the request instead
        .get(&TEST_API_KEY)
        .ok_or(Status::InternalServerError)?
        .send(Event::json(&routes).event(Command::Route.to_string()));
    Ok(()) // FIXME: Handle errors better
}

#[get("/command/patrol/all")]
// TODO: Change robot_id to Uuid
pub async fn get_routes(db: &State<MongoRepo>) -> Result<Json<Vec<Route>>, Status> {
    //! Endpoint to get patrol routes
    match db.get_routes() {
        Ok(routes) => Ok(Json(routes)),
        Err(_) => Err(Status::InternalServerError),
    }
}

#[get("/command/stop-patrol/<robot_id>")]
// TODO: Change robot_id to Uuid and add patrol route id to arguments
pub async fn stop_patrol(
    robot_id: Uuid,
    active_queues: &State<RwLock<HashMap<Uuid, Sender<Event>>>>,
) -> Option<()> {
    //! Endpoint that will tell the robot to start patrolling a specified path.
    let stop_cmd = Command::StopPatrol;
    let _res = active_queues
        .read()
        .unwrap()
        // TODO: Get the robot id given in the request instead
        .get(&TEST_API_KEY)?
        .send(Event::json(&stop_cmd).event(stop_cmd.to_string()));
    Some(()) // FIXME: Handle errors better
}
