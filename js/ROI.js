const vm = Vue.createApp({
  data() {
    return {
      XCoord: 0,
      YCoord: 0,
      clickCount: 0,
      // 由 hidden input 載入的 JSON 資料
      processingData: {
        CameraId: 1,
        CameraNo: 'Cam_1',
        CameraName: 'Seaside1',
        CameraPointId: 3,
        CameraPointNo: 1,
        CameraPointImageUrl: 'https://eugenachtzehn.github.io/canvasToPNG/images/SamplePicture1.jpg',
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
          //    isDelete: false,
          //},
        ],
      },
      // 編輯狀態，預設為 false
      editMode: false,
      // 震動框編輯狀態，預設為 false
      editStableMode: false,
      selectedPoint: 'default',
      vueCanvas: null,
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
      },
      onEditStable: {
        Stable_LL_X: '',
        Stable_LL_Y: '',
        Stable_LR_X: '',
        Stable_LR_Y: '',
        Stable_TL_X: '',
        Stable_TL_Y: '',
        Stable_TR_X: '',
        Stable_TR_Y: '',
      },
      otherParams: {
        // ROIId 新增為 0, 既有則讀取後帶入
        ROIId: 0,
        // 以下由外層傳入
        CameraId: '',
        CameraNo: '',
        CameraPointId: '',
        CameraPointNo: '',
        // --- 外層傳入結束
        ALG_Type: 16,

        // --- 20230421 參數設定介面
        //SmokeTH: 35,
        //DetectionTH: 50,
        //Response: 15,
        //MaxBrightness: 225,
        //MinBrightness: 80,
        //TextureTH: 30,
        //ContrastTH: 30,
        //StableTH: 3,
        //ALGFrame: 10,
        // ---
        Mode: 3,
        RPC: 0,
        // 以下參數由編輯介面設定
        // ROI: 1
        // Smoke_LL_X: 10,
        // Smoke_LL_Y: 50,
        // Smoke_LR_X: 100,
        // Smoke_LR_Y: 50,
        // Smoke_TL_X: 10,
        // Smoke_TL_Y: 10,
        // Smoke_TR_X: 100,
        // Smoke_TR_Y: 10,
        // Stable_LL_X: 155,
        // Stable_LL_Y: 415,
        // Stable_LR_X: 335,
        // Stable_LR_Y: 415,
        // Stable_TL_X: 155,
        // Stable_TL_Y: 350,
        // Stable_TR_X: 335,
        // Stable_TR_Y: 350,
        alertPointnum: 4,
        iHeight: 480,
        iWidth: 704,
        ROIText: '',
        GroupName: '',
        isDelete: false,
      },
      onParamEditIndex: 0,
      onParamEditMode: false,
      onParamEditObject: {
        SmokeTH: 0,
        DetectionTH: 0,
        Response: 0,
        MaxBrightness: 0,
        MinBrightness: 0,
        TextureTH: 0,
        ContrastTH: 0,
        StableTH: 0,
        ALGFrame: 0,
      },
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
          vm.onEditStable.Stable_TL_X = x;
          vm.onEditStable.Stable_TL_Y = y;
          vm.drawStartPoint(vm.onEditStable.Stable_TL_X, vm.onEditStable.Stable_TL_Y, 'blue');
          break;
        case 2:
          vm.onEditStable.Stable_TR_X = x;
          vm.onEditStable.Stable_TR_Y = y;
          vm.drawConnection(
            vm.onEditStable.Stable_TL_X,
            vm.onEditStable.Stable_TL_Y,
            vm.onEditStable.Stable_TR_X,
            vm.onEditStable.Stable_TR_Y,
            'blue'
          );
          break;
        case 3:
          vm.onEditStable.Stable_LR_X = x;
          vm.onEditStable.Stable_LR_Y = y;
          vm.drawConnection(
            vm.onEditStable.Stable_TR_X,
            vm.onEditStable.Stable_TR_Y,
            vm.onEditStable.Stable_LR_X,
            vm.onEditStable.Stable_LR_Y,
            'blue'
          );
          break;
        case 4:
          vm.onEditStable.Stable_LL_X = x;
          vm.onEditStable.Stable_LL_Y = y;
          vm.drawConnection(
            vm.onEditStable.Stable_LR_X,
            vm.onEditStable.Stable_LR_Y,
            vm.onEditStable.Stable_LL_X,
            vm.onEditStable.Stable_LL_Y,
            'blue'
          );
          vm.drawConnection(
            vm.onEditStable.Stable_LL_X,
            vm.onEditStable.Stable_LL_Y,
            vm.onEditStable.Stable_TL_X,
            vm.onEditStable.Stable_TL_Y,
            'blue'
          );
          break;
        default:
          console.log('clickCount not expectable...');
          break;
      }
    },
    // 切換編輯狀態
    switchMode(itemROI) {
      const vm = this;
      if (itemROI) {
        vm.onEdit.ROI = itemROI;
      }
      vm.editMode = !vm.editMode;
    },
    switchStableMode() {
      const vm = this;
      vm.editStableMode = !vm.editStableMode;
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
    postToDatabase() {
      const vm = this;

      // vm.processingData.ROIConfigs = vm.processingData.ROIConfigs.filter((item) => {
      //   if (Object.values(item).length) {
      //     return item;
      //   }
      // });

      if (!vm.processingData.ROIConfigs[0].Stable_LL_Y) {
        window.alert('震動ROI須設定才能送出！');
        return;
      }
      // console.log(vm.processingData.ROIConfigs[0].Stable_LL_Y);

      // 至少已經設定一組 ROI 才能送出，檢查第一組的 CameraId
      // 等操作完再拿掉 length 條件，目前 === 1
      if (vm.processingData.ROIConfigs.length || vm.processingData.ROIConfigs[0]?.CameraId) {
        console.log('送到資料庫前的 vm.processingData:', vm.processingData);
        const postJson = JSON.stringify(vm.processingData);
        console.log('postJson', postJson);
        //let axiosConfig = {
        //    method: 'post',
        //    url: '/Camera/CAM/CAM1030E00_Save',
        //    'Content-Type': 'application/json',
        //};

        axios
          .post('/data_save', postJson, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
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
      } else {
        window.alert('至少須設定一組ROI才能送出！');
        return;
      }
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

      // 檢查是否參數不足 9 組
      let checkEmptyArray = Object.values(vm.onEdit).filter((item) => {
        if (item) {
          return item;
        }
      });

      if (checkEmptyArray.length < 9) {
        window.alert('設定的參數不足！');
        return;
      }

      // if (!vm.onEdit.ROI) {
      //   window.alert('請選擇 ROI 編號！');
      //   return;
      // }

      // 擴增參數，由外層傳入
      // SerId === ROIId
      vm.otherParams.CameraId = vm.processingData.CameraId;
      vm.otherParams.CameraNo = vm.processingData.CameraNo;
      vm.otherParams.CameraPointId = vm.processingData.CameraPointId;
      vm.otherParams.CameraPointNo = vm.processingData.CameraPointNo;
      vm.onEdit = { ...vm.onEdit, ...vm.otherParams };

      // 設定相同的 ROI 會蓋過去，不同的就增加到陣列中
      const roiNoArray = vm.processingData.ROIConfigs.map((item, index) => {
        return item.ROI;
      });
      console.log('roiNoArray', roiNoArray);
      console.log('onEdit.ROI', vm.onEdit.ROI);

      console.log('roiNoArray.include(), 是否為既有ROI:', roiNoArray.includes(vm.onEdit.ROI));
      if (roiNoArray.includes(vm.onEdit.ROI)) {
        let replaceIndex = roiNoArray.indexOf(vm.onEdit.ROI);
        // 沒找到 indexOf 回傳 -1

        const existingParams = {
          ROIId: vm.processingData.ROIConfigs[replaceIndex].ROIId,
          Stable_TL_X: vm.processingData.ROIConfigs[replaceIndex].Stable_TL_X,
          Stable_TL_Y: vm.processingData.ROIConfigs[replaceIndex].Stable_TL_Y,
          Stable_TR_X: vm.processingData.ROIConfigs[replaceIndex].Stable_TR_X,
          Stable_TR_Y: vm.processingData.ROIConfigs[replaceIndex].Stable_TR_Y,
          Stable_LR_X: vm.processingData.ROIConfigs[replaceIndex].Stable_LR_X,
          Stable_LR_Y: vm.processingData.ROIConfigs[replaceIndex].Stable_LR_Y,
          Stable_LL_X: vm.processingData.ROIConfigs[replaceIndex].Stable_LL_X,
          Stable_LL_Y: vm.processingData.ROIConfigs[replaceIndex].Stable_LL_Y,
        };

        if (replaceIndex !== -1) {
          vm.processingData.ROIConfigs.splice(replaceIndex, 1, vm.onEdit);
          // 取代過後再存入
          vm.processingData.ROIConfigs[replaceIndex] = {
            ...vm.processingData.ROIConfigs[replaceIndex],
            ...existingParams,
          };
        }
      } else {
        // 檢查是否有設定九項辨識參數，沒有的話給預設值
        const defaultDetectParamObj = {
          SmokeTH: vm.onParamEditObject.SmokeTH || 30,
          DetectionTH: vm.onParamEditObject.DetectionTH || 50,
          Response: vm.onParamEditObject.Response || 10,
          MaxBrightness: vm.onParamEditObject.MaxBrightness || 225,
          MinBrightness: vm.onParamEditObject.MinBrightness || 80,
          TextureTH: vm.onParamEditObject.TextureTH || 30,
          ContrastTH: vm.onParamEditObject.ContrastTH || 30,
          StableTH: vm.onParamEditObject.StableTH || 5,
          ALGFrame: vm.onParamEditObject.ALGFrame || 10,
        };
        // 未設定過的新 ROI，加入 StableROI 設定值
        const brandNewROI = { ...vm.onEdit, ...vm.onEditStable, ...defaultDetectParamObj };
        vm.processingData.ROIConfigs.push(brandNewROI);
      }

      const noEmptyROIConfigsArray = vm.processingData.ROIConfigs.filter((item) => {
        // 非空物件
        if (Object.keys(item).length) {
          return { ...item, ...vm.onEditStable };
        }
      });

      // console.log(noEmptyROIConfigsArray);
      vm.processingData.ROIConfigs = noEmptyROIConfigsArray;

      vm.onEdit = {};
      vm.clickCount = 0;
      vm.switchMode();
      vm.initProcess();
    },
    storeStableEditResult() {
      const vm = this;

      // 檢查是否參數不足 8 組
      let checkEmptyArray = Object.values(vm.onEditStable).filter((item) => {
        if (item) {
          return item;
        }
      });

      if (checkEmptyArray.length < 8) {
        window.alert('設定的參數不足！');
        return;
      }

      // vm.processingData.ROIConfigs[0] = { ...vm.processingData.ROIConfigs[0], ...vm.onEditStable };
      const expandedROIConfigsArray = vm.processingData.ROIConfigs.map((item, index) => {
        return { ...item, ...vm.onEditStable };
      });

      vm.processingData.ROIConfigs = expandedROIConfigsArray;

      vm.onEditStable = {};
      vm.clickCount = 0;
      vm.switchStableMode();
      vm.initProcess();
    },
    addNewRoi() {
      const vm = this;
      // 若已在編輯模式，不准再新增
      if (vm.editMode) {
        window.alert('請先結束ROI編輯模式再新增！');
        return;
      }
      // 若已在震動編輯模式，不准切換
      if (vm.editStableMode) {
        window.alert('請先結束震動ROI編輯！');
        return;
      }
      vm.editMode = true;
    },
    switchStableMode() {
      const vm = this;
      // 若已在震動編輯模式，不准切換
      if (vm.editMode) {
        window.alert('請先結束ROI編輯模式！');
        return;
      }
      vm.editStableMode = !vm.editStableMode;
    },
    startEditParams(index) {
      const vm = this;
      vm.onParamEditIndex = index;
      vm.onParamEditMode = true;
      vm.onParamEditObject.SmokeTH = vm.processingData.ROIConfigs[index].SmokeTH;
      vm.onParamEditObject.DetectionTH = vm.processingData.ROIConfigs[index].DetectionTH;
      vm.onParamEditObject.Response = vm.processingData.ROIConfigs[index].Response;
      vm.onParamEditObject.MaxBrightness = vm.processingData.ROIConfigs[index].MaxBrightness;
      vm.onParamEditObject.MinBrightness = vm.processingData.ROIConfigs[index].MinBrightness;
      vm.onParamEditObject.TextureTH = vm.processingData.ROIConfigs[index].TextureTH;
      vm.onParamEditObject.ContrastTH = vm.processingData.ROIConfigs[index].ContrastTH;
      vm.onParamEditObject.StableTH = vm.processingData.ROIConfigs[index].StableTH;
      vm.onParamEditObject.ALGFrame = vm.processingData.ROIConfigs[index].ALGFrame;
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
          vm.renderRoi(item);
        });
        return 'renderAllRoi() Success...';
      } else {
        console.log('ROIConfigs not exist...');
      }
    },
    renderAllStableRoi() {
      const vm = this;
      // 目前只抓第一個 ROI Config 的 Stable
      if (vm.processingData.ROIConfigs[0]) {
        vm.renderStableRoi(vm.processingData.ROIConfigs[0]);
        return 'renderAllStableRoi() Success...';
      } else {
        console.log('ROIConfigs[0] not exist...');
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
      vm.onEditStable = {};
      vm.clickCount = 0;
      vm.initProcess();
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

    this.initProcess();

    //console.log(this.processingData.ROIConfigs)
    // 如果載入時已經有 StableROI 則帶入第一筆到 onEditStable
    if (this.processingData.ROIConfigs[0].Stable_LL_Y) {
      this.onEditStable.Stable_TL_X = this.processingData.ROIConfigs[0].Stable_TL_X;
      this.onEditStable.Stable_TL_Y = this.processingData.ROIConfigs[0].Stable_TL_Y;
      this.onEditStable.Stable_TR_X = this.processingData.ROIConfigs[0].Stable_TR_X;
      this.onEditStable.Stable_TR_Y = this.processingData.ROIConfigs[0].Stable_TR_Y;
      this.onEditStable.Stable_LR_X = this.processingData.ROIConfigs[0].Stable_LR_X;
      this.onEditStable.Stable_LR_Y = this.processingData.ROIConfigs[0].Stable_LR_Y;
      this.onEditStable.Stable_LL_X = this.processingData.ROIConfigs[0].Stable_LL_X;
      this.onEditStable.Stable_LL_Y = this.processingData.ROIConfigs[0].Stable_LL_Y;
    }
  },
  created() {},
});

// mount
vm.mount('#app');
