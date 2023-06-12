const vm = Vue.createApp({
  data() {
    return {
      XCoord: 0,
      YCoord: 0,
      canvasHeight: 480,
      canvasWidth: 704,
      clickCount: 0,
      // 由 hidden input 載入的 JSON 資料
      processingData: {
        CameraId: 1,
        CameraNo: 'Cam_1',
        CameraName: '振興發',
        CameraPointId: 3,
        CameraPointNo: 1,
        CameraPointImageUrl: '',
        ROIConfigs: [
          {},
          //{
          //    ROIId: 105,
          //    CameraId: 1,
          //    CameraNo: 'Cam_1',
          //    CameraPointId: 3,
          //    CameraPointNo: 1,
          //    ALGFrame: 10,
          //    ALG_Type: 16,
          //    ContrastTH: 30,
          //    DetectionTH: 50,
          //    MaxBrightness: 225,
          //    MinBrightness: 80,
          //    Mode: 3,
          //    RPC: 0,
          //    Response: 15,
          //    SmokeTH: 35,
          //    ROI: 1,
          //    Smoke_LL_X: 161,
          //    Smoke_LL_Y: 254,
          //    Smoke_LR_X: 343,
          //    Smoke_LR_Y: 254,
          //    Smoke_TL_X: 161,
          //    Smoke_TL_Y: 202,
          //    Smoke_TR_X: 343,
          //    Smoke_TR_Y: 195,
          //    StableTH: 3,
          //    Stable_LL_X: 155,
          //    Stable_LL_Y: 415,
          //    Stable_LR_X: 335,
          //    Stable_LR_Y: 415,
          //    Stable_TL_X: 155,
          //    Stable_TL_Y: 350,
          //    Stable_TR_X: 335,
          //    Stable_TR_Y: 350,
          //    TextureTH: 30,
          //    alertPointnum: 4,
          //    iHeight: 480,
          //    iWidth: 704,
          //    ROIText: 'ROI1：華映',
          //    GroupName: '',
          //    IsDelete: false,
          //},
        ],
      },
      // 編輯狀態，預設為 false
      editMode: false,
      // 震動框編輯狀態，預設為 false
      editStableMode: false,
      // 背景框編輯狀態，預設為 false
      editBackgroundMode: false,
      vueCanvas: null,
      // 編輯區的 ROI 參數
      onEdit: {
        ROI: '',
        Smoke_TL_X: '',
        Smoke_TL_Y: '',
        Smoke_TR_X: '',
        Smoke_TR_Y: '',
        Smoke_LR_X: '',
        Smoke_LR_Y: '',
        Smoke_LL_X: '',
        Smoke_LL_Y: '',
        ROIText: '',
      },
      // Display - 使用者可互動的震動參數 / 編輯顯示
      onEditStableDisplay: {
        Stable_LL_X: '',
        Stable_LL_Y: '',
        Stable_LR_X: '',
        Stable_LR_Y: '',
        Stable_TL_X: '',
        Stable_TL_Y: '',
        Stable_TR_X: '',
        Stable_TR_Y: '',
      },
      // Stage - postToDatabase 時再合併給全部 ROI / 畫面顯示
      onEditStableStage: {
        Stable_LL_X: '',
        Stable_LL_Y: '',
        Stable_LR_X: '',
        Stable_LR_Y: '',
        Stable_TL_X: '',
        Stable_TL_Y: '',
        Stable_TR_X: '',
        Stable_TR_Y: '',
      },
      onEditBackgroundDisplay: {
        BackgroundROI_X1: '',
        BackgroundROI_Y1: '',
        BackgroundROI_X2: '',
        BackgroundROI_Y2: '',
        BackgroundROI_X3: '',
        BackgroundROI_Y3: '',
        BackgroundROI_X4: '',
        BackgroundROI_Y4: '',
      },
      onEditBackgroundStage: {
        BackgroundROI_X1: '',
        BackgroundROI_Y1: '',
        BackgroundROI_X2: '',
        BackgroundROI_Y2: '',
        BackgroundROI_X3: '',
        BackgroundROI_Y3: '',
        BackgroundROI_X4: '',
        BackgroundROI_Y4: '',
      },
      otherParams: {
        // ROIId 新增為 0, 既有則讀取後帶入
        // 資料庫中為 Unique ID
        ROIId: 0,
        IsDelete: false,
        alertPointnum: 4,
        //iHeight: 480,
        //iWidth: 704,
        GroupName: '',

        // 由外層傳入
        CameraId: '',
        CameraNo: '',
        CameraPointId: '',
        CameraPointNo: '',
        // ---

        ALG_Type: 16,
        // --- 6月新增參數
        FlameTH: 20,
        DeNoise: 0,
        ShakeLevel: 1,
        BrightnessR: 200,
        BrightnessG: 100,
        BrightnessB: 50,
        RmoreG: 105,
        RmoreB: 120,
        GmoreB: 110,
        MinArea: 0,
        MaxRatio: 20,
        MinWidth: 0,
        MinHeight: 0,
        ShakeSensitivity: 200,
        FlashBrightness: 250,
        FlashPercent: 10,
        Sensitive: 15,

        // 參數設定介面
        //SmokeTH: 35,
        //DetectionTH: 50,
        //Response: 15,
        //MaxBrightness: 225,
        //MinBrightness: 80,
        //TextureTH: 30,
        //ContrastTH: 30,
        //StableTH: 3,
        //ALGFrame: 10,
        //Mode: 3,
        // ---

        RPC: 0,

        // ROI 框設定介面
        // ROI: 1
        // Smoke_LL_X: 10,
        // Smoke_LL_Y: 50,
        // Smoke_LR_X: 100,
        // Smoke_LR_Y: 50,
        // Smoke_TL_X: 10,
        // Smoke_TL_Y: 10,
        // Smoke_TR_X: 100,
        // Smoke_TR_Y: 10,
        // ROIText: '',
        // ---

        // 震動框設定介面
        // Stable_LL_X: 155,
        // Stable_LL_Y: 415,
        // Stable_LR_X: 335,
        // Stable_LR_Y: 415,
        // Stable_TL_X: 155,
        // Stable_TL_Y: 350,
        // Stable_TR_X: 335,
        // Stable_TR_Y: 350,
        // ---

        // 背景框設定介面
        // BackgroundROI_X1: 200,
        // BackgroundROI_Y1: 10,
        // BackgroundROI_X2: 250,
        // BackgroundROI_Y2: 10,
        // BackgroundROI_X3: 250,
        // BackgroundROI_Y3: 30,
        // BackgroundROI_X4: 200,
        // BackgroundROI_Y4: 30,
      },
      onParamEditIndex: 0,
      onParamEditMode: false,
      // 這邊也要給是避免直接新增全新 ROI，卻沒有開啟參數 modal 做設定 (沒有呼叫過 startEditParams(index) 的情況)
      onParamEditObject: {
        SmokeTH: 30,
        DetectionTH: 50,
        Response: 10,
        MaxBrightness: 225,
        MinBrightness: 80,
        TextureTH: 30,
        ContrastTH: 30,
        StableTH: 5,
        ALGFrame: 10,
        Mode: 3,
        //BrightnessR: 200,
        //BrightnessG: 100,
        //BrightnessB: 50,
      },
      onDeleteIndex: 0,
    };
  },
  methods: {
    getCoords(event) {
      const canvas = this.$refs.canvas;
      const vm = this;
      vm.XCoord = event.pageX - canvas.offsetLeft;
      vm.YCoord = event.pageY - canvas.offsetTop;
    },
    editRoiPoints() {
      const vm = this;

      // 若非 editMode 則不執行此函數
      if (!vm.editMode) return;

      vm.clickCount += 1;

      let x = vm.XCoord;
      let y = vm.YCoord;

      switch (vm.clickCount) {
        case 1:
          vm.onEdit.Smoke_TL_X = x;
          vm.onEdit.Smoke_TL_Y = y;
          vm.drawStartPoint(vm.onEdit.Smoke_TL_X, vm.onEdit.Smoke_TL_Y, 'red');
          break;
        case 2:
          vm.onEdit.Smoke_TR_X = x;
          vm.onEdit.Smoke_TR_Y = y;
          vm.drawConnection(
            vm.onEdit.Smoke_TL_X,
            vm.onEdit.Smoke_TL_Y,
            vm.onEdit.Smoke_TR_X,
            vm.onEdit.Smoke_TR_Y,
            'red'
          );
          break;
        case 3:
          vm.onEdit.Smoke_LR_X = x;
          vm.onEdit.Smoke_LR_Y = y;
          vm.drawConnection(
            vm.onEdit.Smoke_TR_X,
            vm.onEdit.Smoke_TR_Y,
            vm.onEdit.Smoke_LR_X,
            vm.onEdit.Smoke_LR_Y,
            'red'
          );
          break;
        case 4:
          vm.onEdit.Smoke_LL_X = x;
          vm.onEdit.Smoke_LL_Y = y;
          // 畫出第四組點位時，閉合成框
          vm.drawConnection(
            vm.onEdit.Smoke_LR_X,
            vm.onEdit.Smoke_LR_Y,
            vm.onEdit.Smoke_LL_X,
            vm.onEdit.Smoke_LL_Y,
            'red'
          );
          vm.drawConnection(
            vm.onEdit.Smoke_LL_X,
            vm.onEdit.Smoke_LL_Y,
            vm.onEdit.Smoke_TL_X,
            vm.onEdit.Smoke_TL_Y,
            'red'
          );
          // vm.switchMode();
          break;
        default:
          console.log('clickCount not expectable...');
          break;
      }
    },
    editStableRoiPoints() {
      const vm = this;

      // 若非 editStableMode 則不執行此函數
      if (!vm.editStableMode) return;

      vm.clickCount += 1;

      let x = vm.XCoord;
      let y = vm.YCoord;

      switch (vm.clickCount) {
        case 1:
          vm.onEditStableDisplay.Stable_TL_X = x;
          vm.onEditStableDisplay.Stable_TL_Y = y;
          vm.drawStartPoint(vm.onEditStableDisplay.Stable_TL_X, vm.onEditStableDisplay.Stable_TL_Y, 'blue');
          break;
        case 2:
          vm.onEditStableDisplay.Stable_TR_X = x;
          vm.onEditStableDisplay.Stable_TR_Y = y;
          vm.drawConnection(
            vm.onEditStableDisplay.Stable_TL_X,
            vm.onEditStableDisplay.Stable_TL_Y,
            vm.onEditStableDisplay.Stable_TR_X,
            vm.onEditStableDisplay.Stable_TR_Y,
            'blue'
          );
          break;
        case 3:
          vm.onEditStableDisplay.Stable_LR_X = x;
          vm.onEditStableDisplay.Stable_LR_Y = y;
          vm.drawConnection(
            vm.onEditStableDisplay.Stable_TR_X,
            vm.onEditStableDisplay.Stable_TR_Y,
            vm.onEditStableDisplay.Stable_LR_X,
            vm.onEditStableDisplay.Stable_LR_Y,
            'blue'
          );
          break;
        case 4:
          vm.onEditStableDisplay.Stable_LL_X = x;
          vm.onEditStableDisplay.Stable_LL_Y = y;
          vm.drawConnection(
            vm.onEditStableDisplay.Stable_LR_X,
            vm.onEditStableDisplay.Stable_LR_Y,
            vm.onEditStableDisplay.Stable_LL_X,
            vm.onEditStableDisplay.Stable_LL_Y,
            'blue'
          );
          vm.drawConnection(
            vm.onEditStableDisplay.Stable_LL_X,
            vm.onEditStableDisplay.Stable_LL_Y,
            vm.onEditStableDisplay.Stable_TL_X,
            vm.onEditStableDisplay.Stable_TL_Y,
            'blue'
          );
          break;
        default:
          console.log('clickCount not expectable...');
          break;
      }
    },
    editBackgroundRoiPoints() {
      const vm = this;
      // 若非 editBackgroundMode 則不執行此函數
      if (!vm.editBackgroundMode) return;

      vm.clickCount += 1;

      let x = vm.XCoord;
      let y = vm.YCoord;

      switch (vm.clickCount) {
        case 1:
          vm.onEditBackgroundDisplay.BackgroundROI_X1 = x;
          vm.onEditBackgroundDisplay.BackgroundROI_Y1 = y;
          vm.drawStartPoint(
            vm.onEditBackgroundDisplay.BackgroundROI_X1,
            vm.onEditBackgroundDisplay.BackgroundROI_Y1,
            'teal'
          );
          break;
        case 2:
          vm.onEditBackgroundDisplay.BackgroundROI_X2 = x;
          vm.onEditBackgroundDisplay.BackgroundROI_Y2 = y;
          vm.drawConnection(
            vm.onEditBackgroundDisplay.BackgroundROI_X1,
            vm.onEditBackgroundDisplay.BackgroundROI_Y1,
            vm.onEditBackgroundDisplay.BackgroundROI_X2,
            vm.onEditBackgroundDisplay.BackgroundROI_Y2,
            'teal'
          );
          break;
        case 3:
          vm.onEditBackgroundDisplay.BackgroundROI_X3 = x;
          vm.onEditBackgroundDisplay.BackgroundROI_Y3 = y;
          vm.drawConnection(
            vm.onEditBackgroundDisplay.BackgroundROI_X2,
            vm.onEditBackgroundDisplay.BackgroundROI_Y2,
            vm.onEditBackgroundDisplay.BackgroundROI_X3,
            vm.onEditBackgroundDisplay.BackgroundROI_Y3,
            'teal'
          );
          break;
        case 4:
          vm.onEditBackgroundDisplay.BackgroundROI_X4 = x;
          vm.onEditBackgroundDisplay.BackgroundROI_Y4 = y;
          vm.drawConnection(
            vm.onEditBackgroundDisplay.BackgroundROI_X3,
            vm.onEditBackgroundDisplay.BackgroundROI_Y3,
            vm.onEditBackgroundDisplay.BackgroundROI_X4,
            vm.onEditBackgroundDisplay.BackgroundROI_Y4,
            'teal'
          );
          vm.drawConnection(
            vm.onEditBackgroundDisplay.BackgroundROI_X4,
            vm.onEditBackgroundDisplay.BackgroundROI_Y4,
            vm.onEditBackgroundDisplay.BackgroundROI_X1,
            vm.onEditBackgroundDisplay.BackgroundROI_Y1,
            'teal'
          );
          break;
        default:
          console.log('clickCount not expectable...');
          break;
      }
    },
    // 切換為編輯狀態
    switchMode(item) {
      const vm = this;

      if (vm.editStableMode) {
        window.alert('請先結束震動編輯模式！');
        return;
      }

      if (vm.editBackgroundMode) {
        window.alert('請先結束背景編輯模式！');
        return;
      }

      // item 為要編輯的既存 ROI 物件
      if (item) {
        // Vue's reactive function might solve this problem.
        // const onEditParamKeys = Object.keys(vm.onEdit);
        const onEditParamKeys = [
          'ROI',
          'Smoke_TL_X',
          'Smoke_TL_Y',
          'Smoke_TR_X',
          'Smoke_TR_Y',
          'Smoke_LR_X',
          'Smoke_LR_Y',
          'Smoke_LL_X',
          'Smoke_LL_Y',
          'ROIText',
        ];
        console.log('onEditParamKeys.length: ', onEditParamKeys.length);
        onEditParamKeys.forEach((elem) => {
          vm.onEdit[elem] = item[elem];
        });
      }
      vm.editMode = !vm.editMode;
    },
    drawStartPoint(x, y, color) {
      const vm = this;
      vm.vueCanvas.fillStyle = color;
      vm.vueCanvas.fillRect(x, y, 2, 2);
    },
    // 畫出兩點間的連線
    drawConnection(prevX, prevY, nextX, nextY, color) {
      const vm = this;
      vm.vueCanvas.strokeStyle = color;
      vm.vueCanvas.lineWidth = 3;
      vm.vueCanvas.beginPath();
      vm.vueCanvas.moveTo(prevX, prevY);
      vm.vueCanvas.lineTo(nextX, nextY);
      vm.vueCanvas.closePath();
      vm.vueCanvas.stroke();
    },
    renderRoi(roiConfigItem) {
      const vm = this;
      vm.vueCanvas.strokeStyle = 'red';
      vm.vueCanvas.lineWidth = 3;
      vm.vueCanvas.beginPath();
      vm.vueCanvas.moveTo(roiConfigItem.Smoke_TL_X, roiConfigItem.Smoke_TL_Y);
      vm.vueCanvas.lineTo(roiConfigItem.Smoke_TR_X, roiConfigItem.Smoke_TR_Y);
      vm.vueCanvas.lineTo(roiConfigItem.Smoke_LR_X, roiConfigItem.Smoke_LR_Y);
      vm.vueCanvas.lineTo(roiConfigItem.Smoke_LL_X, roiConfigItem.Smoke_LL_Y);
      vm.vueCanvas.lineTo(roiConfigItem.Smoke_TL_X, roiConfigItem.Smoke_TL_Y);
      vm.vueCanvas.closePath();
      vm.vueCanvas.stroke();
      // vm.vueCanvas.lineWidth = 1;
      vm.vueCanvas.font = `700 1rem Arial`;
      vm.vueCanvas.fillStyle = 'red';
      vm.vueCanvas.fillText(roiConfigItem.ROI, Number(roiConfigItem.Smoke_LL_X), Number(roiConfigItem.Smoke_LL_Y) + 16);
      // vm.vueCanvas.fillText(roiConfigItem);
    },
    renderStableRoi(roiConfigItem) {
      const vm = this;
      vm.vueCanvas.strokeStyle = 'blue';
      vm.vueCanvas.lineWidth = 3;
      vm.vueCanvas.beginPath();
      vm.vueCanvas.moveTo(roiConfigItem.Stable_TL_X, roiConfigItem.Stable_TL_Y);
      vm.vueCanvas.lineTo(roiConfigItem.Stable_TR_X, roiConfigItem.Stable_TR_Y);
      vm.vueCanvas.lineTo(roiConfigItem.Stable_LR_X, roiConfigItem.Stable_LR_Y);
      vm.vueCanvas.lineTo(roiConfigItem.Stable_LL_X, roiConfigItem.Stable_LL_Y);
      vm.vueCanvas.lineTo(roiConfigItem.Stable_TL_X, roiConfigItem.Stable_TL_Y);
      vm.vueCanvas.closePath();
      vm.vueCanvas.stroke();
    },
    renderBackgroundRoi(roiConfigItem) {
      const vm = this;
      vm.vueCanvas.strokeStyle = 'teal';
      vm.vueCanvas.lineWidth = 3;
      vm.vueCanvas.beginPath();
      vm.vueCanvas.moveTo(roiConfigItem.BackgroundROI_X1, roiConfigItem.BackgroundROI_Y1);
      vm.vueCanvas.lineTo(roiConfigItem.BackgroundROI_X2, roiConfigItem.BackgroundROI_Y2);
      vm.vueCanvas.lineTo(roiConfigItem.BackgroundROI_X3, roiConfigItem.BackgroundROI_Y3);
      vm.vueCanvas.lineTo(roiConfigItem.BackgroundROI_X4, roiConfigItem.BackgroundROI_Y4);
      vm.vueCanvas.lineTo(roiConfigItem.BackgroundROI_X1, roiConfigItem.BackgroundROI_Y1);
      vm.vueCanvas.closePath();
      vm.vueCanvas.stroke();
    },
    postToDatabase() {
      const vm = this;

      // 至少已經設定一組具 ROI 編號，且沒被註記刪除的 ROI 框 (有效ROI) 才能送出
      const excludeDeletedROIConfigs = vm.processingData.ROIConfigs.filter((item) => {
        if (item.ROI && !item.IsDelete) {
          return item;
        }
      });
      if (excludeDeletedROIConfigs.length < 1) {
        window.alert('至少須設定一組有效ROI才能送出！');
        return;
      }

      if (!vm.onEditStableStage.Stable_LL_Y) {
        window.alert('震動ROI須設定才能送出！');
        return;
      }

      // 背景ROI非必須

      // 刪除 ROIConfigs 中的空物件 (全新增加又刪除的)
      vm.processingData.ROIConfigs = vm.processingData.ROIConfigs.filter((item) => {
        if (Object.keys(item).length) {
          return item;
        }
      });

      // 把 onEditStableStage 寫到全部的 ROIConfigs 成員中
      // vm.processingData.ROIConfigs[i] = { ...vm.processingData.ROIConfigs[i], ...vm.onEditStableStage };

      const expandedROIConfigsArray = vm.processingData.ROIConfigs.map((item, index) => {
        // 如果是註記刪除的既有 ROI 就不更改其震動設定
        if (item.IsDelete) {
          return { ...item };
        } else {
          // 畫布寬高就是存到資料庫的 iWidth, iHeight 欄位
          return {
            ...item,
            ...vm.onEditStableStage,
            ...vm.onEditBackgroundStage,
            iWidth: vm.canvasWidth,
            iHeight: vm.canvasHeight,
          };
        }
      });

      vm.processingData.ROIConfigs = expandedROIConfigsArray;
      debugger;

      console.log('送到資料庫前的 vm.processingData:', vm.processingData);
      //const checkEveryROIConfigsLength =
      let checkEveryROIConfigsLengthArray = [];
      vm.processingData.ROIConfigs.forEach((item, index) => {
        checkEveryROIConfigsLengthArray.push({ isNewAdd: item.isNewAdd || false, length: Object.keys(item).length });
      });
      // 新建立的多 isNewAdd，少 InsertDateTime, InsertUnitId, InsertUserId, UpdateDateTime, UpdateUnitId, UpdateUserId
      console.log('資料長度檢查:', checkEveryROIConfigsLengthArray);

      const postJson = JSON.stringify(vm.processingData);
      debugger;

      const axiosOption = {
        headers: { 'Content-Type': 'application/json' },
      };
      axios
        .post('/Camera/CAM/CAM1030E00_Save', postJson, axiosOption)
        .then((response) => {
          console.log(response);

          window.alert(response.data.Message);
          if (response.data.Url) {
            location.href = response.data.Url;
          }
        })
        .catch((error) => {
          console.log(error);
          window.alert('送出失敗，請聯絡開發人員');
        });
    },
    clearCanvas() {
      const vm = this;
      // 清空白色光暈
      vm.vueCanvas.shadowColor = null;
      vm.vueCanvas.shadowBlur = null;
      vm.vueCanvas.clearRect(0, 0, canvas.width, canvas.height);
    },
    storeEditResult() {
      // console.log('store edition...');
      const vm = this;

      // 檢查是否必要參數都填寫
      let checkEmptyArray = Object.entries(vm.onEdit).filter((item) => {
        // ['key', 'value']
        // key 為非 ROIText 且 value 不可為空
        if (item[0] !== 'ROIText' && item[1]) {
          return item;
        }
      });

      if (checkEmptyArray.length < 9) {
        window.alert('ROI編號、4點的XY為必要設定參數！');
        return;
      }

      // 擴增參數，由外層傳入
      // SerId === ROIId
      vm.otherParams.CameraId = vm.processingData.CameraId;
      vm.otherParams.CameraNo = vm.processingData.CameraNo;
      vm.otherParams.CameraPointId = vm.processingData.CameraPointId;
      vm.otherParams.CameraPointNo = vm.processingData.CameraPointNo;

      // 設定相同的 ROI 會蓋過去，不同的就增加到陣列中
      const roiNoArray = vm.processingData.ROIConfigs.map((item, index) => {
        return item.ROI;
      });

      console.log('roiNoArray', roiNoArray);
      //console.log('onEdit', vm.onEdit);
      console.log('roiNoArray.include(), 是否為既有ROI:', roiNoArray.includes(vm.onEdit.ROI));

      // 對既有ROI儲存有兩種狀況，已經被註記刪除的，還有直接修改的
      // 對已註記刪除的新增視為全新
      // 直接修改的就把 onEdit 的各項新設定蓋過去
      if (roiNoArray.includes(vm.onEdit.ROI)) {
        // 沒找到 indexOf 會回傳 -1
        let replaceIndex = roiNoArray.indexOf(vm.onEdit.ROI);
        if (replaceIndex === -1) {
          console.log('Not expectable replaceIndex...');
        }

        // 已經註記刪除的狀況
        if (vm.processingData.ROIConfigs[replaceIndex].IsDelete) {
          const brandNewROI = { ...vm.onEdit, ...vm.otherParams, ...vm.onParamEditObject };
          brandNewROI.isNewAdd = true;
          vm.processingData.ROIConfigs.push(brandNewROI);
          debugger;
        } else {
          // 直接修改的狀況
          for (const key in vm.onEdit) {
            vm.processingData.ROIConfigs[replaceIndex][key] = vm.onEdit[key];
          }
          console.log(vm.processingData.ROIConfigs[replaceIndex]);
          debugger;
        }
      } else {
        // 從未設定過的新 ROI，擴增加入各項設定值
        // stable 相關參數都改到最後再併入 ...vm.onEditStableStage
        const brandNewROI = { ...vm.onEdit, ...vm.otherParams, ...vm.onParamEditObject };

        // 是否為新的標記 (給 deleteRoi 辨識)
        brandNewROI.isNewAdd = true;

        vm.processingData.ROIConfigs.push(brandNewROI);
        debugger;
      }

      vm.onEdit = {};
      vm.clickCount = 0;
      vm.switchMode();
      vm.initProcess();
    },
    storeStableEditResult() {
      const vm = this;

      // 檢查是否參數不足 8 組
      let checkEmptyArray = Object.values(vm.onEditStableDisplay).filter((item) => {
        if (item) {
          return item;
        }
      });

      if (checkEmptyArray.length < 8) {
        window.alert('設定的參數不足！');
        return;
      }

      // 把 onEditStableDisplay 中的各項參數設定給 onEditStableStage，再清空
      for (const key in vm.onEditStableDisplay) {
        vm.onEditStableStage[key] = vm.onEditStableDisplay[key];
        vm.onEditStableDisplay[key] = '';
      }

      vm.clickCount = 0;
      vm.switchStableMode();
      vm.initProcess();
    },
    storeBackgroundEditResult() {
      const vm = this;

      // 檢查是否參數不足 8 組
      let checkEmptyArray = Object.values(vm.onEditBackgroundDisplay).filter((item) => {
        if (item) {
          return item;
        }
      });
      if (checkEmptyArray.length < 8) {
        window.alert('設定的參數不足！');
        return;
      }
      for (const key in vm.onEditBackgroundDisplay) {
        vm.onEditBackgroundStage[key] = vm.onEditBackgroundDisplay[key];
        vm.onEditBackgroundDisplay[key] = '';
      }

      vm.clickCount = 0;
      vm.switchBackgroundMode();
      vm.initProcess();
    },
    addNewRoi() {
      const vm = this;
      // 若已在編輯模式，不准再新增
      if (vm.editMode) {
        window.alert('請先結束ROI編輯再新增！');
        return;
      }
      // 若已在震動編輯模式，不准切換
      if (vm.editStableMode) {
        window.alert('請先結束震動編輯！');
        return;
      }
      // 若已在背景編輯模式，不准切換
      if (vm.editBackgroundMode) {
        window.alert('請先結束背景框編輯！');
        return;
      }
      vm.editMode = true;
    },
    switchStableMode() {
      const vm = this;
      // 若已在震動編輯模式，不准切換
      if (vm.editMode) {
        window.alert('請先結束ROI編輯！');
        return;
      }
      if (vm.editBackgroundMode) {
        window.alert('請先結束背景框編輯！');
        return;
      }
      vm.editStableMode = !vm.editStableMode;
    },
    switchBackgroundMode() {
      const vm = this;
      // 若在其他編輯模式，不准切換
      if (vm.editMode) {
        window.alert('請先結束ROI編輯');
        return;
      }
      if (vm.editStableMode) {
        window.alert('請先結束震動編輯！');
        return;
      }
      vm.editBackgroundMode = !vm.editBackgroundMode;
    },
    // 因 stopEditParams 會清空編輯區，所以這邊會去偵測這些值是否有設定，不然帶入預設值
    startEditParams(index) {
      const vm = this;
      vm.onParamEditIndex = index;
      vm.onParamEditMode = true;
      vm.onParamEditObject.SmokeTH = vm.processingData.ROIConfigs[index].SmokeTH || 30;
      vm.onParamEditObject.DetectionTH = vm.processingData.ROIConfigs[index].DetectionTH || 50;
      vm.onParamEditObject.Response = vm.processingData.ROIConfigs[index].Response || 10;
      vm.onParamEditObject.MaxBrightness = vm.processingData.ROIConfigs[index].MaxBrightness || 225;
      vm.onParamEditObject.MinBrightness = vm.processingData.ROIConfigs[index].MinBrightness || 80;
      vm.onParamEditObject.TextureTH = vm.processingData.ROIConfigs[index].TextureTH || 30;
      vm.onParamEditObject.ContrastTH = vm.processingData.ROIConfigs[index].ContrastTH || 30;
      vm.onParamEditObject.StableTH = vm.processingData.ROIConfigs[index].StableTH || 5;
      vm.onParamEditObject.ALGFrame = vm.processingData.ROIConfigs[index].ALGFrame || 10;
      vm.onParamEditObject.Mode = vm.processingData.ROIConfigs[index].Mode || 3;
      //vm.onParamEditObject.BrightnessR = vm.processingData.ROIConfigs[index].BrightnessR || 200;
      //vm.onParamEditObject.BrightnessG = vm.processingData.ROIConfigs[index].BrightnessG || 100;
      //vm.onParamEditObject.BrightnessB = vm.processingData.ROIConfigs[index].BrightnessB || 50;
      debugger;
    },
    saveEditParams() {
      const vm = this;
      // index 是要編輯的 ROIConfig 在 processingData.ROIConfigs 中的位置
      const index = vm.onParamEditIndex;
      // 將這些參數存回去 processingData.ROIConfigs 中
      const objKeysArray = Object.keys(vm.onParamEditObject);
      objKeysArray.forEach((item) => {
        vm.processingData.ROIConfigs[index][item] = vm.onParamEditObject[item];
      });
      vm.onParamEditIndex = 0;
      vm.stopEditParams();
    },
    stopEditParams() {
      const vm = this;
      // 清空編輯區
      const objKeyArray = Object.keys(vm.onParamEditObject);
      objKeyArray.forEach((item) => {
        vm.onParamEditObject[item] = 0;
      });
      vm.onParamEditMode = false;
    },
    openDeleteModal(index) {
      const vm = this;
      vm.onDeleteIndex = index;
      //console.log("vm.onDeleteIndex", vm.onDeleteIndex);
    },
    closeDeleteModal() {
      const vm = this;
      //恢復為預設值
      vm.onDeleteIndex = 0;
      //console.log("vm.onDeleteIndex", vm.onDeleteIndex);
    },
    deleteRoi() {
      const vm = this;
      const index = vm.onDeleteIndex;

      //新加入的點位從陣列刪除
      //因 Vue 對資料響應的限制，須使用空物件替代
      if (vm.processingData.ROIConfigs[index].isNewAdd === true) {
        vm.processingData.ROIConfigs.splice(index, 1, {});
      }
      //既有的標記刪除欄位調整為 true
      else {
        vm.processingData.ROIConfigs[index].IsDelete = true;
      }

      //重畫一次canvas
      vm.initProcess();
      //console.log("vm.processingData.ROIConfigs", vm.processingData.ROIConfigs);
    },
    deleteStableStage() {
      const vm = this;
      for (const key in vm.onEditStableStage) {
        vm.onEditStableStage[key] = '';
      }
      //重畫一次canvas
      vm.initProcess();
    },
    deleteBackgroundStage() {
      const vm = this;
      for (const key in vm.onEditBackgroundStage) {
        vm.onEditBackgroundStage[key] = '';
      }
      //重畫一次canvas
      vm.initProcess();
    },
    async renderImage() {
      const vm = this;
      const url = vm.processingData.CameraPointImageUrl;
      // 重點在於 onload 要 resolved 才進入 drawImage()
      const image = await vm.loadImage(url);
      console.log('loadImage() success...');
      //console.log(image);
      vm.vueCanvas.drawImage(image, 0, 0);
    },
    loadImage(url) {
      const vm = this;
      return new Promise((resolve, reject) => {
        // 建立新的 Image 物件
        const imageObj = new Image();
        imageObj.onload = () => resolve(imageObj);
        imageObj.onerror = reject;
        imageObj.src = url;
        // 本機測試須加入跨域設定
        imageObj.crossOrigin = 'Anonymous';
      });
    },
    renderAllRoi() {
      const vm = this;
      // 畫出每個 ROI Config 的 Smoke
      if (vm.processingData.ROIConfigs.length > 0) {
        vm.processingData.ROIConfigs.forEach((item, index) => {
          // 如果註記刪除，則不畫出
          if (item.IsDelete) return;

          vm.renderRoi(item);
        });
        return 'renderAllRoi() Success...';
      } else {
        console.log('ROIConfigs not exist...');
      }
    },
    renderAllStableRoi() {
      const vm = this;
      if (vm.onEditStableStage.Stable_LL_Y) {
        vm.renderStableRoi(vm.onEditStableStage);
        return 'renderAllStableRoi() Success...';
      } else {
        console.log('onEditStableStage not exist...');
      }
    },
    renderAllBackgroundRoi() {
      const vm = this;
      if (vm.onEditBackgroundStage.BackgroundROI_Y4) {
        vm.renderBackgroundRoi(vm.onEditBackgroundStage);
        return 'renderAllBackgroundRoi() Success...';
      } else {
        console.log('onEditBackgroundStage not exist...');
      }
    },
    async initProcess() {
      const vm = this;
      vm.clearCanvas();
      await vm.renderImage();

      let renderAllRoiSuccess = vm.renderAllRoi();
      // console.log(renderAllRoiSuccess);

      let renderAllStableRoiSuccess = vm.renderAllStableRoi();
      // console.log(renderAllStableRoiSuccess);

      let renderAllBackgroundRoiSuccess = vm.renderAllBackgroundRoi();
    },
    deleteROIConfigs(index) {
      const vm = this;
      // 先刪再畫
      vm.processingData.ROIConfigs.splice(index, 1);
      vm.initProcess();
    },
    deleteEditResult() {
      const vm = this;
      vm.switchMode();
      vm.onEdit = {};
      vm.clickCount = 0;
      vm.initProcess();
    },
    deleteStableEditResult() {
      const vm = this;
      vm.switchStableMode();
      vm.onEditStableDisplay = {};
      vm.clickCount = 0;
      vm.initProcess();
    },
    deleteBackgroundEditResult() {
      const vm = this;
      vm.switchBackgroundMode();
      vm.onEditBackgroundDisplay = {};
      vm.clickCount = 0;
      vm.initProcess();
    },
    exportImage() {
      const vm = this;
      vm.$refs.canvas.toBlob((blob) => {
        // 建立一個 <a></a>
        const a = document.createElement('a');
        document.body.append(a);
        a.download = `${vm.processingData.CameraName}_${vm.processingData.CameraPointNo}.png`;
        a.href = URL.createObjectURL(blob);
        a.click();
        a.remove();
      });
    },
  },
  computed: {
    hint() {
      const vm = this;
      let displayedMessage = '點擊新增/編輯ROI鈕後，請在圖面點擊4次，由左上 > 右上 > 右下 > 左下，點出四邊形的四個角';

      if (vm.editMode && !vm.onEdit.Smoke_TL_X) {
        displayedMessage = '請在圖面點選 ROI "左上"點位';
      } else if (vm.editMode && !vm.onEdit.Smoke_TR_X) {
        displayedMessage = '請在圖面點選 ROI "右上"點位';
      } else if (vm.editMode && !vm.onEdit.Smoke_LR_X) {
        displayedMessage = '請在圖面點選 ROI "右下"點位';
      } else if (vm.editMode && !vm.onEdit.Smoke_LL_X) {
        displayedMessage = '請在圖面點選 ROI "左下"點位';
      } else if (vm.editMode && vm.onEdit.Smoke_LL_X) {
        displayedMessage = '請檢查是否已填入ROI編號，按下確認完成編輯';
      }
      return displayedMessage;
    },
  },
  // 調動畫布大小要重畫一次
  watch: {
    canvasHeight: function () {
      const canvas = this.$refs.canvas.getContext('2d');
      this.vueCanvas = canvas;
      this.initProcess();
    },
    canvasWidth: function () {
      const canvas = this.$refs.canvas.getContext('2d');
      this.vueCanvas = canvas;
      this.initProcess();
    },
  },
  mounted() {
    // vueCanvas 是存入 2D 畫布的 context 資訊
    // this.$refs.canvas 才是 canvas 的 dom 本體
    const canvas = this.$refs.canvas.getContext('2d');
    this.vueCanvas = canvas;

    // 與實體 DOM 連結，抓取 hidden input
    const inputHiddenValue = this.$refs.processingData.value;

    console.log('inputHiddenValue', JSON.parse(inputHiddenValue));
    this.processingData = JSON.parse(inputHiddenValue);

    //console.log('processingData', this.processingData);
    //console.log(typeof this.processingData);

    //console.log(this.processingData.ROIConfigs)
    // 如果載入時已經有 StableROI 則帶入第一筆到 onEditStableStage
    if (this.processingData.ROIConfigs[0].Stable_LL_Y) {
      for (const key in this.onEditStableStage) {
        this.onEditStableStage[key] = this.processingData.ROIConfigs[0][key];
        //debugger;
      }
    }
    // 如果載入時已經有 BackgroundROI 則帶入第一筆到 onEditBackgroundStage
    if (this.processingData.ROIConfigs[0].BackgroundROI_Y4) {
      for (const key in this.onEditBackgroundStage) {
        this.onEditBackgroundStage[key] = this.processingData.ROIConfigs[0][key];
        //debugger;
      }
    }

    // 如果已經有 iWdith, iHeight 則帶到 canvasWidth, canvasHeight
    if (this.processingData.ROIConfigs[0].iWidth && this.processingData.ROIConfigs[0].iHeight) {
      this.canvasWidth = this.processingData.ROIConfigs[0].iWidth;
      this.canvasHeight = this.processingData.ROIConfigs[0].iHeight;
    }

    // 畫框和畫震動框的程序
    this.initProcess();
  },
  created() {},
});

// mount
vm.mount('#app');
