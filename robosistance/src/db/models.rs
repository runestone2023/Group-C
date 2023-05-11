use mongodb::bson::Uuid;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RobotDetails {
    pub id: Uuid,
    pub name: String,
    pub description: String,
    pub location: String,
}

impl RobotDetails {
    fn new(id: Uuid) -> Self {
        RobotDetails {
            id: id,
            name: String::new(),
            description: String::new(),
            location: String::new(),
        }
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RobotPosition {
    pub id: Uuid,
    pub position: Vec<MovementData>,
}

#[derive(Copy, Clone, Debug, Serialize, Deserialize)]
pub struct PatrolStatus {
    pub id: usize,
    pub current_step: usize,
}

#[derive(Copy, Clone, Debug, Serialize, Deserialize)]
pub enum MovementData {
    DistanceMoved(u64), //Assuming millimetre granularity.
    RotationAngle(f32),
    PatrolStatus,
}
