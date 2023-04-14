use rocket::{get};
use uuid::Uuid;

#[get("/register")]
pub async fn register_robot() -> String {
    // Generate an API key for a new robot
    Uuid::new_v4().to_string()
    
    // FIXME: Save the key in the database.
}
