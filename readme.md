# Introduction to RoiTool

## 工具目的 (Purpose)

To help client-side users draw ROIs (Region of Interest) with a front-end UI.

協助客戶端使用者以前端繪圖 (canvas) 的方式，將要進行辨識的 ROI 和 "震動框" 直接用 API 方式提交給資料庫儲存。

## 工具有區分的流程狀態

- 新增 ROI
  - 無任何 ROI 亦無 "震動框"
  - 全新的預置點場景
- 新增 ROI
  - 至少有一筆 ROI
  - 新增第二三四筆 ROI
  - 已經設定過震動 (應全部相同)
- 修改 ROI
  - 預置點讀入時已有 ROI
  - 預置點讀入時已有震動 (應全部相同)
  - 修改同編號的 ROI 或 "震動框" 的位置
- TODO:
  - 刪除既有 ROI
