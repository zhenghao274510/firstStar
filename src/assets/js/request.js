import axios from 'axios'
import {
  Toast
} from 'vant';
const http={
  post(data={},t) {
    return new Promise((resolve, reject) => {
      axios({
          url: encodeURI("http://m.hnsgsmyxgs.com/api/"+t ),
          method: "post",
          data:JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          resolve(res.data)
        })
        .catch(res => {
          //失败
          // reject(res)
          Toast('网络不稳定!请稍后重试!')
        })
    })
  },
  postLoading(data = {},t) {
    Toast.loading({
      message: '支付中...',
      mask: false
    });
    return new Promise((resolve, reject) => {
      axios({
          url: encodeURI("http://m.hnsgsmyxgs.com/api/"+t),
          method: "post",
          data:JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          Toast.clear();
          resolve(res.data)

        })
        .catch(res => {
          Toast.clear();
          Toast('网络不稳定!请稍后重试!')
        })
    })
  },
  upfile(data={}, method = 'post'){
    Toast.loading({
      message: '上传中...',
      mask:false
    });
    return new Promise((resolve, reject) => {
      axios({
          url: encodeURI('http://m.hnsgsmyxgs.com/api/uploadFile'),
          method: method,
          data:data,
          headers: {
            "Content-Type": 'application/json'
          }
        })
        .then(res => {
          //成功
          Toast.clear();
          resolve(res.data)
        })
        .catch(res => {
          //失败
          Toast.clear();
          Toast("网络不稳定!请稍后重试!")
        })
    })
  },
}
export default http
