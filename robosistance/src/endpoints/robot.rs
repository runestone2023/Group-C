use core::fmt;

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


impl fmt::Display for Action {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Action::Hello => write!(f, "Hello"),
            Action::Rotate => write!(f, "Rotate"),
            Action::Move => write!(f, "Move"),
            Action::Beep => write!(f, "Beep"),
        }
    }
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
            yield Event::data("").event(Action::Hello.to_string());
            timer.tick().await;
        }
    }
}