
// import axios from "axios";

// export async function getSixZipCode(
//   adr = "台北市松山區南京東路四段50號10樓之6"
// ) {
//   return await new Promise((resolve, reject) => {
//     axios.get(`http://zip5.5432.tw/zip5json.py?adrs=${adr}`).then(
//       (response) => {
//         console.log(response.data);
//         resolve(response.data.zipcode);
//       },
//       (err) => {
//         console.log(err);
//         reject(err);
//       }
//     );
//   });
// }


// export  function getSixZipCode(
//   adr = "台北市松山區南京東路四段50號10樓之6"
// ) {
//   let data = undefined;
//   data =  axios
//     .get(`http://zip5.5432.tw/zip5json.py?adrs=${adr}`)
//     .then((res) => {
//       return res.data;
//     });
//   console.log(data.zipcode)
//   return data
// }

// export async function getSixZipCode(
//     adr = "台北市松山區南京東路四段50號10樓之6"
//   ) {
//     let data = undefined;
//     data = await axios
//       .get(`http://zip5.5432.tw/zip5json.py?adrs=${adr}`)
//       .then((res) => {
//         return res.data;
//       });
//     // let data = await axios.get(`http://zip5.5432.tw/zip5json.py?adrs=${adr}`).then((result) => return result.names)
//     return new Promise((resolve, reject) => {
//       (response) => {
//         resolve(data);
//       },
//         (err) => {
//           reject(err);
//         };
//     });
//   }
  
