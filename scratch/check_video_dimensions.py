import cv2

def check_video(path):
    cap = cv2.VideoCapture(path)
    if not cap.isOpened():
        print(f"Failed to open {path}")
        return
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"Video: {path}")
    print(f"  Resolution: {width}x{height}")
    print(f"  FPS: {fps}")
    print(f"  Frames: {frames}")
    print(f"  Duration: {frames / fps:.2f}s")
    cap.release()

check_video("public/video_images/splashpage.mp4")
check_video("public/video_images/splashpage_mobile.mp4")
