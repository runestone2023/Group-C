use rocket::{get, response::Stream};
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
enum Action {
    Hello,
    Move,
    Beep,
}

#[derive(Debug, Serialize, Deserialize)]
struct Command {
    action: Action,
    argument: u64, // FIXME: This should be some sort of generic byte string
}


#[get("/command")]
fn serve_command() { // Stream of commands or something that contains commands
    // Provide a buffer of commands for the robot to execute
}

#[get("/register")]
fn register() {
    // Save robot ip to database
}