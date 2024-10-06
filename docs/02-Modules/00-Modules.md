# Overview

An **Interface** specifies a component with certain methods and properties. A **Module** is the actual implementation of an interface and follows the type specification provided by the interface. In MACVO, we strictly followed the interface and wrote *implementation-agnostic* code. Therefore, all implementations of interfaces are interchangable without any breaking change.

## Modules in MAC-VO

Currently the modules available / used by MAC-VO are

Interface           |   Description
---|---
`IMatcher   `       |   Estimate dense optical flow and (optionally) the uncertainty & occlusion mask of flow
`IStereoDepth   `   |   Estimate dense depth and (optionally) the uncertainty & occlusion mask of depth
`IFrontend`         |   A unified module for jointly estimating optical flow & stereo depth
`IKeypointSelector `  |   Select keypoint to track
`IMotionModel      `  |   Provide initial guess for the pose graph optimization
`IObservationFilter`  |   Filter out 'bad' / 'ill-defined' observations for tracking
`IObservationCov   `  |   Coverting 2D uncertainty to 3x3 spatial covariance matrix.
`IKeyframeSelector `  |   Selecting keyframe, poses at non-keyframe are interpolated
`IMapProcessor     `  |   Pose-process the map, perform smoothing / interpolation

The implementation of module is loaded **dynamically** following the config file, usually using the class method 

```python
Interface.instantiate("implementation_class_name", *args, **kwargs)
```
