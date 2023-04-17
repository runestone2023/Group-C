use rocket::{get};
use uuid::Uuid;

#[get("/register")]
pub async fn register_robot() -> String {
    // Generate an API key for a new robot
    Uuid::new_v4().to_string()
    
    // FIXME: Save the key in the database.
}


#[get("/data")]
pub async fn get_all_data() {
    // Get all data for all robots.
}


#[get("/data/position/<robot_id>")]
pub async fn get_position(robot_id: &str) {
    // Maybe make id into a UUID?
    // Get position for a robot.
}


#[get("/data/history/<robot_id>")]
pub async fn get_history(robot_id: &str) {
    // Get event history for a robot.
}


#[get("/command")]
pub async fn command_info() {
    // Optional
    // Instructions on how to use this endpoint (everything starting with 'command').
}


#[get("/command/hello")]
pub async fn hello_test() {
    // Test endpoint that tells the robot to say hello.
}


#[get("/command/rotate/<robot_id>/<rotation>")]
pub async fn rotate_robot(robot_id: &str, rotation: f32) {
    // Rotation's type can be specified further into either a degrees or radians type.

    // Rotate a robot a specified amount of degrees. 
}


#[get("/command/move/<robot_id>/<forward>")]
pub async fn move_robot(robot_id: &str, forward: bool) {
    // Move a specified robot forward or backward.
}


#[get("/command/patrol/<robot_id>")]
pub async fn init_patrol(robot_id: &str) {
    // I am unsure how we will create a path for the robot. This endpoint will probably require more parameters such as a map with start and goal or a path.
    
    // Endpoint that will tell the robot to start patrolling a specified path.
}