import { ServerAdapter } from '../api/adapter';

export async function getPayment() {
  console.log('getPayment')
 const result = await ServerAdapter.get().then(res => {
    if (res.result === 'ok') return res.price;
    throw Error;
  }).catch(res => {
    console.log(res)
      return Error('not ok');
  });
  return result;
}

export async function postReceipt(param) {
  console.log('post')
  const result = await ServerAdapter.post("", param)
    .then(res => {
      return res;
    })
    .catch(res => {
      console.log(res)
      return Error("not ok");
    });
  return result;
}
