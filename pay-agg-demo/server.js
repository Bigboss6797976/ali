import express from "express";
import QRCode from "qrcode";
import { createAliOrder } from "./alipay.js";
import { createWxOrder } from "./wechat.js";

const app = express();

app.get("/pay", async (req, res) => {
  try {
    const ua = req.headers['user-agent'] || "";
    let payUrl;

    if (ua.includes("AlipayClient")) {
      payUrl = await createAliOrder("ORDER123", "9.99", "测试商品");
    } else if (ua.includes("MicroMessenger")) {
      payUrl = await createWxOrder("ORDER123", "9.99", "测试商品");
    } else {
      payUrl = await createAliOrder("ORDER123", "9.99", "测试商品");
    }

    const qrImage = await QRCode.toDataURL(payUrl);

    res.send(\`
      <html>
        <body>
          <h2>聚合支付二维码</h2>
          <img src="\${qrImage}" />
          <p>系统会自动识别支付宝或微信</p>
        </body>
      </html>
    \`);
  } catch (err) {
    res.status(500).send("支付二维码生成失败: " + err.message);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("聚合支付服务运行中...");
});
