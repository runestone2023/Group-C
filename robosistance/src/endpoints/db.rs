use crate::{models::robot_model::RobotData, db::mongodb_robot::MongoRepo};
use mongodb::{bson::oid::ObjectId, results::InsertOneResult};
use rocket::{http::Status, serde::json::Json, State};
use rocket::get;

#[get("/get_robot_data")]
pub fn get_robot_data(db: &State<MongoRepo>) -> Result<Json<Vec<RobotData>>, Status> {
    println!("COMES HERE");   
    let robot_data = db.get_robot_data();
    match robot_data {
        Ok(robot_data) => Ok(Json(robot_data)),
        Err(_) => Err(Status::InternalServerError),
    }
}