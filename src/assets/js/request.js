import axios from 'axios'
import {
  Toast
} from 'vant';
const http={
  post(data = {}, method = 'post') {
    Toast.loading({
      mask: false,
      message: '加载中...'
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
          //失败
          // reject(res)
          Toast.clear();
          Toast('请求超时！')
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
          Toast('请求超时！')

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
          if (res.data.result == '0') {
            resolve(res)
          } else {
            if (res.data.resultNote == '扫描失败，二维码数据有误') {
              resolve(res)
            } else {
              Toast(res.data.resultNote);
            }
          }

        })
        .catch(res => {
          //失败
          // reject(res)
          Toast('请求超时！')

        })
    })
  },
  upfile: (data, method = 'post') => {
    Toast.loading({
      message: '上传中...',
      mask:false
    });
    return new Promise((resolve, reject) => {
      axios({
          url: encodeURI('https://m.anxihtx.com/wineshop/api/auth?url=' + data),
          method: method,
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
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
          Toast("请求超时!")
        })
    })
  },
}
export default http
