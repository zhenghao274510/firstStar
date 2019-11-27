import axios from 'axios'
import {
  Toast
} from 'vant';
const http={
  post(data = {}, method = 'post') {
    return new Promise((resolve, reject) => {
      axios({
          url: encodeURI("https://m.anxihtx.com/wineshop/api/service?json=" + JSON.stringify(data)),
          method: method,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          reject(res.data)
        })
        .catch(res => {
          //失败
          // reject(res)
          Toast('请求超时!请稍后重试!')
        })
    })
  },
  get(data = {}, method = 'get') {
    Toast.loading({
      message: '加载中...',
      mask: false
    });
    return new Promise((resolve, reject) => {
      axios({
          url: encodeURI("https://m.anxihtx.com/wineshop/api/service?json=" + JSON.stringify(data)),
          method: method,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          Toast.clear();
          reject(res.data)

        })
        .catch(res => {
          Toast.clear();
          Toast('请求超时!请稍后重试!')

        })
    })
  },
  pay(data = {}, method = 'post') {
    return new Promise((resolve, reject) => {
      axios({
          url: encodeURI("https://m.anxihtx.com/wineshop/api/service?json=" + JSON.stringify(data)),
          method: method,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          //成功
          Toast.clear();
          reject(res.data)
        })
        .catch(res => {
          //失败
          // reject(res)
          Toast('请求超时！')

        })
    })
  },
  upfile(data, method = 'post'){
    Toast.loading({
      message: '上传中...',
      mask:false
    });
    return new Promise((resolve, reject) => {
      axios({
          url: encodeURI('https://m.anxihtx.com/wineshop/api/auth?url=' + data),
          method: method,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          //成功
          Toast.clear();
          Toast('上传成功!')
        })
        .catch(res => {
          //失败
          Toast.clear();
          Toast("上传失败!")
        })
    })
  },
}
export default http
