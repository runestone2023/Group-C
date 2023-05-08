use std::env;
extern crate dotenv;
use super::robot_model::RobotData;
use dotenv::dotenv;

//use crate::models::robot_model::RobotData;
use mongodb::{
    bson::extjson::de::Error,
    sync::{Client, Collection},
};

pub struct MongoRepo {
    col: Collection<RobotData>,
}

impl MongoRepo {
    pub fn init() -> Self {
        dotenv().ok();
        let uri = match env::var("MONGOURI") {
            Ok(v) => v.to_string(),
            Err(_) => format!("Error loading env variable"),
        };
        let client = Client::with_uri_str(uri).expect("Could not connect with client uri");
        let db = client.database("robotData");
        let col: Collection<RobotData> = db.collection("robotData");
        MongoRepo { col }
    }
    pub fn get_robot_data(&self) -> Result<Vec<RobotData>, Error> {
        let cursors = self
            .col
            .find(None, None)
            .ok()
            .expect("Error getting list of robot data");
        let robot_data = cursors.map(|doc| doc.unwrap()).collect();
        Ok(robot_data)
    }
}
