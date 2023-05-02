use crate::endpoints::robot::{Action, Command, TEST_API_KEY};
use rocket::tokio::sync::broadcast::{Sender};
use rocket::{get, post, serde::uuid::Uuid, State};
use std::collections::HashMap;
use std::sync::{RwLock};
use uuid::Uuid as UuidCrate;

#[get("/register")]
pub async fn register_robot() -> String {
    // Generate an API key for a new robot
    UuidCrate::new_v4().to_string()

    // FIXME: Save the key in the database.
}

#[get("/data")]
pub async fn get_all_data() {
    // Optional, might not be required
    // Get all data for all robots.
}

#[get("/data/position/<robot_id>")]
pub async fn get_position(robot_id: Uuid) {
    // Get position for a robot.
}

#[get("/data/history/<robot_id>")]
pub async fn get_history(robot_id: Uuid) {
    // Get event history for a robot.
}

#[get("/command/hello")]
pub async fn hello_test(active_queues: &State<RwLock<HashMap<Uuid, Sender<Command>>>>) -> Option<()>{
    //! Test endpoint for testing that the frontend can reach the server.
    //! The endpoint sends a hello command to the robot.
    let _res = active_queues
        .read()
        .unwrap()
        .get(&TEST_API_KEY)?
        .send(Command {
            action: Action::Hello,
            argument: 0,
        });
    Some(()) //FIXME: This could be better when the implementation is compleated.
}

#[get("/command/move/<robot_id>?<drive_speed>&<rotation_speed>")]
pub async fn move_robot(robot_id: Uuid, drive_speed: f32, rotation_speed: f32) {
    // Move a specified robot forward or backward in a direction.
    // It is also possible to only rotate the robot or only backward/forward.
    // Rotation and drive speed can be negative.
}

// TODO: #[get("/command/patrol/<robot_id>/<patrol_id>")]
// pub async fn start_patrol(robot_id: Uuid, patrol_id: usize) {
// Endpoint that will tell the robot to start patrolling a specified path.
#[get("/command/patrol")]
pub async fn start_patrol() {}

#[post("/command/patrol/<robot_id>")]
pub async fn add_patrol_route(robot_id: Uuid) {
    // Send list of coordinates which makes up a path between two points (in body)

    // Endpoint to add patrol routes
}
