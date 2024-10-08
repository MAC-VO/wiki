# IMotionModel

A motion model class receives informations (e.g. frames, estimated flow and depth) and produce an initial guess to the pose of incoming frame **under global coordinate**.

## Interface

```python title="Module/MotionModel.py"
class IMotionModel(ABC, ConfigTestableSubclass):
    def __init__(self, config: SimpleNamespace):
        self.config : SimpleNamespace = config
    
    @abstractmethod
    def predict(self, frame: SourceDataFrame, flow: torch.Tensor | None, depth: torch.Tensor | None) -> pp.LieTensor:
        ...
    
    @abstractmethod
    def update(self, pose: pp.LieTensor) -> None:
        ...
```

### Methods to Implement

* `IMotionModel.predict(...) -> pp.LieTensor`

    Estimate the pose of next frame given current frame, estimated depth and flow.
    
    Returns `pose`, a `(7,)` shaped pypose.LieTensor (SE3 ltype) under world coordinate predicted pose of next frame.

* `IMotionModel.update(self, pose: pp.LieTensor) -> None`

    Receive a feedback (optimized pose) and may (or may not) use this method to refine next prediction.


## Implementations

* `class GTMotionwithNoise(IMotionModel)`
    
    Apply GT motion with noise (can be disabled by setting `noise_std` to 0.0 in config) on previous optimized pose to predict next pose.

* `class TartanMotionNet(IMotionModel)`
    
    Apply motion estimated by MotionNet adapted from TartanVO on previously optimized pose to predict next pose.

* `class StaticMotionModel(IMotionModel)`
    
    Assumes the camera is static and simply record and returns the pose of previous frame.

* `class ReadPoseFile(IMotionModel)`
    
    Use an external file of Nx7 SE3 poses as motion model output poses.
    
    :::info
    Specifically, the module will *not* output these poses directly but calculate the motion
    and apply motion on modified poses (potentially by optimizer) iteratively.
    :::
