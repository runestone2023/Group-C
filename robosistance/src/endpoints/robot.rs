use core::fmt;
use rocket::http::Status;
use rocket::response::stream::{Event, EventStream};
use rocket::serde::{json::Json, uuid::uuid, uuid::Uuid};
use rocket::tokio::select;
use rocket::tokio::sync::broadcast::{channel, error::RecvError, Receiver, Sender};
use rocket::tokio::time::{interval, Duration};
use rocket::{get, post, Shutdown, State};
use serde::{Deserialize, Serialize};

use std::collections::HashMap;
use std::sync::RwLock;

pub const TEST_API_KEY: Uuid = uuid!("67e55044-10b1-426f-9247-bb680e5fe0c8");

#[derive(Copy, Clone, Debug, Serialize, Deserialize)]
pub enum Action {
    Hello,
    Rotate,
    Move,
    Beep,
    Patrol,
    Closed,
}

impl fmt::Display for Action {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Action::Hello => write!(f, "Hello"),
            Action::Rotate => write!(f, "Rotate"),
            Action::Move => write!(f, "Move"),
            Action::Beep => write!(f, "Beep"),
            Action::Patrol => write!(f, "Patrol"),
            Action::Closed => write!(f, "Closed"),
        }
    }
}

#[derive(Copy, Clone, Debug, Serialize, Deserialize)]
pub struct Command {
    pub action: Action,
    pub argument: u64, // FIXME: This should be some sort of generic byte string
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct PatrolStatus {
    current_patrol_id: u64,
    current_patrol_step: u64,
}

#[get("/command")]
pub fn establish_connection(
    active_queues: &State<RwLock<HashMap<Uuid, Sender<Command>>>>,
    mut end: Shutdown,
) -> EventStream![] {
    //! Establish connection with the robot and send any commands that are added to a buffer of commands to the robot.

    // Initialise a send queue and subscribe to that queue
    let command_queue: Sender<Command> = channel::<Command>(1024).0;
    let mut receiver: Receiver<Command> = command_queue.subscribe();

    // Lock the active queues hashmap before inserting a sender queue of commands
    let mut locked_hashmap = active_queues.write().unwrap();

    locked_hashmap.insert(TEST_API_KEY, command_queue);

    EventStream! {
        loop {
            let data: Command;
            let event: String;

            select! {
                cmd = receiver.recv() => match cmd {
                    Ok(cmd) => (data, event) = (cmd, cmd.action.to_string()),
                    Err(RecvError::Closed) => break,
                    Err(RecvError::Lagged(_)) => continue,
                },
                _ = &mut end => break,
            };

            yield Event::json(&data).event(event);
        }
    }
}

#[post("/data/<robot_id>", format = "json", data = "<status>")]
pub fn collect_distance_traveled(robot_id: Uuid, status: Json<PatrolStatus>) -> (Status, &'static str) {
    //! Distance is in milimeters.
    
    // TODO: Save status in database

    (Status::NotImplemented, "Ok")
}

#[get("/hello")]
pub fn hello() -> EventStream![] {
    EventStream! {
        let mut timer = interval(Duration::from_secs(5));
        loop {
            yield Event::data("").event(Action::Hello.to_string());
            timer.tick().await;
        }
    }
}
