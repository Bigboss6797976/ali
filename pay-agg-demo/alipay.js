import AlipaySdk from 'alipay-sdk';

const alipaySdk = new AlipaySdk({
  appId: process.env.ALIPAY_APP_ID,
  privateKey: process.env.ALIPAY_PRIVATE_KEY,
  alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY,
});

export async function createAliOrder(outTradeNo, totalAmount, subject) {
  const result = await alipaySdk.exec('alipay.trade.precreate', {
    bizContent: {
      out_trade_no: outTradeNo,
      total_amount: totalAmount,
      subject: subject,
    },
  });
  return result.qr_code;
}
