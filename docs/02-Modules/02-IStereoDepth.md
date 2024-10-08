---
title: IStereoDepth
---

# IStereoDepth

Estimate dense depth map of a pair of rectified and undistorted stereo image.

## Interface


```python title="Module/Frontend/StereoDepth.py"
class IStereoDepth(ABC, Generic[T_Context], ConfigTestableSubclass):
    @property
    @abstractmethod
    def provide_cov(self) -> bool: ...
    
    @abstractmethod
    def init_context(self) -> T_Context: ...
    
    @abstractmethod
    def estimate(self, frame: SourceDataFrame) -> tuple[torch.Tensor, torch.Tensor | None]: ...
```

### Methods to Implement

* `IStereoDepth.estimate(frame: SourceDataFrame) -> depth, depth_cov`

    Given a frame with imageL, imageR being Bx3xHxW, return `output` where    

    * depth         - Bx1xHxW shaped torch.Tensor, estimated depth map
                    maybe padded with `nan` if model can't output prediction with same shape as input image.
    * depth_cov     - Bx1xHxW shaped torch.Tensor or None, estimated covariance of depth map (if provided)
                    maybe padded with `nan` if model can't output prediction with same shape as input image.

* `IStereoDepth.provide_cov`

    Implement this property (to simply return `True` or `False`) to indicate whether the depth estimation network will jointly estimate the covariance / uncertainty.

* `IStereoDepth.init_context(self) -> T_Context`

    Works similar to the `__init__` method in python, where all used properties are stored in a dictionary and stored at `self.context`. This is for better static type inference on the property of each implementation of `IStereoDepth`.

    In this method you can access the configuration passed on initialization by `self.config`.

## Implementations

* `class GTDepth(IStereoDepth[None])`

    Read ground truth depth from dataset (input `SourceDataFrame`). Will raise exception if dataset does not provide `gtDepth`.

* `class FlowFormerDepth(IStereoDepth[ModelContext])`

    Estimate disparity using the vanilla `FlowFormer` model. Then derive depth using `depth = (baseline * fx) / disparity`.

* `class FlowFormerCovDepth(IStereoDepth[ModelContext])`

    Jointly estimate disparity and disparity uncertainty, then derive deptha and corresponding depth uncertainty using formula above and the derived first-order taylor approximation in Appendix.

    :::info

    This is *not* the model used in MAC-VO. Instead, we used an implementation to `IFrontend` interface to jointly estimate
    flow and disparity (thus depth) for efficiency. See page for `IFrontend` interface for detail.

    :::

* `class TartanVODepth(IStereoDepth[ModelContext])`

    Estimate dense disparity map using TartanVO network, then convert to depth.

* `class UniMatchStereoDepth(IStereoDepth[ModelContext])`

    :::warning

    Will be released soon.

    :::

* `class UniMatchCovDepth(IStereoDepth[ModelContext])`
  
    :::warning

    Will be released soon.

    :::


## Modifiers

Modifiers are "higher-order module" that creates a new `IStereoDepth` by tweaking the input/output of some designated `IStereoDepth` implementation.

* `class ApplyGTCov(IStereoDepth[IStereoDepth])`

    A higher-order-module that encapsulates a `IStereoDepth` module. 
    
    Always compare the estimated output of encapsulated `IStereoDepth` with ground truth depth and convert
    error in estimation to 'estimated' covariance.
    
    Will raise `AssertionError` if frame does not have gtDepth.

