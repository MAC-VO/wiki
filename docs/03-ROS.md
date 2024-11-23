# ROS2 Integration

MAC-VO can be integrated with ROS-2 as a single node. The implementation is tested under ROS-2 Humble.

To install, use the ROS-2 wrapper and follow the instruction in https://github.com/MAC-VO/MAC-VO-ROS2.

## Topic Subscription and Publication

By default, the `MACVONode` takes in two topics for left and right camera of a stereo. The stereo image should be undistorted and rectified before passing into the MAC-VO. The images should be a ROS-2 message of type `sensor_msgs/Image Message`. The default topic subscribed is set as below and can be modified freely.

```py title="MACVO_ROS2/MACVO.py"
imageL_topic="/zed/zed_node/left/image_rect_color",
imageR_topic="/zed/zed_node/right/image_rect_color",
```

The `MACVONode` will publish three topics,
```py title="MACVO_ROS2/MACVO.py"
pose_topic  ="/macvo/pose",
point_topic ="/macvo/map",
img_stream  ="/macvo/img",
```
representing the estimated pose, per-frame point cloud and a down-sampled version of image received by the MAC-VO.
