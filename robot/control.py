
def check_for_obstacle(obstacle_sensor):
    while obstacle_sensor.distance() > 300:
            wait(10)

def test_automatic_movement(robot, obstacle_sensor,gyro_sensor):
    #Gyro Straight Proportional Constant
    GSPK = 2.5 
    gyro_sensor.reset_angle(0)
    while True:
        correction = (0-gyro_sensor.angle())*GSPK
        # Begin driving straight forward at 200 millimeters per second.
        robot.drive(200, correction)
    
        # Wait until an obstacle is detected. This is done by repeatedly
        # doing nothing (waiting for 10 milliseconds) while the measured
        # distance is still greater than 300 mm.
        check_for_obstacle(obstacle_sensor)
    
        # Drive backward for 300 millimeters.
        robot.straight(-300)
    
        # Turn around by 120 degrees
        robot.turn(120)