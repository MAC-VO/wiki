"use strict";(self.webpackChunksrc=self.webpackChunksrc||[]).push([[567],{5226:e=>{e.exports=JSON.parse('{"version":{"pluginId":"default","version":"current","label":"Next","banner":null,"badge":false,"noIndex":false,"className":"docs-version-current","isLast":true,"docsSidebars":{"tutorialSidebar":[{"type":"link","label":"Introduction","href":"/","docId":"Intro","unlisted":false},{"type":"category","label":"Config","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Config Syntax","href":"/Config/Config-Spec","docId":"Config/Config-Spec","unlisted":false}]},{"type":"category","label":"Modules","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Overview","href":"/Modules/Modules","docId":"Modules/Modules","unlisted":false},{"type":"link","label":"IMatcher","href":"/Modules/IMatcher","docId":"Modules/IMatcher","unlisted":false},{"type":"link","label":"IStereoDepth","href":"/Modules/IStereoDepth","docId":"Modules/IStereoDepth","unlisted":false},{"type":"link","label":"IFrontend","href":"/Modules/IFrontend","docId":"Modules/IFrontend","unlisted":false},{"type":"link","label":"IKeypointSelector","href":"/Modules/IKeypointSelector","docId":"Modules/IKeypointSelector","unlisted":false},{"type":"link","label":"IMotionModel","href":"/Modules/IMotionModel","docId":"Modules/IMotionModel","unlisted":false},{"type":"link","label":"IObservationFilter","href":"/Modules/IObservationFilter","docId":"Modules/IObservationFilter","unlisted":false}]},{"type":"category","label":"Extend MAC-VO","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Frontend Network","href":"/Redevelop/NewFrontend","docId":"Redevelop/NewFrontend","unlisted":false},{"type":"link","label":"Backend Optimizer","href":"/Redevelop/NewOptimizer","docId":"Redevelop/NewOptimizer","unlisted":false}],"href":"/category/extend-mac-vo"},{"type":"category","label":"Utility","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"AutoScalingTensor","href":"/Utility/AutoScalingTensor","docId":"Utility/AutoScalingTensor","unlisted":false},{"type":"link","label":"SubclassRegistry","href":"/Utility/SubclassRegistry","docId":"Utility/SubclassRegistry","unlisted":false}],"href":"/category/utility"}]},"docs":{"Config/Config-Spec":{"id":"Config/Config-Spec","title":"Config Syntax","description":"Syntax of Config Files","sidebar":"tutorialSidebar"},"Intro":{"id":"Intro","title":"Introduction","description":"This document is for people who want to extend and redevelop based on the codebase of MAC-VO. The document is organized in the following order","sidebar":"tutorialSidebar"},"Modules/IFrontend":{"id":"Modules/IFrontend","title":"IFrontend","description":"Provides a interface for jointly estimate flow and depth (and optionally their covariances).","sidebar":"tutorialSidebar"},"Modules/IKeypointSelector":{"id":"Modules/IKeypointSelector","title":"IKeypointSelector","description":"","sidebar":"tutorialSidebar"},"Modules/IMatcher":{"id":"Modules/IMatcher","title":"IMatcher","description":"Estimate the optical flow map between two frames. (Use left-frame of stereo pair)","sidebar":"tutorialSidebar"},"Modules/IMotionModel":{"id":"Modules/IMotionModel","title":"IMotionModel","description":"","sidebar":"tutorialSidebar"},"Modules/IObservationFilter":{"id":"Modules/IObservationFilter","title":"IObservationFilter","description":"","sidebar":"tutorialSidebar"},"Modules/IStereoDepth":{"id":"Modules/IStereoDepth","title":"IStereoDepth","description":"Estimate dense depth map of a pair of rectified and undistorted stereo image.","sidebar":"tutorialSidebar"},"Modules/Modules":{"id":"Modules/Modules","title":"Overview","description":"An Interface specifies a component with certain methods and properties. A Module is the actual implementation of an interface and follows the type specification provided by the interface. In MACVO, we strictly followed the interface and wrote implementation-agnostic code. Therefore, all implementations of interfaces are interchangable without any breaking change.","sidebar":"tutorialSidebar"},"Redevelop/NewFrontend":{"id":"Redevelop/NewFrontend","title":"Frontend Network","description":"Adapt a Frontend Network to the MAC-VO codebase for downstream tasks.","sidebar":"tutorialSidebar"},"Redevelop/NewOptimizer":{"id":"Redevelop/NewOptimizer","title":"Backend Optimizer","description":"Swap the backend optimizer for different residual or graph formulation.","sidebar":"tutorialSidebar"},"Utility/AutoScalingTensor":{"id":"Utility/AutoScalingTensor","title":"AutoScalingTensor","description":"For effient `torch.cat` used in data accumulation.","sidebar":"tutorialSidebar"},"Utility/SubclassRegistry":{"id":"Utility/SubclassRegistry","title":"SubclassRegistry","description":"To dynamically reflect any subclass (or descendents) from string in runtime.","sidebar":"tutorialSidebar"}}}}')}}]);