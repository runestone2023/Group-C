use rocket::http::Status;
use rocket::response::stream::{Event, EventStream};
use rocket::serde::{json::Json, uuid::uuid, uuid::Uuid};
use rocket::tokio::select;
use rocket::tokio::sync::broadcast::{channel, error::RecvError, Receiver, Sender};
use rocket::tokio::time::{interval, Duration};
use rocket::{get, post, Shutdown, State};

use std::collections::HashMap;
use std::sync::RwLock;

use crate::db::models::{Command, MovementData};
use crate::db::mongodb::MongoRepo;

pub const TEST_API_KEY: Uuid = uuid!("67e55044-10b1-426f-9247-bb680e5fe0c8");

#[get("/command")]
pub fn establish_connection(
    active_queues: &State<RwLock<HashMap<Uuid, Sender<Event>>>>,
    mut end: Shutdown,
) -> EventStream![] {
    //! Establish connection with the robot and send any commands that are added to a buffer of commands to the robot.

    // Initialise a send queue and subscribe to that queue
    let command_queue: Sender<Event> = channel::<Event>(1024).0;
    let mut receiver: Receiver<Event> = command_queue.subscribe();

    // Lock the active queues hashmap before inserting a sender queue of commands
    let mut locked_hashmap = active_queues.write().unwrap();

    locked_hashmap.insert(TEST_API_KEY, command_queue);

    EventStream! {
        loop {
            select! {
                event = receiver.recv() => match event {
                    Ok(event) => {println!("{:?}", event); yield event},
                    Err(RecvError::Closed) => break,
                    Err(RecvError::Lagged(_)) => continue,
                },
                _ = &mut end => break,
            };
        }
    }
}

#[post("/data/<robot_id>", format = "json", data = "<movement>")]
pub fn update_position(
    robot_id: Uuid,
    movement: Json<MovementData>,
    db: &State<MongoRepo>,
) -> Result<(), Status> {
    let bson_uuid = bson::Uuid::from_uuid_1(robot_id);
    match movement.into_inner() {
        MovementData::PatrolStatus => todo!(), // TODO: Save current patrol step in db
        other => db
            .append_position(bson_uuid, other)
            .or(Err(Status::InternalServerError)),
    }
}

#[get("/hello")]
pub fn hello() -> EventStream![] {
    EventStream! {
        let mut timer = interval(Duration::from_secs(5));
        loop {
            yield Event::data("").event(Command::Hello.to_string());
            timer.tick().await;
        }
    }
}

#[get("/command/patrol/all")]
pub async fn get_all_routes(
    active_queues: &State<RwLock<HashMap<Uuid, Sender<Event>>>>,
    db: &State<MongoRepo>,
) -> Result<(), Status> {
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
