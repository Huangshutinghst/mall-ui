// 异步调用修改mutations中的方法
import * as types from './mutations-type'

// 封装axios
// import axios from 'axios'
// export const axios_req = (context, value) => {
//     axios({
//         method : value.type || 'get',
//         url : value.url,
//         params : value.params || '',           // params 配合 get 使用， data 配合 post 使用， 数据格式皆是 {abc:1}
//         data : value.data || '',              //count:context.state.count,
//         //headers : {'X-Requested-With': 'XMLHttpRequest'},     // 这种请求头类型是request payload
//         //headers: {'Content-Type': 'application/x-www-form-urlencoded'},  //这种请求头参数是 form data
//         headers :  !value.isReqBody ? {'Content-Type': 'application/x-www-form-urlencoded'} : {'X-Requested-With': 'XMLHttpRequest'},
//         contentType : 'application/json',
//         responseType: 'json',
//         timeout: value.timeout || 100000,                                     //设置超时时间
//         //withCredentials : true,
//         transformRequest: [function (sysData) {
//             //console.log(sysData);
//             var data = Object.assign({}, sysData);
//             if(data.hasOwnProperty('page') && data.hasOwnProperty('pageSize')){
//                 data.start = data.page * data.pageSize - data.pageSize;
//                 data.limit = data.pageSize;

//                 delete data.page;
//                 delete data.pageSize;
//                 delete data.total;
//             }
//             data = Qs.stringify(data);     // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等
//             return data;
//         }],
//         transformResponse: [function (data) {
//              // 这里提前处理返回的数据
//             return data;
//         }]
//     }).then(function(res){
//         if(res.code == '401'){
//             Router.push('/login');
//         }else{
//             value.success(res);
//         }
//     }).catch(value.fail || function(err){
//         console.log(err);
//     })

//     //axios.all([get1(), get2()])
//     //    .then(axios.spread(function (res1, res2) {
//     //        // 只有两个请求都完成才会成功，否则会被catch捕获
//     //    }));

// }

export const setSinger = function ({commit}, {list}) {
    commit(types.SET_SINGER, true)
}