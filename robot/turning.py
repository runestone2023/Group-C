def automatic_movement(robot, obstacle_sensor,gyro_sensor):
    while True:
        #When an obstacle is detected, the robot stops and turns 110 degrees
        #The gyroscope angle goes to zero and the robot walks straight ahead
        if obstacle_sensor.distance() <= 300:
            correction = (0-gyro.angle())*GSPK #robot stays straight, and GSPK gives it a sharp correction
            robot.stop()
            robot.turn(110)
            gyro_sensor.reset_angle(0)
            robot.drive(100,correction)

    else:
        if obstacle_sensor.distance() > 300:
            correction = (0-gyro_sensor.angle())*GSPK
            robot.drive(100,correction)

robot.stop()
left_motor.brake()
right_motor.brake()
