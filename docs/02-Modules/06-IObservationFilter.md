# IObservationFilter

This module filters out the observations using some simple logic. It helps for more robust tracking and removes outliers in the system at early stage of the system.

:::info

This module is *not* the keypoint filtering strategy introduced in the paper. For the keypoint filtering/selection process, see `IKeypointSelector`.

:::

## Interface

```py title="Module/OutlierFilter.py"
class IObservationFilter(ABC, ConfigTestableSubclass):
    def __init__(self, config: SimpleNamespace):
        self.config = config
    
    def set_meta(self, meta: MetaInfo):
        pass

    @abstractmethod
    def filter(self, observations: BatchObservation) -> torch.Tensor:
        ...
```

### Methods to Implement

* `IObservationFilter.set_meta(self, meta: MetaInfo) -> None`

    This method is used to receive meta info (e.g. camera intrinsic, image shape, etc.) on the first frame received by MAC-VO.
    
    The filter can then initialize some behavior dynamically based on this information.

* `IObservationFilter.filter(self, observations: BatchObservation) -> torch.Tensor`

    Given a batch of N observation (`BatchObservation`), the filter returns a boolean tensor of shape (N,) that 

        * sets True for "good" observation 
        * sets False for observations to filter away.

## Implementations

* `class FilterCompose(IObservationFilter):`

    Compose multiple filters sequentially. Return the `logical_and` of all sub-filters as final result.

* `class IdentityFilter(IObservationFilter):`

    Accept all observations unconditionally.

* `class CovarianceSanityFilter(IObservationFilter):`

    Reject all observations with `nan` or `inf` value in 3x3 covariance matrix.

* `class SimpleDepthFilter(IObservationFilter):`

    Given a `min_depth` and `max_depth` value, reject all observations that are out of this range. The `max_depth` can be set to `"auto"`, in which the maximum depth will be set to `baseline * fx` to enforce a minimum of 1-pixel disparity.

* `class DepthFilter(IObservationFilter):`

    A fancy depth filter that iteratively filter out observations with excessive depth. Prioritize observations with relatively low depth when there are not enough observations in the system.

* `class LikelyFrontOfCamFilter(IObservationFilter):`

    Filter out depth where `± 3 std_depth` is smaller than `0` (which indicates that the depth estimation is not confidence enough).
