import axios from "axios";

export async function createPaymentRequest({
  amount,
  description,
  callbackUrl,
}: {
  amount: number;
  description: string;
  callbackUrl: string;
}) {
  const res = await axios.post(
    "https://sandbox.zarinpal.com/pg/v4/payment/request.json",
    {
      merchant_id: process.env.ZARINPAL_MERCHANT_ID,
      amount,
      description,
      callback_url: callbackUrl,
    },
  );

  const data = await res.data.data;

  data.paymentUrl = `https://sandbox.zarinpal.com/pg/StartPay/${data.authority}`;

  return data;
}

export async function verifyPayment(amount: number, authority: string) {
  const res = await axios.post(
    "https://sandbox.zarinpal.com/pg/v4/payment/verify.json",
    {
      merchant_id: process.env.ZARINPAL_MERCHANT_ID,
      amount,
      authority,
    },
  );

  const data = await res.data.data;

  return data;
}
