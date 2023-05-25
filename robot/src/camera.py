import cv2

#video capture object
cap=cv2.VideoCapture(1) #iphone camera

# capture the frames..
exit_flag = False

while not exit_flag:
    ret, frame = cap.read()

    cv2.imshow('Frame', frame)  # Display the resulting frame

    key = cv2.waitKey(1)
    if key == 27:  # Press Esc key to exit
        exit_flag = True

cap.release()
cv2.destroyAllWindows()
