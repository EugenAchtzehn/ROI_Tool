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
        CameraName: 'Seaside Industrial Park',
        CameraPointId: 3,
        CameraPointNo: 1,
        CameraPointImageUrl: 'https://eugenachtzehn.github.io/canvasToPNG/images/SamplePicture1.jpg',
        ROIConfigs: [
          // {},
          {
            ROIId: 105,
            CameraId: 1,
            CameraNo: 'Cam_1',
            CameraPointId: 3,
            CameraPointNo: 1,
            ALGFrame: 10,
            ALG_Type: 16,
            ContrastTH: 30,
            DetectionTH: 50,
            MaxBrightness: 225,
            MinBrightness: 80,
            Mode: 3,
            RPC: 0,
            Response: 15,
            SmokeTH: 35,
            ROI: 1,
            Smoke_LL_X: 161,
            Smoke_LL_Y: 254,
            Smoke_LR_X: 343,
            Smoke_LR_Y: 254,
            Smoke_TL_X: 161,
            Smoke_TL_Y: 202,
            Smoke_TR_X: 343,
            Smoke_TR_Y: 195,
            StableTH: 3,
            Stable_LL_X: 155,
            Stable_LL_Y: 415,
            Stable_LR_X: 335,
            Stable_LR_Y: 415,
            Stable_TL_X: 155,
            Stable_TL_Y: 350,
            Stable_TR_X: 335,
            Stable_TR_Y: 350,
            TextureTH: 30,
            alertPointnum: 4,
            iHeight: 480,
            iWidth: 704,
            ROIText: 'ROI1：華映',
            GroupName: '',
            isDelete: false,
          },
          {
            ROIId: 99,
            CameraId: 1,
            CameraNo: 'Cam_1',
            CameraPointId: 3,
            CameraPointNo: 1,
            ALGFrame: 10,
            ALG_Type: 16,
            ContrastTH: 30,
            DetectionTH: 50,
            MaxBrightness: 225,
            MinBrightness: 80,
            Mode: 3,
            RPC: 0,
            Response: 15,
            SmokeTH: 35,
            ROI: 2,
            Smoke_LL_X: 10,
            Smoke_LL_Y: 50,
            Smoke_LR_X: 100,
            Smoke_LR_Y: 50,
            Smoke_TL_X: 10,
            Smoke_TL_Y: 10,
            Smoke_TR_X: 100,
            Smoke_TR_Y: 10,
            StableTH: 3,
            Stable_LL_X: 155,
            Stable_LL_Y: 415,
            Stable_LR_X: 335,
            Stable_LR_Y: 415,
            Stable_TL_X: 155,
            Stable_TL_Y: 350,
            Stable_TR_X: 335,
            Stable_TR_Y: 350,
            TextureTH: 30,
            alertPointnum: 4,
            iHeight: 480,
            iWidth: 704,
            ROIText: 'ROI2：華映2',
            GroupName: '',
            isDelete: false,
          },
        ],
      },
      // 編輯狀態，預設為 false
      editMode: false,
      // 震動框編輯狀態，預設為 false
      editStableMode: false,
      pathCoords: [],
      // 畫框可切換為 true
      // recordMode: false,
      // 先寫死，待研究怎麼取檔比較好
      // imageList: [
      //   { imagePoint: '照片範例1', imageFileName: 'SamplePicture1' },
      //   { imagePoint: '照片範例2', imageFileName: 'SamplePicture2' },
      //   { imagePoint: '照片範例3', imageFileName: 'SamplePicture3' },
      //   { imagePoint: '照片範例4_夜間', imageFileName: 'SamplePicture4_Night' },
      // ],
      // 合框程式用的字體大小
      // fontSize: 16,
      // toTopPixel: 10,
      // toLeftPixel: 10,
      // rectWidthPixel: 100,
      // rectHeightPixel: 50,
      // textContentVal: 'ROI',
      // leftShiftPixel: 0,
      // bottomShiftPixel: 0,
      // selectedOutlineColor: 'white',
      // colors: ['white', 'black'],
      // selectedFontWeight: 700,
      // rotateDegree: 0,
      // fontOptions: [
      //   { weightName: 'Light', weightNum: 300 },
      //   { weightName: 'Regular', weightNum: 400 },
      //   { weightName: 'Bold', weightNum: 700 },
      //   { weightName: 'Black', weightNum: 900 },
      // ],
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
        ALGFrame: 10,
        ALG_Type: 16,
        ContrastTH: 30,
        DetectionTH: 50,
        MaxBrightness: 225,
        MinBrightness: 80,
        Mode: 3,
        RPC: 0,
        Response: 15,
        SmokeTH: 35,
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
        StableTH: 3,
        // Stable_LL_X: 155,
        // Stable_LL_Y: 415,
        // Stable_LR_X: 335,
        // Stable_LR_Y: 415,
        // Stable_TL_X: 155,
        // Stable_TL_Y: 350,
        // Stable_TR_X: 335,
        // Stable_TR_Y: 350,
        TextureTH: 30,
        alertPointnum: 4,
        iHeight: 480,
        iWidth: 704,
        ROIText: '',
        GroupName: '',
        isDelete: false,
      },
    };
  },
  methods: {
    getCoords(event) {
      const canvas = this.$refs.canvas;
      // console.log('moved!');

      // canvas 元素到網頁頂端的距離, 56
      // console.log('canvas.offsetTop', canvas.offsetTop);
      // canvas 元素的 borderTopWidth, 1
      // console.log('canvas.clientTop', canvas.clientTop);
      // canvas 元素到網頁左邊的距離, 214
      // console.log('canvas.offsetLeft', canvas.offsetLeft);
      // canvas 元素的 borderLeftWidth, 1
      // console.log('canvas.clientLeft', canvas.clientLeft);

      // 取得滑鼠移動事件
      // console.log('event', event);

      // 到目前瀏覽器顯示區域的頂端
      // console.log('event clientY: ', event.clientY);
      // 到頁面頂端
      // console.log('event pageY: ', event.pageY);
      // 到目前螢幕頂端(超出瀏覽器)
      // console.log('event screenY: ', event.screenY);

      const vm = this;
      vm.XCoord = event.pageX - canvas.offsetLeft;
      vm.YCoord = event.pageY - canvas.offsetTop;
    },
    // recordCoords(event) {
    //   const vm = this;
    //   // 若非 recordMode 則不執行此函數
    //   if (!vm.recordMode) return;

    //   // 限制繪製的點位數量
    //   if (vm.pathCoords.length >= 4) {
    //     window.alert('繪製點位不可超出 4 組！');
    //     return;
    //   }

    //   let x = vm.XCoord;
    //   let y = vm.YCoord;
    //   vm.pathCoords.push({ x, y });
    //   // 畫出第四組點位時，自動閉合成框，並關閉編輯模式
    //   if (vm.pathCoords.length === 4) {
    //     vm.drawPath();
    //     vm.switchMode();
    //   }
    //   vm.drawConnection();
    // },
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
    // drawPath() {
    //   const vm = this;
    //   if (vm.onEdit.Smoke_LL_Y) {
    //     vm.vueCanvas.beginPath();
    //     // vm.vueCanvas.moveTo(vm.onEdit.Smoke_TL_X, vm.onEdit.Smoke_TL_Y);
    //     switch (vm.clickCount) {
    //       case 1:
    //         vm.vueCanvas.moveTo(vm.onEdit.Smoke_TL_X, vm.onEdit.Smoke_TL_Y);
    //         break;
    //       case 2:
    //         vm.vueCanvas.lineTo(vm.onEdit.Smoke_TR_X, vm.onEdit.Smoke_TR_Y);
    //         break;
    //       case 3:
    //         vm.vueCanvas.lineTo(vm.onEdit.Smoke_LR_X, vm.onEdit.Smoke_LR_Y);
    //         break;
    //       case 4:
    //         vm.vueCanvas.lineTo(vm.onEdit.Smoke_LL_X, vm.onEdit.Smoke_LL_Y);
    //         break;
    //       default:
    //         break;
    //     }
    //     vm.vueCanvas.closePath();
    //     vm.vueCanvas.strokeStyle = 'green';
    //     vm.vueCanvas.lineWidth = 3;
    //     vm.vueCanvas.stroke();
    //   } else {
    //     console.log('drawPath() error...');
    //   }
    // },
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
      if (vm.processingData.ROIConfigs[0]?.CameraId) {
        const postJson = vm.processingData;
        console.log(postJson);
        // 要設定 'Content-Type', 不然後端程式可能無法辨認內容
        axios
          .post('/Camera/CAM/CAM1030E00_Save', postJson, {
            headers: { 'Content-Type': 'application/json' },
          })
          .then((response) => {
            // console.log('response', response);

            window.alert(response.data.Message);

            // 跳轉回設定頁
            // if (response.data.Url) {
            //   location.href = response.data.Url;
            // }
          })
          .catch((error) => {
            console.log('error:', error);
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
      // console.log('roiNoArray', roiNoArray);
      // console.log('onEdit.ROI', vm.onEdit.ROI);
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
        // 加入 StableROI
        vm.processingData.ROIConfigs.push({ ...vm.onEdit, ...vm.onEditStable });
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
    async renderImage() {
      const vm = this;
      const url = 'https://eugenachtzehn.github.io/canvasToPNG/images/SamplePicture1.jpg';
      // const url =
      //   'https://images.unsplash.com/photo-1679597454493-d86b77bdf2fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';
      // 重點在於 onload 要 resolved 才進入 drawImage()
      const image = await vm.loadImage(url);
      console.log('loadImage() success...');
      // console.log(image);
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
  // 資料監聽
  watch: {
    // 'pathCoords.length': function () {
    //   const vm = this;
    //   console.log('Watching pathCoords length...', vm.pathCoords.length);
    //   switch (vm.pathCoords.length) {
    //     case 1:
    //       vm.onEdit.TL_X = vm.pathCoords[0].x;
    //       vm.onEdit.TL_Y = vm.pathCoords[0].y;
    //       break;
    //     case 2:
    //       vm.onEdit.TR_X = vm.pathCoords[1].x;
    //       vm.onEdit.TR_Y = vm.pathCoords[1].y;
    //       break;
    //     case 3:
    //       vm.onEdit.LR_X = vm.pathCoords[2].x;
    //       vm.onEdit.LR_Y = vm.pathCoords[2].y;
    //       break;
    //     case 4:
    //       vm.onEdit.LL_X = vm.pathCoords[3].x;
    //       vm.onEdit.LL_Y = vm.pathCoords[3].y;
    //       break;
    //     default:
    //       console.log('pathCoords.length not expectable');
    //       break;
    //   }
    // },
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
    // const inputHiddenValue = this.$refs.processingData.value;
    // this.processingData = JSON.parse(inputHiddenValue);

    // console.log('inputHiddenValue', JSON.parse(inputHiddenValue));

    this.initProcess();

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
