use std::{
    env,
    error::Error,
    fmt::{self, write},
};
extern crate dotenv;
use super::models::{MovementData, RobotDetails, RobotPosition};
use dotenv::dotenv;

use mongodb::{
    bson::{doc, Uuid},
    sync::{Client, Collection},
};
use rocket::Data;

#[derive(Debug, Clone)]
pub enum DatabaseError {
    NotFound,
    MongoError(mongodb::error::Error),
    BsonError(bson::ser::Error),
}

impl fmt::Display for DatabaseError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use DatabaseError::*;
        match self {
            NotFound => write!(f, "entry was not found in the database"),
            MongoError(_) => write!(f, "the database could not complete the query"),
            BsonError(_) => write!(f, "could not serialize data"),
        }
    }
}

impl Error for DatabaseError {
    fn source(&self) -> Option<&(dyn Error + 'static)> {
        use DatabaseError::*;
        match self {
            NotFound => None,
            MongoError(e) => e.source(),
            BsonError(e) => e.source(),
        }
    }
}

impl From<mongodb::error::Error> for DatabaseError {
    fn from(value: mongodb::error::Error) -> Self {
        DatabaseError::MongoError(value)
    }
}

impl From<bson::ser::Error> for DatabaseError {
    fn from(value: bson::ser::Error) -> Self {
        DatabaseError::BsonError(value)
    }
}

pub struct MongoRepo {
    position: Collection<RobotPosition>,
    details: Collection<RobotDetails>,
}

impl MongoRepo {
    pub fn init() -> Self {
        dotenv().ok();
        let uri = match env::var("MONGOURI") {
            Ok(v) => v.to_string(),
            err => err.expect("Error loading env variable"),
        };
        let client = Client::with_uri_str(uri).expect("Could not connect with client uri");
        let db = client.database("Robosistance");
        let position: Collection<RobotPosition> = db.collection("Position");
        let details: Collection<RobotDetails> = db.collection("Details");
        MongoRepo { position, details }
    }

    // pub fn get_robot_data(&self) -> Result<RobotContainer, Error> {
    //     let id = "645cb5af719b1ef160f62cec";
    //     let obj_id = ObjectId::parse_str(id).unwrap();
    //     let filter = doc! {"_id": obj_id};
    //     let robot_data = self
    //         .col
    //         .find_one(filter, None)
    //         .ok()
    //         .expect("Error getting list of robot data");
    //     let robot_data = cursors.map(|doc| doc.unwrap()).collect();
    //     Ok(robot_data.expect("No data was found."))
    // }

    pub fn get_robot_position(&self, id: Uuid) -> Result<Vec<MovementData>, DatabaseError> {
        let filter = doc! {"id": id};
        let result = self
            .position
            .find_one(filter, None)?
            .ok_or(DatabaseError::NotFound)?
            .position;
        Ok(result)
    }

    pub fn append_position(
        &self,
        id: Uuid,
        new_position: MovementData,
    ) -> Result<(), DatabaseError> {
        let filter = doc! {"id": id};
        let doc = bson::to_document(&new_position)?;
        self.position
            .find_one_and_update(filter, doc!("$push": {"position": doc}), None)?
            .ok_or(DatabaseError::NotFound)?;
        Ok(())
    }
}
