module.exports = {

    /***************               界面配置 begin           ***************/
    /**
     * @description 網站標題
     */
    title: '',
    /**
     * @description 是否顯示 tagsView
     */
    tagsView: false,
    /**
     * @description tagsView==true 頂部顯示，否則底部顯示
     */
    tagsViewTop: true,
    /**
     * @description 固定頭部
     */
    fixedHeader: false,
    /**
     * @description 頂部標題欄是否顯示陰影
     */
    elevatedHeader: false,
    /**
     * @description 左側菜單欄是否顯示陰影
     */
    elevatedSidebar: true,
    /**
     * @description 是否只保持一子菜單的展開
     */
    uniqueOpened: true,
    /**
     * @description 左側菜單欄是否顯示logo
     */
    sidebarLogo: true,
    /**
     * 左側菜單欄是否占滿頂部
     */
    sidebarTop: true,
    /**
     * 左側菜單欄默認寬度
     */
    sidebarWidth: 280,
    /**
     * 左側菜單欄默認mini狀態
     */
    sidebarMini: false,
    /**
     * 是否顯示葉面背景圖
     */
    pageBgImage: true,
    /***************               界面配置 end             ***************/
  
    /***************               特殊配置 begin           ***************/
    /*******
     * 間距參考： https://quasar.dev/style/spacing
     * 間距参考： https://quasar.dev/style/breakpoints
     * 顏色参考： https://quasar.dev/style/color-palette
     */
    /**
     * Page樣式:
     * 顏色：
     *  bg-teal  // 提示：颜色仅为用法示例，请在 default-color.js 中设置颜色，可以设置正常模式和dark模式（下同）
     * 邊距：
     *  q-pa-md
     *  q-ma-md
     */
    pageClass: '', // PC等大屏幕使用（下同）
    pageStyle: '',
    pageClassMobile: '', // 手機等小屏幕使用（下同）
    pageStyleMobile: '',
    /**
     * Table樣式
     * 背景顏色：
     *  bg-teal
     * 邊距：
     *  q-pa-md
     *  q-ma-md
     * 邊框：
     *  q-table--bordered
     * 無陰影：
     *  q-table--flat
     * 無圓角：
     *  q-table--square
     */
    tableClass: 'q-table--flat q-table--square q-pa-xs',
    tableStyle: '',
    tableClassMobile: 'q-table--flat q-table--square',
    tableStyleMobile: '',
    /**
     * ComCard樣式（com-tree全局樣式也在這裡設置）:
     * 設置邊框：
     *  q-pa-sm q-ma-sm
     * 設置背景色：
     *  bg-teal
     * 無陰影:
     *  q-table--flat
     * 無圓角：
     *  q-table--square
  
     * style: 設置背景色（含半透明）:
     *  background:#3d1d1d52
     */
    cardClass: 'q-table--flat q-table--square',
    cardStyle: '',
    cardClassMobile: 'q-table--flat q-table--square',
    cardStyleMobile: '',
    /**
     * Dialog樣式:
     * 使用 dialogClass 設置邊框：
     *  q-pa-sm
     * 使用 dialogClass 設置背景色：
     *  bg-teal
     * 使用 dialogStyle 設置背景色（含半透明）:
     *  background:#3d1d1d52
     */
    dialogClass: '',
    dialogStyle: '',
    dialogClassMobile: '',
    dialogStyleMobile: '',
    /***************               特殊配置 end             ***************/
  
    /***************               權限配置 begin           ***************/
    /**
     * @description 記住密碼狀態下的token在Cookie中保存的天數，默認1天
     */
    tokenCookieExpires: 1,
    /**
     * @description 記住密碼狀態下的密碼在Cookie中保存的天數，默認1天
     */
    passCookieExpires: 1,
    /**
     * @description token key
     */
    TokenKey: 'TOKEN',
    /**
     * @description 請求超時時間，毫秒（默認 2 min）
     */
    timeout: 1200000,
    /***************               權限配置 end             ***************/
  
    /**
     * 是否顯示設置的底部訊息
     */
    showFooter: true,
    /**
     * 是否進入dark模式
     */
    darkMode: false,
    /**
     * 設置輸入框、表格、按鈕等默認dense：
     *    支持 → undefined / true / false
     */
    denseMode: true,
    /**
     * 設置輸入框的外觀樣式：
     * 以下目前只挑幾個抽出模組
     * com-select/com-input/以下目前只挑幾個抽出模組com-field (已抽出)/com-select-date(已抽出)/com-tree-select design mode：
     *    支持 → default / standout / filled / outlined / borderless
     */
    inputDesignMode: 'outlined',
    /**
     * 設置輸入框的外觀是方形直角 或 圓形大圓弧：
     *    支持 → default / square / rounded
     */
    inputDesignCorner: 'default',
    /**
     * 設置輸入框的外觀樣式：
     * 以下目前接尚未抽出模組化
     * com-btn / com-btn-toggle / com-btn-dropdown design mode：
     *    支持 → default / flat / outline / push / unelevated
     */
    btnDesignMode: 'push',
    /**
     * 設置輸入框的外觀是方形直角 或 圓形大圓弧：
     *    支持 → default / square / rounded
     */
    btnDesignCorner: 'default',
    /**
     * 表格每頁默認顯示的行數
     */
    pageSize: 10,
    /**
     * 底部文字，支持html語法
     */
    footerTxt: '',
    /**
     * 案子號或公司號
     */
    caseNumber: ''
  }
  