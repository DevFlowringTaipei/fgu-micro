const genderOptions= [
  {
    value: 1,
    label: "男",
  },
  {
    value: 2,
    label: "女",
  },

]
const statusOptions= [
  {
    value: 1,
    label: "啟用",
  },
  {
    value: 0,
    label: "禁用",
  },

]
const educationOptions= [
  { 
    value: 1,
    label: "國小",
  },
  {
    value: 2,
    label: "國中",
  },
  {
    value: 3,
    label: "高中/職",
  },
  {
    value: 4,
    label: "大學/大專",
  },
  {
    value: 5,
    label: "碩士",
  },
  {
    value: 6,
    label: "博士",
  },
]
const rowOptions = [
  { label: "20筆/頁", value: 20 },
  { label: "50筆/頁", value: 50 },
  { label: "100筆/頁", value: 100 },
  { label: "150筆/頁", value: 150 },
  { label: "200筆/頁", value: 200 },
];
const identityOptions =[
  {
    value: 1,
    label: "全部",
  },
  {
    value: 2,
    label: "一般用戶",
  },
  {
    value: 3,
    label: "廠商",
  },
]
const specialOptions=[
  { label: "行銷諮詢", value: 1 },
  { label: "組織管理", value: 2 },
  { label: "人才管理", value: 3 },
  { label: "資訊管理", value: 4 },
  { label: "通路管理", value: 5 },
  { label: "財務管理", value: 6 },
  { label: "品牌諮詢", value: 7 },
  { label: "其他", value: 7 },
]

const timeSelect = [
  {
    id:1,
    name:"周一",
    started_time:"10:00",
    ended_time:"12:00",
  },
  {
    id:2,
    name:"周一",
    started_time:"13:00",
    ended_time:"15:00",
  },
  {
    id:3,
    name:"周一",
    started_time:"15:00",
    ended_time:"17:00",
  },
  {
    id:4,
    name:"周二",
    started_time:"10:00",
    ended_time:"12:00",
  },
  {
    id:5,
    name:"周二",
    started_time:"13:00",
    ended_time:"15:00",
  },
  {
    id:6,
    name:"周二",
    started_time:"15:00",
    ended_time:"17:00",
  },
  {
    id:7,
    name:"周三",
    started_time:"10:00",
    ended_time:"12:00",
  },
  {
    id:8,
    name:"周三",
    started_time:"13:00",
    ended_time:"15:00",
  },
  {
    id:9,
    name:"周三",
    started_time:"15:00",
    ended_time:"17:00",
  },
  {
    id:10,
    name:"周四",
    started_time:"10:00",
    ended_time:"12:00",
  },
  {
    id:11,
    name:"周四",
    started_time:"13:00",
    ended_time:"15:00",
  },
  {
    id:12,
    name:"周四",
    started_time:"15:00",
    ended_time:"17:00",
  },
  {
    id:13,
    name:"周五",
    started_time:"10:00",
    ended_time:"12:00",
  },
  {
    id:14,
    name:"周五",
    started_time:"13:00",
    ended_time:"15:00",
  },
  {
    id:15,
    name:"周五",
    started_time:"15:00",
    ended_time:"17:00",
  },
]
//  assistance_time

let asistancetimeOptions= []
function joinAsistanceTime(arr) {
  let strArr = []
  arr.forEach(element => {
    strArr.push(
      {
        value:element.id,
        label:`${element.name} ${element.started_time}~${element.ended_time}`
      }
    )
  });
  return strArr
}

asistancetimeOptions = joinAsistanceTime(timeSelect)


export { genderOptions, educationOptions, rowOptions, specialOptions, asistancetimeOptions,statusOptions, identityOptions}