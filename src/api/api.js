import { ServerAdapter } from '../api/adapter';

export async function getPayment() {
 const result = await ServerAdapter.get().then(res => {
    console.log(res);
    if (res.result === 'ok') return res.price;
    throw Error;
  }).catch(res => {
      return Error('not ok');
  });
  return result;
}

export async function postReceipt(param) {
  const result = await ServerAdapter.post("", param)
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(res => {
      return Error("not ok");
    });
  return result;
}
