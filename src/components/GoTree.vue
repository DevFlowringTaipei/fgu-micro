<script>
    export default {
        data() {
            return {
                nodeDataArray: [
                    { key: 0, age: 30, title: "Ban Ki-moon 반기문", name: "Secretary-General", headOf: "Secretariat" },

                    { 
                    key: 1, 
                    boss: 0, 
                    age: 30, 
                    group: 
                    [
                        {name: "連xx", age: 55}, {name: "何xx", age: 35}, {name: "王xx", age: 45}
                    ],
                    group2:
                    [
                        {name: "宋xx" , age: 10}, {name: "宋xx", age: 10}, {name: "宋xx" , age: 10}
                    ], 
                    title: "八德本部女子部長", 
                    name: "王曉明", 
                    headOf: "副本部長", 
                    headOf2: "總合長",
                    },

                    // {
                    // key: 1, 
                    // boss: 0,
                    // age: 30,
                    // gallery: [
                    //     {
                    //     role:"總合長", 
                    //     group:[{name: "連xx", age: 55}, {name: "何xx", age: 35}, {name: "王xx", age: 45}]
                    //     },
                    //     {
                    //     role:"副本部長", 
                    //     group:[{name: "宋xx", age: 55}, {name: "金xx", age: 35}, {name: "王xx", age: 45}]
                    //     }
                    // ], 
                    // title: "八德本部",
                    // role: "女子部長",
                    // name: "王曉明",
                    // },

                    { key: 2, boss: 0, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "aaa" },
                    { key: 3, boss: 0, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "bbb" },
                    { key: 4, boss: 1, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Maria R. Vicien - Milburn", name: "General Legal Division Director", headOf: "General Legal Division" },
                    { key: 5, boss: 1, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Peter Taksøe-Jensen", name: "Assistant Secretary-General for Legal Affairs" },
                    { key: 6, boss: 2, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Pn", name: "Assistant Secretary-General for Legal Affairs" },
                    { key: 7, boss: 2, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Yni", name: "Assistant Secretary-General for Legal Affairs" },
                    { key: 8, boss: 3, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees" },
                    { key: 9, boss: 3, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees2" },
                    { key: 10, boss: 4, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees" },
                    { key: 11, boss: 4, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees" },
                    { key: 12, boss: 4, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees" },
                    { key: 13, boss: 4, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees" },
                    { key: 14, boss: 5, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees" },
                    { key: 15, boss: 5, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees" },
                    { key: 16, boss: 5, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees" },
                    { key: 17, boss: 5, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees" },
                    { key: 18, boss: 6, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees" },
                    { key: 19, boss: 6, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees" },
                    { key: 20, boss: 6, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees" },
                    { key: 21, boss: 6, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees" },

                    { key: 22, boss: 7, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees" },
                    { key: 23, boss: 7, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees" },
                    { key: 24, boss: 8, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees" },
                    { key: 25, boss: 8, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees" },

                    { key: 26, boss: 9, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees" },
                    { key: 27, boss: 9, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees" },
                    { key: 28, boss: 9, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees" },
                    { key: 29, boss: 9, age: 30, group: [{name: "連xx"}, {name: "何xx"}], title: "Other Employees" },
                    {   
                        category: "simple",
                        infoTitle_1: "人數統計 (兼任)",
                        infoTitle_2: "幹部之年齡分布 (min,Q1,mean,Q3,max)",
                        infoTitle_3: "列印日期",
                        printDate: "2021.09.30",
                        peopleArr:[              
                            {depart:"區級",number:5,pTime:1, min:27,Q1:28,mean:29,Q3:29,max:35},
                            {depart:"本部級",number:18,pTime:2, min:23,Q1:27,mean:30,Q3:34,max:39},
                            {depart:"支部級",number:22,pTime:5, min:22,Q1:25,mean:27,Q3:31,max:35},
                            {depart:"地區級",number:63,pTime:16, min:18,Q1:21,mean:24,Q3:28,max:43}
                        ]
                    },
                ],
                peopleCount: [
                    {depart:"區級",number:5,pTime:1,},
                    {depart:"本部級",number:18,pTime:2},
                    {depart:"支部級",number:22,pTime:5},
                    {depart:"地區級",number:63,pTime:16}
                ],
                ageSpread: [
                    {min:27,Q1:28,mean:29,Q3:29,max:35},
                    {min:23,Q1:27,mean:30,Q3:34,max:39},
                    {min:22,Q1:25,mean:27,Q3:31,max:35},
                    {min:18,Q1:21,mean:24,Q3:28,max:43},
                ]
            }
        },
        computed: {
            get_peopleCount_sum() {
                let newNumberArr =  this.peopleCount.map((item)=> item.number);
                let sum = newNumberArr.reduce((accu, current) => accu + current);
                return sum;
            }
        },
        methods: {
            initGo: function() {
                const $ = go.GraphObject.make;
                var mt8 = new go.Margin(8, 0, 0, 0);
                var ml8 = new go.Margin(0, 0, 0, 8);
                var my8 = new go.Margin(8, 0, 8, 0);
                var mb8 = new go.Margin(0, 0, 8, 0);
                var roundedRectangleParams = {
                    parameter1: 2,  // set the rounded corner
                    spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight  // 使內容一直到圓角的內邊緣
                };
                var myDiagram = $(go.Diagram, "orgSelfTree", {
                    "undoManager.isEnabled": true,
                    layout: $(go.TreeLayout, {
                        angle: 90,
                        layerSpacing: 40,
                        nodeSpacing: 40,
                    })
                });

                var simpletemplate =
                $(go.Part, "Table", 
                    { position: new go.Point(0, 150), selectable: false }, //selectable 可控制點選及拖曳
                    $(go.TextBlock,
                        { row: 0, column: 0, font: "700 14px Droid Serif, sans-serif" },
                        new go.Binding("text", "infoTitle_1")),
                    $(go.Panel, "Table", { row: 1, column: 0, alignment: go.Spot.Left },
                        new go.Binding("itemArray", "peopleArr"),
                        {
                            itemTemplate:
                            $(go.Panel, "TableRow",
                                $(go.TextBlock,
                                    new go.Binding("text", "depart", function(ele) { return ele + ":"}),
                                    { column: 0, margin: 2 }
                                ),
                                $(go.TextBlock,
                                    new go.Binding("text", "number", function(ele) { return ele + "人"}),
                                    { column: 1, margin: 2 }
                                ),
                                $(go.TextBlock,
                                    new go.Binding("text", "pTime", function(ele) { return "+(" + ele + ")"}),
                                    { column: 2, margin: 2 }
                                ),
                            )
                        }
                    ),
                    $(go.TextBlock,
                        { row: 0, column: 1, font: "700 14px Droid Serif, sans-serif" },
                        new go.Binding("text", "infoTitle_2")),
                    $(go.Panel, "Table", { row: 1, column: 1, alignment: go.Spot.Left },
                        new go.Binding("itemArray", "peopleArr"),
                        {
                            itemTemplate:
                            $(go.Panel, "TableRow",
                                $(go.TextBlock,
                                    new go.Binding("text", "min", function(ele) { return "(" + ele + ","}),
                                    { column: 2, margin: 2 }
                                ),
                                $(go.TextBlock,
                                    new go.Binding("text", "Q1", function(ele) { return ele + ","}),
                                    { column: 3, margin: 2 }
                                ),
                                $(go.TextBlock,
                                    new go.Binding("text", "mean", function(ele) { return ele + ","}),
                                    { column: 4, margin: 2 }
                                ),
                                $(go.TextBlock,
                                    new go.Binding("text", "Q3", function(ele) { return ele + ","}),
                                    { column: 5, margin: 2 }
                                ),
                                $(go.TextBlock,
                                    new go.Binding("text", "max", function(ele) { return ele + ")"}),
                                    { column: 6, margin: 2 }
                                ),
                            )
                        }
                    ),
                    $(go.TextBlock,
                        { row: 2, column: 0, font: "700 14px Droid Serif, sans-serif", margin: mt8 },
                        new go.Binding("text", "infoTitle_3")),
                    $(go.TextBlock,
                        { row: 3, column: 0, font: "700 14px Droid Serif, sans-serif" },
                        new go.Binding("text", "printDate")),
                );

                var templmap = new go.Map();
                templmap.add("simple", simpletemplate);
                myDiagram.nodeTemplateMap = templmap;

                // myDiagram.add(
                //     $(go.Part, "Table", 
                //     { position: new go.Point(0, 150), selectable: false }, //selectable 可控制點選及拖曳

                //     $(go.TextBlock, "人數統計 (兼任)",
                //         { row: 0, column: 0, font: "700 14px Droid Serif, sans-serif" }),
                //     $(go.Panel, "Horizontal",
                //         { row: 1, column: 0, alignment: go.Spot.Left },
                //         $(go.TextBlock, "區級:",
                //         { font: "700 13px Droid Serif, sans-serif" }),
                //         $(go.TextBlock, "5人 +(1)",
                //         { font: "13px Droid Serif, sans-serif" })
                //     ), 
                //     $(go.Panel, "Horizontal",
                //         { row: 2, column: 0, alignment: go.Spot.Left },
                //         $(go.TextBlock, "本部級:",
                //         { font: "700 13px Droid Serif, sans-serif" }),
                //         $(go.TextBlock, "18人 +(2)",
                //         { font: "13px Droid Serif, sans-serif" })
                //     ),
                //     $(go.Panel, "Horizontal",
                //         { row: 3, column: 0, alignment: go.Spot.Left },
                //         $(go.TextBlock, "支部級:",
                //         { font: "700 13px Droid Serif, sans-serif" }),
                //         $(go.TextBlock, "22人 +(5)",
                //         { font: "13px Droid Serif, sans-serif" })
                //     ),
                //     $(go.Panel, "Horizontal",
                //         { row: 4, column: 0, alignment: go.Spot.Left },
                //         $(go.TextBlock, "地區級:",
                //         { font: "700 13px Droid Serif, sans-serif" }),
                //         $(go.TextBlock, "63人 +(16)",
                //         { font: "13px Droid Serif, sans-serif" })
                //     ),
                //     $(go.Panel, "Horizontal",
                //         { row: 5, column: 0, alignment: go.Spot.Left, margin: mb8 },
                //         $(go.TextBlock, "總計:",
                //         { font: "700 13px Droid Serif, sans-serif" }),
                //         $(go.TextBlock, "108人",
                //         { font: "13px Droid Serif, sans-serif" })
                //     ),
                //     $(go.Panel, "Horizontal",
                //         { row: 6, column: 0, alignment: go.Spot.Left,  },
                //         $(go.TextBlock, "列印日期:",
                //         { font: "700 13px Droid Serif, sans-serif" }),
                //         $(go.TextBlock, "2016.04.29",
                //         { font: "13px Droid Serif, sans-serif" })
                //     ),
                //     $(go.Panel, "Horizontal",
                //         { row: 0, column: 1, alignment: go.Spot.Left, margin: mb8 },
                //         $(go.TextBlock, "幹部年齡分布(min,Q1,mean,Q3,max)",
                //         { font: "700 14px Droid Serif, sans-serif" }),
                //     ),
                //     $(go.Panel, "Horizontal",
                //         { row: 1, column: 1, alignment: go.Spot.Left,  },
                //         $(go.TextBlock, "(27,28,29,29,35)",
                //         { font: "13px Droid Serif, sans-serif" }),
                //     ),
                //     $(go.Panel, "Horizontal",
                //         { row: 2, column: 1, alignment: go.Spot.Left,  },
                //         $(go.TextBlock, "(23,27,30,34,39)",
                //         { font: "13px Droid Serif, sans-serif" }),
                //     ),
                //     $(go.Panel, "Horizontal",
                //         { row: 3, column: 1, alignment: go.Spot.Left,  },
                //         $(go.TextBlock, "(22,25,27,31,35)",
                //         { font: "13px Droid Serif, sans-serif" }),
                //     ),
                //     $(go.Panel, "Horizontal",
                //         { row: 4, column: 1, alignment: go.Spot.Left,  },
                //         $(go.TextBlock, "(18,21,24,28,43)",
                //         { font: "13px Droid Serif, sans-serif" }),
                //     ),
                // ));

                //node節點樣板
                myDiagram.nodeTemplate = 
                $(go.Node, "Auto",
                    {
                        locationSpot: go.Spot.Top,
                        isShadowed: true, shadowBlur: 1,
                        shadowOffset: new go.Point(0, 1),
                        shadowColor: "rgba(0, 0, 0, .14)",
                        selectionAdornmentTemplate:
                        $(go.Adornment, "Auto",
                            $(go.Shape, "RoundedRectangle", roundedRectangleParams,
                            { fill: null, stroke: "#7986cb", strokeWidth: 1 }
                            ),
                            $(go.Placeholder)
                        )  // end Adornment
                    },
                    $(go.Shape, "RoundedRectangle", roundedRectangleParams,
                        { name: "SHAPE", fill: "#fff", strokeWidth: 0 },
                    ),
                    $(go.Panel, "Vertical",
                        $(go.Panel, "Horizontal",
                            { margin: 12 },
                            $(go.Panel, "Table",
                                $(go.TextBlock,
                                    {
                                        row: 0, alignment: go.Spot.Left,
                                        font: "1rem Roboto, sans-serif",
                                        stroke: "rgba(0, 0, 0, .87)",
                                        maxSize: new go.Size(160, NaN)
                                    },
                                    new go.Binding("text", "title")
                                ),
                                $(go.TextBlock, this.textStyle("name"),
                                    {
                                        margin: mt8,
                                        row: 1, alignment: go.Spot.Left,
                                        maxSize: new go.Size(160, NaN)
                                    },
                                    new go.Binding("text", "name")
                                ),
                                $("PanelExpanderButton", "INFO",
                                    { row: 0, column: 1, rowSpan: 2, margin: ml8 }
                                )
                            )
                        ),
                        $(go.Shape, "LineH",
                            {
                                stroke: "rgba(0, 0, 0, .60)", strokeWidth: 1,
                                height: 1, stretch: go.GraphObject.Horizontal
                            },
                            new go.Binding("visible").ofObject("INFO")  // only visible when info is expanded
                        ),
                        $(go.Panel, "Vertical",
                            {
                                name: "INFO",  // identify to the PanelExpanderButton
                                stretch: go.GraphObject.Horizontal,  // take up whole available width
                                margin: 8,
                                defaultAlignment: go.Spot.Left,  // thus no need to specify alignment on each element
                            },
                            $(go.TextBlock, this.textStyle("headOf"),
                                new go.Binding("text", "headOf", function(head) { 
                                    return head + ':'; 
                                })
                            ),
                            $(go.Panel, "Table",
                                new go.Binding("itemArray", "group"),
                                {
                                    itemTemplate:
                                    $(go.Panel, "TableRow",
                                        $(go.TextBlock,
                                            new go.Binding("text", "name"),
                                            { column: 0, margin: 2 }
                                        ),
                                        $(go.TextBlock,
                                            new go.Binding("text", "age"),
                                            { column: 1, margin: 2 }
                                        ),
                                    )
                                }
                            ),
                            $(go.Shape, "LineH",
                                {
                                    stroke: "rgba(0, 0, 0, .60)", strokeWidth: 1, 
                                    strokeDashArray:[1, 1],
                                    height: 1,
                                },
                                { margin: my8 },
                                new go.Binding("visible").ofObject("INFO")
                            ),
                            $(go.TextBlock, this.textStyle("headOf2"),
                                new go.Binding("text", "headOf2", function(head) { 
                                    return head + ':'; 
                                })
                            ),
                            $(go.Panel, "Table",
                                new go.Binding("itemArray", "group2"),
                                {
                                    itemTemplate:
                                    $(go.Panel, "TableRow",
                                        $(go.TextBlock,
                                            new go.Binding("text", "name"),
                                            { column: 0, margin: 2 }
                                        ),
                                        $(go.TextBlock,
                                            new go.Binding("text", "age"),
                                            { column: 1, margin: 2 }
                                        ),
                                    )
                                }
                            ),
                            //new 資料流
                            // $(go.Panel, "Table",
                            //     new go.Binding("itemArray", 'group'),
                            //     {
                            //         itemTemplate:
                            //         $(go.Panel, "TableRow",
                            //             $(go.TextBlock,
                            //                 new go.Binding("text", "name"),
                            //                 { column: 0, margin: 2 }
                            //             ),
                            //             $(go.TextBlock,
                            //                 new go.Binding("text", "age"),
                            //                 { column: 1, margin: 2 }
                            //             ),
                            //         )
                            //     }
                            // ),
                            // $(go.TextBlock, this.textStyle("boss"),
                            //     new go.Binding("margin", "headOf", function(head) { return mt8; }), // some space above if there is also a headOf value
                            //     new go.Binding("text", "boss", function(boss) {
                            //     var boss = myDiagram.model.findNodeDataForKey(boss);
                            //     if (boss !== null) {
                            //         return "Reporting to: " + boss.name;
                            //     }
                            //         return "";
                            //     })
                            // )
                        )
                    ),
                    $("TreeExpanderButton", {
                        alignment: go.Spot.Bottom,
                        alignmentFocus: go.Spot.Center
                    })
                );
                
                //連結設定
                myDiagram.linkTemplate =
                $(go.Link, 
                    go.Link.Orthogonal,
                    { corner: 5, selectable: false },
                    $(go.Shape, { strokeWidth: 3, stroke: "#424242" })
                );

                //資料流
                myDiagram.model =
                $(go.TreeModel,
                {
                    nodeParentKeyProperty: "boss",
                    nodeDataArray: this.nodeDataArray
                });

                //建立左上角追蹤視窗
                var myOverview =
                $(go.Overview, "myOverviewDiv",
                { observed: myDiagram, contentAlignment: go.Spot.Center }); 

                //組織圖縮小比例
                document.getElementById('zoomToFit').addEventListener('click', function() {
                    myDiagram.commandHandler.zoomToFit();
                });

                //階層組織樹收合
                myDiagram.addDiagramListener("InitialLayoutCompleted", function(e) {
                    e.diagram.findTreeRoots().each(function(r) { 
                        r.collapseTree(3); 
                    });
                });


            },
            textStyle: function(field) {    
                // console.log('22', field);
                return [
                    {
                        font: "bold 12px Roboto, sans-serif", stroke: "rgba(0, 0, 0, .60)",
                        visible: true  // only show textblocks when there is corresponding data for them
                    },
                    new go.Binding("visible", field, function(val) { 
                        // console.log('222', val , typeof(val));
                        return val !== undefined; 
                    })
                ];
            }
        },
        mounted: function() {
            this.initGo();

                // var gallery = null;
                // var groupArr = null;
                // this.nodeDataArray.forEach((item) => {
                //     gallery = item.gallery;
                // })
                // gallery.forEach((item) => {
                //     groupArr = item.group;
                // console.log('=>',groupArr);
                // })
        },
    }
</script>
<template>
    <div style="position: relative;">
        <div id="orgSelfTree"></div>
        <el-button type="primary" id="zoomToFit">縮小比例</el-button>
        <div id="myOverviewDiv"></div> 
        <!-- <div id="personCount" class="d-flex">
            <div>
                <div>人數統計 (兼任)</div>
                <ul>
                    <li v-for="(item,i) in peopleCount" :key="i">
                        {{ item.depart}} : {{ item.number }} 人 +( {{ item.pTime}} )
                    </li>
                    <li>總計：{{ get_peopleCount_sum }} 人</li>
                </ul>
                <div>列印日期</div>
                <p>2016.03.29</p>
            </div>
            <div class="ml-5">
                <div>幹部年齡分布(min,Q1,mean,Q3,max)</div>
                <ul>
                    <li v-for="(item ,i) in ageSpread" :key="i">
                        ( {{ item.min}}, {{ item.Q1 }}, {{ item.mean}}, {{ item.Q3}}, {{ item.max }} )
                    </li>
                </ul>
            </div>
        </div>  -->
    </div>
</template>
<style lang="scss" scoped>
    #orgSelfTree {
        box-sizing: border-box;
        width: 100%;
        height: 100vh;
        background-color: #f2f2f2; 
        border: solid 1px black;
    }

    #myOverviewDiv {
        position: absolute;
        width: 200px;
        height: 100px;
        top: 10px;
        left: 10px;
        background-color: #f2f2f2;
        z-index: 300;
        border: solid 1px #7986cb;
    }
    #personCount {
        position: absolute;
        top: 120px;
        left: 10px;
        background-color: #f2f2f2;
        font-size: 0.8rem;
        z-index: 300;
        border: solid 1px #7986cb;
        ul {
            padding-left: 0;
        }
        > div {
            padding: 0 0.5rem;
        }
    }
</style>