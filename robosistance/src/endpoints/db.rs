use crate::{db::mongodb_robot::MongoRepo, db::robot_model::RobotData};
use rocket::get;
use rocket::{http::Status, serde::json::Json, State};

#[get("/get_robot_data")]
pub fn get_robot_data(db: &State<MongoRepo>) -> Result<Json<Vec<RobotData>>, Status> {
    let robot_data = db.get_robot_data();
    match robot_data {
        Ok(robot_data) => Ok(Json(robot_data)),
        Err(_) => Err(Status::InternalServerError),
    }
}
