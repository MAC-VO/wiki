# IObservationCov

Converts uncertainty on image plane (matching uncertainty and depth uncertainty) to 3D space for each keypoint. Corresponds to the section III.C in the MAC-VO paper.

## Interface

```py title="Module/Covariance/ObserveCov.py"
class IObservationCov(ABC, ConfigTestableSubclass):
    def __init__(self, config: SimpleNamespace):
        self.config = config
    
    @abstractmethod
    def estimate(
        self,
        frame: SourceDataFrame,
        kp: torch.Tensor,
        depth_cov_map: torch.Tensor | None,
        depth_map: torch.Tensor | None,
        depth_cov: torch.Tensor | None,
        flow_cov: torch.Tensor | None,
    ) -> torch.Tensor:
        ...
  
```

### Methods to Implement

* `IObservationCov.estimate(self, ...) -> torch.Tensor`
  
    Given N points, each with (u, v) coord, depth value, depth_cov, flow, and flow_cov, output a Nx3x3 tensor s.t. output[i] represents the 3x3 covariance matrix for the inverse-projected point in camera coordinate.

    Parameters:

    * `frame`     - `SourceDataFrame` from GenericSequence.
    * `kp`        - `N * 2` FloatTensor, [[u0, v0], ...], uv coordinate of keypoints on current frame
    * `depth_map` - `H * W` FloatTensor, Dense depth map for current frame
    * `depth_cov` - `N`     FloatTensor, [cov0, ...], depth covariance for each keypoint on current frame
    * `flow_cov`  - `N * 2` FloatTensor, [[σ²u, σ²v], ...], covariance of flow on u and v direction for keypoint on current frame

    Returns:

    * `cov_3d` - `N*3*3` DoubleTensor, in order of `zxy` - covariance of keypoint distribution in 3D space projected from the camera.

:::warning

The output covariance should have `double` or `float64` precision. Though this will lead to slower optimization and less computation-efficient, our experiment indicate that having high-precision covariance is crucial for the high-performance of MAC-VO. (i.e. using `float32` for optimization will not work that well)

:::

## Implementations

* `class NoCovariance(IObservationCov):`

    Simply predicts identity covariance matrix for each observation.

* `class DepthCovariance(IObservationCov):`

    Calculate the uncertainty with flow covariance set to `0` (for both `u` and `v` direction). Note that this will result in a degenerated covariance matrix (with rank 1). Therefore, a regularization term is added to create a full-rank covariance matrix.

* :star: `class MatchCovariance(IObservationCov):`

    Covariance projection model used and stated in the MAC-VO paper. Utilize the depth and flow covariance to jointly estimate the 3D covariance matrix of each observation / keypoint.


* `class GaussianMixtureCovariance(IObservationCov):`

    Model the depth uncertainty of matched keypoint using a Mixture-of-Guassian model instead of the weighted-variance model. See Figure 5.a) and Section III.C for more detail.

    This model is **not** used by the MAC-VO nor appears in any ablation study.

## Modifiers

A modifier takes in an observation covariance model and generates a "new" model by tweaking the input / output of an existing model.

* `class Modifier_Diagonalize(IObservationCov):`

    Diagonalize the covariance model by discarding all the off-diagonal terms in 3x3 covariance matrix predicted by another model.

* `class Modifier_Normalize(IObservationCov):`

    On every call, it will forward everything to the internal model and normalize the output covariance matrices (by setting average determinant of all points to 1).
