use mongodb::bson::Uuid;
use serde::{Deserialize, Serialize};
use std::fmt;

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

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Route {
    pub commands: Vec<Command>,
}

#[derive(Copy, Clone, Debug, Serialize, Deserialize)]
pub enum Command {
    Hello,
    Rotate(f32),
    Move(u64, f32),
    Beep,
    Patrol(usize), // As an id.
    Closed,
    Route,
}

impl fmt::Display for Command {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        use Command::*;

        match self {
            Hello => write!(f, "Hello"),
            Rotate(_) => write!(f, "Rotate"),
            Move(_, _) => write!(f, "Move"),
            Beep => write!(f, "Beep"),
            Patrol(_) => write!(f, "Patrol"),
            Closed => write!(f, "Closed"),
            Route => write!(f, "Route"),
        }
    }
}
