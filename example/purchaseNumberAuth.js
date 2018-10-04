const mvtk = require('@motionpicture/mvtk-reserve-service');
const request = require('request-promise-native');

request.post({
    uri: 'http://localhost:8082/auth/purchaseNumberAuth',
    body: {
        kgygishCd: 'SSK000', //興行会社コード
        jhshbtsCd: mvtk.services.auth.purchaseNumberAuth.InformationTypeCode.All, //情報種別コード
        knyknrNoInfoIn: [
            {
                knyknrNo: '3472695908', //購入管理番号
                pinCd: '7648' // PINコード
            }
        ],
        skhnCd: '1622100', //作品コード
        stCd: '18', //サイトコード
        jeiYmd: '2017/02/16' //上映年月日
    },
    json: true,
    simple: false
}).then((res) => {
    console.log(res);
});
