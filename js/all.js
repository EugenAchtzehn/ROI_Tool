const vm = Vue.createApp({
  data() {
    return {
      XCoord: 0,
      YCoord: 0,
      clickCount: 0,
      // 由 hidden input 載入的 JSON 資料
      processingData: {
        CameraId: 1,
        CameraName: '振興發',
        CameraNo: 'Cam_1',
        CameraPointId: 3,
        CameraPointImageUrl:
          'https://github.com/EugenAchtzehn/canvasToPNG/blob/main/images/SamplePicture1.jpg',
        CameraPointNo: 1,
        ROIConfig: [
          {
            ALGFrame: 10,
            ALG_Type: 16,
            CameraID: 'Cam_1',
            CameraPointNo: 3,
            ContrastTH: 30,
            DetectionTH: 50,
            MaxBrightness: 225,
            MinBrightness: 80,
            Mode: 3,
            ROI: 1,
            ROIText: 'ROI1：華映',
            RPC: 0,
            Response: 15,
            SerId: 1,
            SmokeTH: 35,
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
          },
          {
            ALGFrame: 10,
            ALG_Type: 16,
            CameraID: 'Cam_1',
            CameraPointNo: 3,
            ContrastTH: 30,
            DetectionTH: 50,
            MaxBrightness: 225,
            MinBrightness: 80,
            Mode: 3,
            ROI: 2,
            ROIText: 'ROI2：華映2',
            RPC: 0,
            Response: 15,
            SerId: 2,
            SmokeTH: 35,
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
          },
        ],
      },
      // 編輯狀態，預設為 false
      editMode: false,
      pathCoords: [],
      // 畫框可切換為 true
      recordMode: false,
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
      // imageUrl: '../images/ExampleImage.png',
      selectedPoint: 'default',
      vueCanvas: null,
      // counter: 0,
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
      stableRoi: {
        // Stable_LL_X: 155,
        // Stable_LL_Y: 415,
        // Stable_LR_X: 335,
        // Stable_LR_Y: 415,
        // Stable_TL_X: 155,
        // Stable_TL_Y: 350,
        // Stable_TR_X: 335,
        // Stable_TR_Y: 350,
      },
      otherParams: {
        ALGFrame: 10,
        ALG_Type: 16,
        // CameraID: 'Cam_1',
        // CameraPointNo: 3,
        ContrastTH: 30,
        DetectionTH: 50,
        MaxBrightness: 225,
        MinBrightness: 80,
        Mode: 3,
        // ROI: 2,
        // ROIText: 'ROI2：華映2',
        RPC: 0,
        Response: 15,
        // SerId: 2,
        SmokeTH: 35,
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
    recordCoords(event) {
      const vm = this;
      // 若非 recordMode 則不執行此函數
      if (!vm.recordMode) return;

      // 限制繪製的點位數量
      if (vm.pathCoords.length >= 4) {
        window.alert('繪製點位不可超出 4 組！');
        return;
      }

      let x = vm.XCoord;
      let y = vm.YCoord;
      vm.pathCoords.push({ x, y });
      // 畫出第四組點位時，自動閉合成框，並關閉編輯模式
      if (vm.pathCoords.length === 4) {
        vm.drawPath();
        vm.switchMode();
      }
      vm.drawConnection();
    },
    editRoiPoints() {
      const vm = this;
      vm.clickCount += 1;
      // 若非 editMode 則不執行此函數
      if (!vm.editMode) return;
      let x = vm.XCoord;
      let y = vm.YCoord;
      switch (vm.clickCount) {
        case 1:
          vm.onEdit.Smoke_TL_X = x;
          vm.onEdit.Smoke_TL_Y = y;
          vm.drawStartPoint(vm.onEdit.Smoke_TL_X, vm.onEdit.Smoke_TL_Y);
          break;
        case 2:
          vm.onEdit.Smoke_TR_X = x;
          vm.onEdit.Smoke_TR_Y = y;
          vm.drawConnection(
            vm.onEdit.Smoke_TL_X,
            vm.onEdit.Smoke_TL_Y,
            vm.onEdit.Smoke_TR_X,
            vm.onEdit.Smoke_TR_Y
          );
          break;
        case 3:
          vm.onEdit.Smoke_LR_X = x;
          vm.onEdit.Smoke_LR_Y = y;
          vm.drawConnection(
            vm.onEdit.Smoke_TR_X,
            vm.onEdit.Smoke_TR_Y,
            vm.onEdit.Smoke_LR_X,
            vm.onEdit.Smoke_LR_Y
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
            vm.onEdit.Smoke_LL_Y
          );
          vm.drawConnection(
            vm.onEdit.Smoke_LL_X,
            vm.onEdit.Smoke_LL_Y,
            vm.onEdit.Smoke_TL_X,
            vm.onEdit.Smoke_TL_Y
          );
          // vm.switchMode();
          break;
        default:
          console.log('clickCount not expectable...');
          break;
      }
    },
    // 切換編輯狀態
    switchMode() {
      const vm = this;
      vm.editMode = !vm.editMode;
    },
    drawStartPoint(x, y) {
      const vm = this;
      vm.vueCanvas.fillRect(x, y, 3, 3);
    },
    // 畫出兩點間的連線
    drawConnection(prevX, prevY, nextX, nextY) {
      const vm = this;
      vm.vueCanvas.strokeStyle = 'red';
      vm.vueCanvas.lineWidth = 3;
      vm.vueCanvas.beginPath();
      vm.vueCanvas.moveTo(prevX, prevY);
      vm.vueCanvas.lineTo(nextX, nextY);
      vm.vueCanvas.closePath();
      vm.vueCanvas.stroke();
    },
    drawPath() {
      const vm = this;
      if (vm.onEdit.Smoke_LL_Y) {
        vm.vueCanvas.beginPath();
        // vm.vueCanvas.moveTo(vm.onEdit.Smoke_TL_X, vm.onEdit.Smoke_TL_Y);
        switch (vm.clickCount) {
          case 1:
            vm.vueCanvas.moveTo(vm.onEdit.Smoke_TL_X, vm.onEdit.Smoke_TL_Y);
            // vm.vueCanvas.lineTo(vm.pathCoords[i].x, vm.pathCoords[i].y);
            break;
          case 2:
            vm.vueCanvas.lineTo(vm.onEdit.Smoke_TR_X, vm.onEdit.Smoke_TR_Y);
            break;
          case 3:
            vm.vueCanvas.lineTo(vm.onEdit.Smoke_LR_X, vm.onEdit.Smoke_LR_Y);
            break;
          case 4:
            vm.vueCanvas.lineTo(vm.onEdit.Smoke_LL_X, vm.onEdit.Smoke_LL_Y);
            break;
          default:
            break;
        }
        vm.vueCanvas.closePath();
        vm.vueCanvas.strokeStyle = 'green';
        vm.vueCanvas.lineWidth = 3;
        vm.vueCanvas.stroke();
      } else {
        console.log('drawPath() error...');
      }
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
      vm.vueCanvas.fillText(
        roiConfigItem.ROI,
        roiConfigItem.Smoke_LL_X,
        roiConfigItem.Smoke_LL_Y + 16
      );
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
      // 至少已經設定一組 ROI 才能送出
      if (vm.processingData.ROIConfig.length) {
        // if (vm.checkIsFourPoints())
        // 排好四點在 pathCoords 中的順序，TL > TR > LR > LL
        // const orderedPathCoords = vm.reorderPathCoords(vm.pathCoords);
        const postJson = vm.processingData;
        axios
          .post('http://localhost:5050/data.ashx', postJson)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
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
      if (!vm.onEdit.ROI) {
        window.alert('請選擇 ROI 編號！');
        return;
      }

      // 擴增參數
      vm.onEdit = { ...vm.onEdit, ...vm.otherParams };

      // 設定相同的 ROI 會蓋過去，不同的就增加到陣列中
      const roiNoArray = vm.processingData.ROIConfig.map((item, index) => {
        return item.ROI;
      });
      console.log('roiNoArray', roiNoArray);
      console.log('onEdit.ROI', vm.onEdit.ROI);
      console.log('roiNoArray.include()', roiNoArray.includes(vm.onEdit.ROI));
      if (roiNoArray.includes(vm.onEdit.ROI)) {
        let replaceIndex = roiNoArray.indexOf(vm.onEdit.ROI);
        // 沒找到 indexOf 回傳 -1
        if (replaceIndex !== -1) {
          vm.processingData.ROIConfig.splice(replaceIndex, 1, vm.onEdit);
        }
      } else {
        vm.processingData.ROIConfig.push(vm.onEdit);
      }

      vm.onEdit = {};
      vm.clickCount = 0;
      vm.switchMode();
      vm.initProcess();
    },
    addNewRoi() {
      const vm = this;
      // 若已在編輯模式，不准再新增
      if (vm.editMode) {
        window.alert('請先結束編輯模式再新增！');
        return;
      }
      vm.editMode = true;
    },
    addStableRoi() {},
    renderImage() {
      const vm = this;
      // 建立新的 Image 物件
      let imageObj = new Image();
      imageObj.src = 'https://eugenachtzehn.github.io/canvasToPNG/images/SamplePicture1.jpg';
      // 本機測試須加入跨域設定
      imageObj.crossOrigin = 'Anonymous';
      return new Promise((resolve, reject) => {
        imageObj.onload = resolve;
        imageObj.onerror = reject;
        console.log('image loaded...');
        vm.vueCanvas.drawImage(imageObj, 0, 0);
      });
    },
    async renderAllRoi() {
      const vm = this;
      // 畫出每個 ROI Config 的 Smoke
      if (vm.processingData.ROIConfig.length > 0) {
        vm.processingData.ROIConfig.forEach((item, index) => {
          vm.renderRoi(item);
        });
        return 'renderAllRoi() Success...';
      } else {
        console.log('ROIConfig not exist...');
      }
    },
    async renderAllStableRoi() {
      const vm = this;
      // 目前只抓第一個 ROI Config 的 Stable
      if (vm.processingData.ROIConfig[0]) {
        vm.renderStableRoi(vm.processingData.ROIConfig[0]);
        return 'renderAllStableRoi() Success...';
      } else {
        console.log('ROIConfig[0] not exist...');
      }
    },
    async initProcess() {
      const vm = this;
      vm.clearCanvas();
      let renderImageSuccess = await vm.renderImage();
      console.log('renderImage() Success...', renderImageSuccess);
      let renderAllRoiSuccess = await vm.renderAllRoi();
      console.log(renderAllRoiSuccess);
      let renderAllStableRoiSuccess = await vm.renderAllStableRoi();
      console.log(renderAllStableRoiSuccess);
    },
    deleteRoiConfig(index) {
      const vm = this;
      // 先刪再畫
      vm.processingData.ROIConfig.splice(index, 1);
      vm.initProcess();
    },
    deleteEditResult() {
      const vm = this;
      vm.switchMode();
      vm.onEdit = {};
      vm.clickCount = 0;
      vm.initProcess();
    },
  },
  // 資料監聽
  watch: {
    'pathCoords.length': function () {
      const vm = this;
      console.log('Watching pathCoords length...', vm.pathCoords.length);
      switch (vm.pathCoords.length) {
        case 1:
          vm.onEdit.TL_X = vm.pathCoords[0].x;
          vm.onEdit.TL_Y = vm.pathCoords[0].y;
          break;
        case 2:
          vm.onEdit.TR_X = vm.pathCoords[1].x;
          vm.onEdit.TR_Y = vm.pathCoords[1].y;
          break;
        case 3:
          vm.onEdit.LR_X = vm.pathCoords[2].x;
          vm.onEdit.LR_Y = vm.pathCoords[2].y;
          break;
        case 4:
          vm.onEdit.LL_X = vm.pathCoords[3].x;
          vm.onEdit.LL_Y = vm.pathCoords[3].y;
          break;
        default:
          console.log('pathCoords.length not expectable');
          break;
      }
    },
  },
  computed: {
    hint() {
      const vm = this;
      let displayedMessage = '';
      switch (vm.pathCoords.length) {
        case 1:
          displayedMessage = '請在圖面點選ROI右上角點位';
          break;
        case 2:
          displayedMessage = '請在圖面點選ROI右下角點位';
          break;
        case 3:
          displayedMessage = '請在圖面點選ROI左下角點位';
          break;
        case 4:
          displayedMessage = '完成！';
          break;
        default:
          displayedMessage = '請點選黃色畫框按鈕，並在圖面點選ROI左上角點位';
          break;
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
  },
  created() {},
});

// mount
vm.mount('#app');
