use core::fmt;
use rocket::response::stream::{Event, EventStream};
use rocket::serde::{json::Json, uuid::uuid, uuid::Uuid};
use rocket::tokio::select;
use rocket::tokio::sync::broadcast::{channel, error::RecvError, Sender};
use rocket::tokio::time::{interval, Duration};
use rocket::{get, Shutdown, State};
use serde::{Deserialize, Serialize};

use std::collections::HashMap;
use std::sync::{RwLock};

pub const TEST_API_KEY: Uuid = uuid!("67e55044-10b1-426f-9247-bb680e5fe0c8");

#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum Action {
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

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Command {
    pub action: Action,
    pub argument: u64, // FIXME: This should be some sort of generic byte string
}

#[get("/command")]
pub fn serve_command(
    active_queues: &State<RwLock<HashMap<Uuid, Sender<Command>>>>,
    mut end: Shutdown,
) -> EventStream![] {
    //! Provide a buffer of commands for the robot to execute.

    let command_queue = channel::<Command>(1024).0;
    let mut receiver = command_queue.subscribe();

    // Lock the active queus hashmap before inserting a sender queue of commands
    let mut locked_hashmap = active_queues.write().unwrap();

    locked_hashmap.insert(TEST_API_KEY, command_queue);

    EventStream! {
        loop {
            select! {
                cmd = receiver.recv() => match cmd {
                    Ok(cmd) => cmd,
                    Err(RecvError::Closed) => break,
                    Err(RecvError::Lagged(_)) => continue,
                },
                _ = &mut end => break,
            };

            yield Event::data("").event(Action::Hello.to_string());
        }
    }
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
