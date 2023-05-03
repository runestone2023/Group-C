use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RobotData {
    #[serde(rename = "id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub position: String,
}
