const mvtk = require('@motionpicture/mvtk-reserve-service');
const request = require('request-promise-native');

request.post({
    uri: 'http://localhost:8082/seat/seatInfoSync',
    body: {
        kgygishCd: 'SSK000', //興行会社コード
        yykDvcTyp: mvtk.services.seat.seatInfoSync.ReserveDeviceType.EntertainerSitePC, //予約デバイス区分
        trkshFlg: mvtk.services.seat.seatInfoSync.DeleteFlag.False, //取消フラグ
        kgygishSstmZskyykNo: '118124', //興行会社システム座席予約番号
        kgygishUsrZskyykNo: '124', //興行会社ユーザー座席予約番号
        jeiDt: '2017/03/02 10:00:00', //上映日時
        kijYmd: '2017/03/02', //計上年月日
        stCd: '18', //サイトコード
        screnCd: '10', //スクリーンコード
        knyknrNoInfo: [
            {
                knyknrNo: '4450899842', //購入管理番号（ムビチケ購入番号）
                pinCd: '7648', //pinコード（ムビチケ暗証番号）
                knshInfo: [
                    {
                        knshTyp: '01', //券種区分
                        miNum: 2 //枚数
                    }
                ]
            }
        ],
        zskInfo: [
            { zskCd: 'Ａ－２' }, { zskCd: 'Ａ－３' }
        ],
        skhnCd: '1622700' //作品コード
    },
    json: true,
    simple: false
}).then((res) => {
    console.log(res);
});
