use rocket::{get, post, response::status, serde::json::Json, State};
use crate::mongo_db::{RobotData, MongoDbConn};
use mongodb::{bson, doc};

#[get("/robotdata")]
pub fn get_robotdata(conn: &State<MongoDbConn>) -> Json<Vec<RobotData>> {
    let cursor = conn.collection.find(None, None).unwrap();
    let mut results = Vec::new();

    for result in cursor {
        if let Ok(item) = result {
            let robot_data: RobotData = bson::from_bson(bson::Bson::Document(item)).unwrap();
            results.push(robot_data);
        }
    }

    Json(results)
}

#[post("/robotdata", data = "<robot_data>")]
pub fn post_robotdata(conn: &State<MongoDbConn>, robot_data: Json<RobotData>) -> status::Created<()> {
    let bson = bson::to_bson(&robot_data.0).unwrap();
    let document = bson.as_document().unwrap();
    conn.collection.insert_one(document.to_owned(), None).unwrap();

    status::Created(
        format!("{}/{}", "http://localhost:8000", document.get_object_id("_id").unwrap()),
        Some(()),
    )
}