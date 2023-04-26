use rocket::response::stream::{EventStream, Event};
use rocket::{get, serde::json::Json};
use serde::{Serialize, Deserialize};
use rocket::tokio::time::{Duration, interval};

#[derive(Debug, Serialize, Deserialize)]
enum Action {
    Hello,
    Rotate,
    Move,
    Beep,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Command {
    action: Action,
    argument: u64, // FIXME: This should be some sort of generic byte string
}


#[get("/command")]
fn serve_command() { // Stream of commands or something that contains commands
    // Provide a buffer of commands for the robot to execute
}

#[get("/hello")]
pub fn hello() -> Json<Command> {
    Json(Command {action: Action::Hello, argument: 0})
}

#[get("/hellostream")]
pub fn hello_stream() -> EventStream![] {
    EventStream! {
        let mut timer = interval(Duration::from_secs(5));
        loop {
            yield Event::json(&Command {action: Action::Hello, argument: 0})
            .with_comment("Bingus")
            .event("Hello");
            timer.tick().await;
        }
    }
}