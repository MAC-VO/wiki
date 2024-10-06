---
title: IMatcher
---

# IMatcher

Estimate the optical flow map between two frames. (Use left-frame of stereo pair)

## Interface

```python title="Module/Frontend/Matching.py"
class IMatcher(ABC, Generic[T_Context], ConfigTestableSubclass):
    @property
    @abstractmethod
    def provide_cov(self) -> bool: ...
    
    @abstractmethod
    def init_context(self) -> T_Context: ...
    
    @abstractmethod
    def estimate(self, frame_t1: SourceDataFrame, frame_t2: SourceDataFrame) -> tuple[torch.Tensor, torch.Tensor | None]: ...    
```

### Methods to Implement

* `IMatcher.estimate(frame_t1: SourceDataFrame, frame_t2: SourceDataFrame) -> flow, flow_cov`

    Given a frame with imageL, imageR being Bx3xHxW, return `output` where    

    * `flow`      - Bx2xHxW shaped torch.Tensor, estimated optical flow map
                maybe padded with `nan` if model can't output prediction with same shape as input image.
    * `flow_cov`  - Bx2xHxW shaped torch.Tensor or None, estimated covariance of optical flow map map (if provided)
                maybe padded with `nan` if model can't output prediction with same shape as input image.

* `IMatcher.provide_cov`

    Implement this property (to simply return `True` or `False`) to indicate whether the flow estimation network will jointly estimate the covariance / uncertainty.

* `IMatcher.init_context(self) -> T_Context`

    Works similar to the `__init__` method in python, where all used properties are stored in a dictionary and stored at `self.context`. This is for better static type inference on the property of each implementation of `IMatcher`.

    In this method you can access the configuration passed on initialization by `self.config`.

## Implementations

* `class GTMatcher(IMatcher[None])`
  
  Read ground truth flow from dataset and return

* `class FlowFormerMatcher(IMatcher[ModelContext])`
  
  Predict flow using vanilla FlowFormer model

* `class FlowFormerCovMatcher(IMatcher[ModelContext])`
  
  Jointly estimate flow and flow uncertainty using the proposed model in paper.

  :::info

    This is *not* the model used in MAC-VO. Instead, we used an implementation to `IFrontend` interface to jointly estimate
    flow and disparity (thus depth) for efficiency. See page for `IFrontend` interface for detail.

  :::

* `class TartanVOMatcher(IMatcher[ModelContext])`

  Estimate flow using TartanVO flow model. Note that the predicted flow will be padded with `float.nan` if its shape is not multiples of `64`.

* `class TartanVOCovMatcher(IMatcher[ModelContext])`

  A modified version of TartanVO flow model that can jointly estimate flow and uncertainty.

* `class GMFlowMatcher(IMatcher[ModelContext])`

    :::warning

    Will be released soon.

    :::

* `class UniMatchMatcher(IMatcher[ModelContext])`

    :::warning

    Will be released soon.

    :::

* `class UniMatchCovMatcher(IMatcher[ModelContext])`

    :::warning

    Will be released soon.

    :::


## Modifiers

Modifiers are "higher-order module" that creates a new `IMatcher` by tweaking the input/output of some designated `IMatcher` implementation.

* `class ApplyGTCov(IMatcher[IMatcher])`

    A higher-order-module that encapsulates a IMatcher module. 
    
    Always compare the estimated output of encapsulated IMatcher with ground truth matching and convert
    error in estimation to 'estimated' covariance.
    
    Will raise `AssertionError` if frame does not have gtFlow.

